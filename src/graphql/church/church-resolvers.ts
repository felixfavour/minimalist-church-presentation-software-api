import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import Church from "../../models/Church";
import { IChurch } from "../../models/Church";

import { jwtSecret } from "../..";

export const churchResolvers = {
    Query: {
        getChurch: async (_: any, { email }: { email: string }) => {
            const church = await Church.findOne({ email });
            if (!church) {
                throw new Error("Church not found");
            }
            return church;
        },
    },
    Mutation: {
        signUp: async (_: any, { input }: { input: IChurch }) => {
            const { name, type, address, email, password, pastor } = input;
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const newChurch = new Church({
                name,
                type,
                address,
                email,
                password: hashedPassword,
                pastor,
            });
            await newChurch.save();
            const token = jwt.sign({ id: newChurch.id }, jwtSecret, {
                expiresIn: "2h",
            });
            return { church: newChurch, token };
        },

        login: async (
            _: any,
            { email, password }: { email: string; password: string }
        ) => {
            const church = await Church.findOne({ email });
            if (!church) {
                throw new Error("Church not found");
            }
            const isMatch = await bcrypt.compare(password, church.password);
            if (!isMatch) {
                throw new Error("Invalid credentials");
            }

            const token = jwt.sign({ id: church.id }, jwtSecret, {
                expiresIn: "2h",
            });
            return token;
        },
    },
};
