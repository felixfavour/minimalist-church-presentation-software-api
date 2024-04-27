/* eslint-disable consistent-return */
import jwt from "jsonwebtoken";
import { NOT_EMAIL_VERIFIED_ROUTES, ROLE, UNPROTECTED_ROUTES } from "../helpers/constants.js";
import { errorMsg } from "../helpers/functions.js";
import { User } from "../models/User.js";

const verifyJwt = authToken => {
    return jwt.verify(authToken, process.env.JWT_SECRET);
};

const isAuth = async (req, res, next) => {
    const { authorization, id_token } = req.headers;
    // If it is an authorization protected route
    if (
        !UNPROTECTED_ROUTES.includes(req.url) &&
        !req.url.includes(UNPROTECTED_ROUTES[5]) &&
        !req.url.includes(UNPROTECTED_ROUTES[6]) &&
        !req.url.includes(UNPROTECTED_ROUTES[7]) &&
        !req.url.includes(UNPROTECTED_ROUTES[11])
    ) {
        // Check if user included token
        if (authorization?.split(" ")[0] === "Bearer") {
            try {
                const token = authorization?.split(" ")[1];
                // const OAuthTokenVerified = await verifyGoogleOAuth(id_token)

                // // For Google Auth Sign IN
                // if (OAuthTokenVerified) {
                //   const googleUserUniqueID = OAuthTokenVerified.sub
                //   const user = await User.findOne({ google_user: googleUserUniqueID }).lean()

                //   if (user) {
                //     const org = await User.findOne({
                //       organization_code: user.organization_code
                //     }).lean()
                //     req.user = user
                //     req.org = org
                //     req.userId = user._id
                //     req.organizationCode = user.organization_code
                //     req.isOrg = user.code === user.organization_code
                //     req.googleUser = { id: googleUserUniqueID }
                //     next()
                //   } else if (req.path === '/v1/auth/google') {
                //     // Call Google API to retrieve info about user
                //     const response = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
                //       headers: { Authorization: authorization.replace(/\n|\r/g, '') }
                //     })
                //     // console.log(response.data)
                //     // Confirm that verified ID Token tallies with Access Token
                //     if (response.data.id === OAuthTokenVerified.sub) {
                //       req.googleUser = response.data
                //       next()
                //     }
                //   } else {
                //     throw new Error('OAuth Token is invalid')
                //   }
                // } else {
                const tokenVerified = verifyJwt(token);

                if (tokenVerified.id) {
                    const user = await User.findOne({ _id: tokenVerified.id }).lean();
                    const org = await User.findOne({
                        organization_code: user.organization_code,
                    }).lean();

                    req.user = user;
                    req.org = org;
                    req.userId = user._id;
                    req.isAdmin = user.role === ROLE.OWNER || user.role === ROLE.ADMIN;
                    req.organizationCode = user.organization_code;
                    req.isOrg = user.code === user.organization_code;
                    next();
                }
                // }
            } catch (err) {
                console.log("IS AUTH ERR", err);
                return res.status(401).json(errorMsg("Invalid Authorization Header"));
            }
        } else {
            return res.status(401).json(errorMsg("Access Denied! No Bearer Token in request"));
        }
    } else {
        next();
    }
};

export const emailVerified = async (req, res, next) => {
    if (
        NOT_EMAIL_VERIFIED_ROUTES.includes(req.url) ||
        req.url.includes(NOT_EMAIL_VERIFIED_ROUTES[6]) ||
        req.url.includes(NOT_EMAIL_VERIFIED_ROUTES[7]) ||
        req.url.includes(NOT_EMAIL_VERIFIED_ROUTES[11])
    ) {
        next();
        return;
    }

    if (!req.user?.email_verified) {
        return res.status(403).json(errorMsg("Email not verified"));
    }

    next();
};

export default isAuth;
