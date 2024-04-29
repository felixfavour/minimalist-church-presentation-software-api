import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { Church } from "../models/Church.js";

const signToken = id => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1hr" });

export const signup = async (req, res) => {
    try {
        const { name, type, address, email, password, pastor } = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);
        const newChurch = await Church.create({
            name,
            type,
            address,
            email,
            password: hashedPassword,
            pastor,
        });
        const token = signToken(newChurch._id);
        res.status(201).json({ token, data: { newChurch } });
    } catch (error) {
        res.status(500).json({ message: "Error signing up church", error: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const church = await Church.findOne({ email }).select("+password");
        if (!church || !(await bcrypt.compare(password, church.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = signToken(church._id);
        res.status(200).json({ token, data: { church } });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};
