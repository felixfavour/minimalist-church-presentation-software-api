import { customAlphabet } from "nanoid";
import bcrypt from "bcrypt";
import crypto from "crypto";

let mostRecentColour = null;
let mostRecentAlias = null;

export const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 6);

export const errorMsg = msg => (typeof msg === "string" ? { error: true, msg } : { error: true, msg: msg.message });

export const successMsg = data => ({ error: false, data });

export const shortID = () => nanoid();

export const color = () => {
    const colors = [
        "#FF355E",
        "#FD5B78",
        "#FF6037",
        "#FF9966",
        "#FF9933",
        "#FFCC33",
        "#0281FF",
        "#A7F432",
        "#a0c801",
        "#AAF0D1",
        "#50BFE6",
        "#FF6EFF",
        "#EE34D2",
        "#FF00CC",
        "#FF00CC",
    ];
    const index = Math.floor(Math.random() * colors.length);
    const returnable = colors[index];
    if (mostRecentColour === returnable) {
        return color();
    }
    mostRecentColour = colors[index];
    return returnable;
};

export const generateRandomPassword = length => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    return password;
};

export const generateToken = async (length = 6, minutes = 5) => {
    if (length <= 0) {
        length = 6;
    }

    if (minutes <= 0) {
        minutes = 5;
    }

    let token = generateRandomPassword(length).toUpperCase();
    const hashToken = await bcrypt.hash(token.toString(), 12);
    const tokenExpiry = addMinutes(new Date(), minutes);

    return {
        token,
        hashToken,
        tokenExpiry,
    };
};

export const alias = () => {
    const aliases = ANONYMOUS_ALIASES.NEUTRAL;
    const index = Math.round(Math.random() * aliases.length);
    const returnable = aliases[index];
    if (mostRecentAlias === returnable) {
        return alias();
    }
    mostRecentAlias = aliases[index];
    return returnable;
};

export function headerConfig(auth) {
    return {
        headers: {
            Authorization: `Bearer ${auth}`,
            "Content-type": "application/json",
        },
    };
}

export const deleteFields = (data, fields) => {
    fields.forEach(field => {
        Reflect.deleteProperty(data, field);
    });
};

export function encrypt(data, channel = "internal") {
    let secretKey = process.env.SECRETE_KEY;
    if (channel !== "internal") {
        secretKey = process.env.EXTERNAL_SECRETE_KEY;
    }

    const str = JSON.stringify(data);
    const key = Buffer.from(secretKey, "hex");
    const plainText = Buffer.from(str, "utf8");

    // The nonce is a random 12 byte buffer
    const nonce = crypto.randomBytes(12);

    // Since we don't want to save the nonce somewhere else in this case, we add it as a prefix to the encrypted data. The first nonce argument in Seal is the prefix.
    const cipher = crypto.createCipheriv("aes-256-gcm", key, nonce);

    // Encrypt the plain text
    const cipherText = Buffer.concat([cipher.update(plainText, "utf8"), cipher.final()]);

    // Get the authentication tag

    const tag = cipher.getAuthTag();

    // Concatenate the nonce + encrypted data + tag

    return Buffer.concat([nonce, cipherText, tag]).toString("hex");
}

//crypto encrypt
export function decrypt(data, channel = "internal") {
    let secretKey = process.env.SECRETE_KEY;
    if (channel !== "internal") {
        secretKey = process.env.EXTERNAL_SECRETE_KEY;
    }

    const key = Buffer.from(secretKey, "hex");
    const enc = Buffer.from(data, "hex");

    const nonce = enc.subarray(0, 12); // 12 bytes from the start of the buffer

    // get cipher text which is from 12th byte to the end
    const cipherText = enc.subarray(12, enc.length - 16);

    // Decrypt the data
    const decipher = crypto.createDecipheriv("aes-256-gcm", key, nonce);

    // Set the auth tag
    decipher.setAuthTag(enc.subarray(enc.length - 16));

    // Decrypt the data
    let decryptedString = decipher.update(cipherText, "binary", "utf8");
    decryptedString += decipher.final("utf8");
    return JSON.parse(decryptedString);
}

export function containsBadWords(message) {
    for (const word of BAD_WORDS) {
        if (message?.toLowerCase()?.includes(word)) {
            return true;
        }
    }
    return false;
}
