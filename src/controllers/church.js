import { Role } from "../helpers/constants.js";
import { Church } from "../models/Church.js";
import { User } from "../models/User.js";

export const createChurch = async (req, res) => {
    try {
        const { name, type, address, email, pastor } = req.body;
        const userId = req.user._id;

        const newChurch = await Church.create({
            name,
            type,
            address,
            email,
            pastor,
            userIds: [userId],
        });

        await User.findByIdAndUpdate(userId, {
            $set: { role: Role.SUPERADMIN },
            $set: { churchId: newChurch._id },
        });

        res.status(201).json(newChurch);
    } catch (error) {
        res.status(500).json({ message: "Error creating the church", error: error.message });
    }
};
