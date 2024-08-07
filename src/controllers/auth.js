import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { User } from "../models/User.js";
import { color } from "../helpers/functions.js";

const signToken = id => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "60d" });

export const signup = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({
            fullname,
            email,
            password: hashedPassword,
            theme: color(),
        });
        const token = signToken(newUser._id);
        res.status(201).json({ token, data: { newUser } });
    } catch (error) {
        res.status(500).json({ message: "Error signing up", error: error.message });
    }
};

export const signupTeammate = async (req, res) => {
    try {
        const { fullname, email, password, churchId } = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({
            fullname,
            email,
            password: hashedPassword,
            churchId,
            theme: color(),
        });
        const token = signToken(newUser._id);
        res.status(201).json({ token, data: { newUser } });
    } catch (error) {
        res.status(500).json({ message: "Error signing up new team mate", error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");
        await User.findByIdAndUpdate(user?._id.toString(), {
            lastLogin: new Date().toISOString(),
        });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = signToken(user._id);
        res.status(200).json({ token, data: { user } });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};
