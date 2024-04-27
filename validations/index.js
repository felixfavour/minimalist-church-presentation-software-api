import Validator from "validatorjs";
import { ObjectID } from "../config/database.js";
import { errorMsg } from "../helpers/functions.js";

const { register } = Validator;

function flattenObjectKeys(obj, parentKey = "") {
    let result = [];

    for (const key in obj) {
        // eslint-disable-next-line no-prototype-builtins
        if (obj.hasOwnProperty(key)) {
            const fullPath = parentKey ? `${parentKey}.${key}` : key;

            if (typeof obj[key] === "object" && obj[key] !== null) {
                result = result.concat(flattenObjectKeys(obj[key], fullPath));
            } else {
                result.push(fullPath);
            }
        }
    }

    return result;
}

function setObjectValueByFlattenedKey(obj, flattenedKey, newValue) {
    const keys = flattenedKey.split(".");
    let current = obj;

    for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        // eslint-disable-next-line no-prototype-builtins
        if (!current.hasOwnProperty(key)) {
            current[key] = {};
        }
        current = current[key];
    }

    current[keys[keys.length - 1]] = newValue;
}

export function validator(body, rules, customMessages, callback) {
    const validation = new Validator(body, rules, customMessages);
    const bodyKeys = flattenObjectKeys({ ...body });

    for (const key of bodyKeys) {
        if (validation.rules[key] === undefined) {
            // some checks
            const rule = key.split(".")[0];
            if (validation.rules[rule] !== undefined) {
                if (
                    validation._hasRule(rule, ["array"]) ||
                    JSON.stringify(validation.rules[rule]) === JSON.stringify([])
                ) {
                    continue;
                }
            }
            validation.errors.add(key, "The " + key + " field is not allowed.");
            callback(validation.errors, false);
            return;
        }

        if (validation._hasNumericRule(key)) {
            const value = validation._objectPath(body, key);
            if (value !== undefined && value !== null && value !== "") {
                if (isNaN(value)) {
                    validation.errors.add(key, "The " + key + " field must be a number.");
                    callback(validation.errors, false);
                    return;
                } else {
                    setObjectValueByFlattenedKey(body, key, Number(value));
                }
            }
        }
    }

    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
}

export function sendError(res, err) {
    const firstError = err.errors[Object.keys(err.errors)[0]][0];
    res.status(400).json(errorMsg(firstError));
}

register(
    "object_id",
    function (value, requirement, attribute) {
        return ObjectID.isValid(value);
    },
    "invalid :attribute",
    null,
);

export function paramsId(req, res, next) {
    const validationRule = {
        id: "required|string|object_id",
    };
    validator(req.params, validationRule, {}, (err, status) => {
        if (!status) {
            sendError(res, err);
        } else {
            next();
        }
    });
}
