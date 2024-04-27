import { successMsg } from "../helpers/functions.js";

const get = (_req, res) => {
    try {
        return res.status(200).json(successMsg("Revise API is active."));
    } catch {
        return res.status(500).json(successMsg("Revise API is down."));
    }
};

export default get;
