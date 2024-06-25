import { Role } from "../helpers/constants.js";
import { Church } from "../models/Church.js";
import { User } from "../models/User.js";

import sendgridMail from "@sendgrid/mail";

export const createChurch = async (req, res) => {
  try {
    const { name, type, address, email, pastor } = req.body;
    const userId = req.user?._id || req.body.userId;

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
      personalizations: recipients.map((recipient) => ({
        to: [{ email: recipient.email }],
      })),
      from: {
        email: process.env.SENDGRID_SENDER_EMAIL,
        name: "Cloud of Worshippers",
      },
      subject: `Join ${church.type} on CoW`,
      html: `
<html>
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Cloud of Worshippers - Accept Invitation to join your team!</title>
        <style>
            @import url("https://fonts.googleapis.com/css2?family=Abhaya+Libre&display=swap");
            @import url("https://fonts.googleapis.com/css2?family=Khula:wght@400;600&display=swap");
        </style>
    </head>

    <body
        style="
            font-family: 'Khula', 'Google Sans', Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
            font-style: normal;
            font-weight: normal;
            color: #000;
            background-color: #ffffff;
            background-blend-mode: color;
            background-size: cover;
        "
    >
        <div class="email" style="width: 100%; max-width: 600px; margin: 24px auto; height: 100%">
            <div class="email__text" style="width: 100%; margin-bottom: 30px; padding: 72px 0px 19px 0px">
                <div class="headline" style="text-align: left; padding: 0 5%">
                    <a
                        target="_blank"
                        href="https://revaise.com?ref=email"
                        style="text-decoration: none; cursor: pointer; text-align: left"
                    >
                        <img
                            width="280px"
                            src="https://mcusercontent.com/ea6e64660e058c4dc6859a3e3/images/69da94cf-0dbf-504b-7d37-062ca1596dda.png"
                            style="text-align: center"
                        />
                    </a>
                </div>
                <div class="email__paragraphs" style="width: 90%; padding: 0 5%; margin-bottom: 32px">
                    <p class="name" style="font-weight: 400; font-size: 18px; line-height: 32px">
                        Hi there, <br />
                        You have been invited to join ${church.type} Church Media team on Cloud of Worshippers.
                    </p>
                </div>
                <div
                    align="center"
                    class="email__paragraphs"
                    style="
                        width: 90%;
                        padding: 20px 5%;
                        margin-bottom: 32px;
                        background: #f5eaff;
                        border-radius: 20px;
                        text-align: center;
                    "
                >
                    <h3 style="margin-bottom: 0px; margin-top: 20px; font-weight: 900; font-size: 20px">
                        💼 ${church?.type}
                    </h3>
                    <div style="margin-bottom: 45px; font-size: 14px" class="participants">
                        <p>Join your workforce to serve together.</p>
                    </div>
                    <a
                        align="center"
                        href="https://worshipcloud.favourfelix.com/signup/${churchId}"
                        style="
                            padding: 12px 50px;
                            width: 250px;
                            background: #a855f7;
                            border-radius: 8px;
                            text-align: center;
                            text-decoration: none;
                            font-size: 18px;
                            color: #ffffff;
                            font-weight: 700;
                        "
                        >Accept Invitation</a
                    >
                    <p style="margin-bottom: 20px"></p>
                </div>
                <div class="email__paragraphs" style="width: 90%; padding: 0 5%; margin-bottom: 32px">
                    <h3 style="margin-bottom: 8px; margin-top: 20px; font-weight: 900; font-size: 20px">
                        About Cloud of Worshippers
                    </h3>
                    <p class="name" style="font-weight: 400; font-size: 16px; line-height: 32px">
                        Cloud of Worshippers is the new and fastest way to present messages to your church! We like to call it you church's literal powerpoint. See more at
                        <a
                            style="text-decoration: none; color: #a855f7; font-weight: 600; font-size: 16px"
                            href="https://worshipcloud.favourfelix.com?ref=revaise_email"
                            >worshipcloud.favourfelix.com</a
                        >
                    </p>
                </div>
                <div class="email__paragraphs" style="width: 90%; padding: 0 5%; margin-bottom: 0">
                    <p class="name" style="font-weight: 400; font-size: 16px; line-height: 32px">
                        Cheers,<br />
                        <span style="font-weight: 600">The Cloud of Worshippers Team</span>
                    </p>
                </div>
            </div>
        </div>
    </body>
</html>`,
    };

    await sendgridMail.send(msg);
    return res.status(200).send({ message: "Invites sent successfully" });
  } catch (error) {
    console.error("Error sending invites:", error);
    return res.status(500).send({ error: "Failed to send invites" });
  }
};
