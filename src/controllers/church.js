import { Role } from "../helpers/constants.js";
import { Church } from "../models/Church.js";
import { User } from "../models/User.js";

import sendgridMail from "@sendgrid/mail";

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
        });

        await User.findByIdAndUpdate(userId, {
            $set: { role: Role.SUPERADMIN },
            $set: { churchId: newChurch._id },
        });

        res.status(201).json(newChurch);
    } catch (error) {
        res.status(500).json({
            message: "Error creating the church",
            error: error.message,
        });
    }
};

export const getChurch = async (req, res) => {
    try {
        const { churchId } = req.params;
        const { teammates } = req.query;

        const church = await Church.findById(churchId);
        if (!church) {
            return res.status(404).json({ message: "Church not found" });
        }

        const churchData = church.toObject();

        if (teammates === "true") {
            const users = await User.find({ churchId: churchId }, "fullname avatar");
            churchData.users = users;
        }

        res.status(200).json(churchData);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error fetching church",
            error: error.message,
        });
    }
};

export const sendEmailInvite = async (req, res) => {
    try {
        sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);

        const { recipients, churchId } = req.body;

        const church = await Church.findById(churchId);
        if (!church) {
            return res.status(404).send({ error: "Church not found" });
        }

        const msg = {
            personalizations: recipients.map(recipient => ({
                to: [{ email: recipient.email }],
            })),
            from: {
                email: process.env.SENDGRID_SENDER_EMAIL,
                name: "Cloud of Worship Team",
            },
            subject: `Join ${church.name} cloud of worship team`,
            html: `Click this link: <a href="https://worshipcloud.favourfelix.com/signup/${churchId}">Join the team</a>.`,
        };

        await sendgridMail.send(msg);
        return res.status(200).send({ message: "Invites sent successfully" });
    } catch (error) {
        console.error("Error sending invites:", error);
        return res.status(500).send({ error: "Failed to send invites" });
    }
};
