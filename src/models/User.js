import mongoose from "mongoose";

import { Role } from "../helpers/constants.js";

const userSchema = mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
        },
        theme: {
            type: String,
        },
        churchId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Church",
        },
        role: {
            type: String,
            enum: Object.values(Role),
            default: Role.USER,
        },
        lastLogin: {
            type: String,
            default: new Date(),
        },
    },
    { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
