import { validator, sendError } from "./index.js";

export const sendResetPasswordToken_v = (req, res, next) => {
    const validationRule = {
        email: "required|string|email",
    };

    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            sendError(res, err);
        } else {
            next();
        }
    });
};

export const resetPassword_v = (req, res, next) => {
    const validationRule = {
        email: "required|string|email",
        token: "required|string",
        password: "required|string",
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            sendError(res, err);
        } else {
            next();
        }
    });
};

export const verifyEmail_v = (req, res, next) => {
    const validationRule = {
        token: "required|string",
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            sendError(res, err);
        } else {
            next();
        }
    });
};
