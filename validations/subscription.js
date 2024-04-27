import { validator, sendError } from "./index.js";

export const initiateUpgradeSubscription_v = (req, res, next) => {
    const validationRule = {
        plan: "required|string",
        frequency: "required|string",
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

export const upgradeSubscriptionByCard_v = (req, res, next) => {
    const validationRule = {
        plan: "required|string",
        frequency: "required|string",
        card_id: "string|object_id",
    };

    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            sendError(res, err);
        } else {
            next();
        }
    });
};

export const downGradeSubscription_v = (req, res, next) => {
    const validationRule = {
        plan: "required|string",
        frequency: "required|string",
    };

    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            sendError(res, err);
        } else {
            next();
        }
    });
};

export default {
    initiateUpgradeSubscription_v,
    upgradeSubscriptionByCard_v,
    downGradeSubscription_v,
};
