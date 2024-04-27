import { ExpressContext } from "apollo-server-express";
import jwt from "jsonwebtoken";

import { jwtSecret } from "..";

export const context = ({ req }: ExpressContext) => {
    const token = req.headers.authorization || "";

    if (token) {
        try {
            const decoded = jwt.verify(token, jwtSecret) as { id: string };
            const user = { id: decoded.id };
            return { user };
        } catch (err: any) {
            console.log("JWT Error: ", err.message);
        }
    }
    return {};
};
