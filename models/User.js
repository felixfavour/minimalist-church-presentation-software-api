import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { ObjectID } from "../config/database.js";
import { color, shortID } from "../helpers/functions.js";
import { GENDER, USER_TYPE, ROLE } from "../helpers/constants.js";

// This Model is shared by Organization and Reviewer User Type
const UserSchema = mongoose.Schema(
    {
        full_name: {
            type: String,
        },
        email: {
            type: String,
            unique: true,
        },
        code: {
            type: String,
            required: true,
            default: () => shortID(),
            unique: true,
        },
        // Access code for reviewers to access organizations
        organization_code: {
            type: String,
        },
        organization_name: {
            type: String,
        },
        password: {
            type: String,
            required: true,
            // select: false,
        },
        type: {
            type: String,
            required: true,
        },
        bio: {
            type: String,
        },
        phone: {
            type: String,
        },
        signup_step: {
            type: Number,
            // required: true,
        },
        main_team: {
            type: String,
            required: false,
        },
        first_time_user: {
            type: Boolean,
            required: true,
            default: () => true,
        },
        theme: {
            type: String,
            required: true,
            default: () => color(),
        },
        gender: {
            type: String,
            required: true,
            default: () => GENDER.PNTS,
            enum: [GENDER.MALE, GENDER.FEMALE, GENDER.PNTS],
        },
        title: {
            type: String,
        },
        role: {
            type: String,
            enum: [ROLE.OWNER, ROLE.ADMIN, ROLE.MEMBER],
            default: () => ROLE.MEMBER,
        },
        oauth: {
            type: String,
            // required: true,
        },
        avatar: String,
        email_verified: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
);

UserSchema.pre("save", async function (next) {
    // HASH PASSWORD
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);

    // SET ACCESS CODE
    if (this.type === USER_TYPE.ORGANIZATION) {
        this.organization_code = this.code;
        this.role = ROLE.OWNER;
    } else {
        this.role = ROLE.MEMBER;
    }

    // Create Main Team
    if (this.type === USER_TYPE.ORGANIZATION) {
        const team = await Team.create({
            name: this.organization_name || "General",
            organization_code: this.code,
        });
        this.main_team = team._id.toString();
    }
    next();
});

// Static Method to Log in user
UserSchema.statics.signin = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) return user;
        throw Error("Incorrect password");
    }
    throw Error("Incorrect email");
};

// Static method to update user password
UserSchema.statics.updatePassword = async function (userId, password, newPassword) {
    const user = await this.findById(ObjectID(userId));
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            await user.setPassword(newPassword);
        } else {
            throw Error("Incorrect password");
        }
    } else {
        throw Error("User Not Found");
    }
};

UserSchema.methods.setPassword = async function (password) {
    this.password = password;
    await this.save();
};

export const User = mongoose.model("User", UserSchema);
