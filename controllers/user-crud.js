/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import { ROLE } from "../helpers/constants.js";
import { errorMsg, successMsg } from "../helpers/functions.js";
import { User } from "../models/User.js";
import { ObjectID } from "../config/database.js";

export const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        res.status(200).json(successMsg(user));
    } catch (err) {
        console.error(`GET ORGANIZATION REVIEWER ERROR: ${err}`);
        res.status(400).json(errorMsg(err));
    }
};

export const updateCurrentUser = async (req, res) => {
    try {
        const objectId = ObjectID(req.userId);

        // INTERVAL CANNOT BE UPDATED FROM PROFILE UPDATE
        delete req.body.interval;
        delete req.body.free_trial_end_date;

        // OWNER ROLE CANNOT BE RELINQUISHED - FOR NOW
        if (req.body.role === ROLE.OWNER || req.user.role === ROLE.OWNER) {
            delete req.body.role;
        }

        const query = { _id: objectId };
        const userUpdate = await User.findOneAndUpdate(query, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json(successMsg(userUpdate));
    } catch (err) {
        console.error(`GET ORGANIZATION REVIEWER ERROR: ${err}`);
        res.status(400).json(errorMsg(err));
    }
};
