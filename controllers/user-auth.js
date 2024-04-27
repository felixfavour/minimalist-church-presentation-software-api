/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import jwt from "jsonwebtoken";
import { errorMsg, generateRandomPassword, successMsg } from "../helpers/functions.js";
import { User } from "../models/User.js";
import { USER_TYPE, NOTIFICATION_ACTION_TYPE } from "../helpers/constants.js";

// JWT Max age - 7 day
const maxAge = 7 * 24 * 60 * 60;

// create JSON web token
const createToken = (id, user_type, code) =>
    jwt.sign({ id, user_type, code }, process.env.JWT_SECRET, { expiresIn: maxAge });

// Log In User
export const signInUser = async (req, res) => {
    const { email, password, code, google_user } = req.body;
    try {
        let user = {};
        if (google_user) {
            user = await User.findOne({ google_user });
        } else {
            user = await User.signin(email, password);
        }

        if (user.organization_code === code || user.type === USER_TYPE.ORGANIZATION) {
            const token = createToken(user._id, user.type, user.organization_code);
            if (user.first_time_user) {
                await User.findByIdAndUpdate(user._id, { first_time_user: false }, { new: true });
            }

            Reflect.deleteProperty(user["_doc"], "password");

            res.status(200).json(successMsg({ user, token }));
        } else {
            throw Error("You do not have access to this organisation");
        }
    } catch (err) {
        console.error(`signin USER ERROR: ${err}`);
        res.status(400).json(errorMsg(err));
    }
};

// Create User
export const createUser = async (req, res) => {
    try {
        let user = await User.create(req.body);

        // create organization subscription
        if (user["type"] === USER_TYPE.ORGANIZATION) {
            await createSubscription({
                organization_code: user["organization_code"],
                plan: user["subscription"],
            });
        }

        // SEND NOTIFICATION
        await sendNotification({
            title: `{{primary_actor}} just joined the workspace`,
            sender: user._id.toString(),
            org_recipient: user.organization_code,
            data: {
                type: NOTIFICATION_ACTION_TYPE.NEW_USER,
                user: user.email.toString(),
                organization: user.organization_code,
            },
        });

        // SEND WELCOME EMAIL AFTER 1 HOUR OF SIGNUP
        setTimeout(async () => {
            const userId = user._id.toString();
            const userTemp = await User.findById(userId).lean();
            const firstName = userTemp?.full_name?.split(" ")?.[0];

            // email recipient
            let recipients = [{ email: userTemp?.email, full_name: firstName }];
            recipients = recipients?.map(user => ({
                ...user,
                substitutions: {
                    full_name: firstName || "there",
                },
            }));
        }, 1000 * 60 * 60);

        // DYNAMIC TEAMS - DEPRECATED
        // const team = await Team.findOne({ name: "General", organization_code: user.organization_code });
        // user = await User.findByIdAndUpdate(user._id, { $addToSet: { teams: team._id } }, { new: true });

        // FIND ANY INVITEES AND SET THEM AS REGISTERED
        const query = { email: req.body.email };
        await Invitee.findOneAndUpdate(query, { has_registered: true, email: req.body.email }, { new: true });

        const token = createToken(user._id, user.type, user.organization_code);
        res.status(201).json(successMsg({ user, token }));
    } catch (err) {
        if (err?.toString()?.includes("E11000 duplicate")) {
            res.status(400).json(errorMsg("This user already registered"));
        } else {
            console.error(`ERROR from ${req.url}: ${err}`);
            res.status(400).json(errorMsg(err));
        }
    }
};

// Create User
export const createMultipleUsers = async (req, res) => {
    try {
        let { users } = req.body;
        users = users.map(user => {
            user.type = USER_TYPE.REVIEWER;
            user.organization_code = req.organizationCode;
            return user;
        });
        const usersPromise = users.map(user => User.create(user));
        await Promise.all(usersPromise);

        // Send emails here
        res.status(201).json(successMsg("Users created successfully"));
    } catch (err) {
        console.error(`ERROR from ${req.url}: ${err}`);
        res.status(400).json(errorMsg(err));
    }
};

// Authenticate New or Existing User with Google OAuth
export const authWithGoogle = async (req, res) => {
    try {
        /**
         * TODO: USE [req.googleUser.sub] to create user account or
         * retrieve existing account, feel free to explore any of the functions
         * below for login and signup operations
         */
        const user = await User.findOne({ google_user: req.googleUser.id }).lean();

        if (user) {
            req.body = user;
            await signInUser(req, res);
        } else {
            req.body = {
                full_name: req.googleUser.name,
                email: req.googleUser.email,
                avatar: req.googleUser.picture,
                google_user: req.googleUser.id,
                type: req.body.user_type,
                signup_step: 2,
                password: generateRandomPassword(12),
            };
            await createUser(req, res);
        }
    } catch (err) {
        console.error(`GOOGLE AUTH USER ERROR: ${err}`);
        res.status(400).json(errorMsg(err));
    }
};

// send reset password token
export const sendResetPasswordToken = async (req, res) => {
    try {
        const { email } = req.body;

        // get user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json(errorMsg("User not found"));
        }

        // create token
        const token = await Token.generateToken({ user: user._id }, "reset_password_otp");

        res.status(200).json(successMsg("Token sent successfully"));
    } catch (e) {
        console.error(`ERROR from ${req.url}: ${e}`);
        res.status(400).json(errorMsg(e));
    }
};

// reset password
export const resetPassword = async (req, res) => {
    try {
        const { email, token, password } = req.body;

        // get user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json(errorMsg("User not found"));
        }

        // get token
        const dbToken = await Token.fetchToken({ user: user._id }, "reset_password_otp");
        if (!dbToken) {
            return res.status(400).json(errorMsg("invalid or expired token"));
        }

        // validate token
        const valid = await dbToken.validateToken(token);
        if (!valid) {
            return res.status(400).json(errorMsg("invalid or expired token"));
        }

        // update password
        await user.setPassword(password);

        return res.status(200).json(successMsg("Password reset successfully"));
    } catch (e) {
        console.error(`ERROR from ${req.url}: ${e}`);
        res.status(400).json(errorMsg(e));
    }
};

// update password
export const updatePassword = async (req, res) => {
    try {
        const { password, newPassword } = req.body;

        // get user
        const user = await User.signin(req.user.email, password);
        console.log(user);

        // update password
        await user.setPassword(newPassword);

        return res.status(200).json(successMsg("Password Updated successfully"));
    } catch (e) {
        console.error(`ERROR from ${req.url}: ${e}`);
        res.status(400).json(errorMsg(e));
    }
};
