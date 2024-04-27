import { validator, sendError } from "./index.js";

export const createCard_v = (req, res, next) => {
    const validationRule = {
        currency: "required|string",
        success_url: "required|string",
        cancel_url: "required|string",
    };

    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            sendError(res, err);
        } else {
            next();
        }
    });
};
