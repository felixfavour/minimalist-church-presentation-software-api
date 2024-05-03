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
        },
        password: {
            type: String,
            required: true,
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
    },
    { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
