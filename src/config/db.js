import mongoose from "mongoose";
import dotenv from "dotenv";

import { Song } from "../models/Song.js";

// Require environmental variables
dotenv.config();

// Method to connect to MongoDB database
export const connectDB = async () => {
    try {
        await mongoose.connect(
            `${process.env.DB_HOST}://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CONNECTOR}`,
        );

        // Drop existing indexes
        await Song.collection.dropIndexes();

        Song.createIndexes()
            .then(() => console.log("Indexes ensured"))
            .catch(err => console.error("Error creating indexes:", err));

        console.log("DB Connection Successful");
    } catch (err) {
        console.error(`DB Connection failed: ${err}`);
    }
};

// Method to disconnect from MongoDB Database
export const closeDB = async () => mongoose.disconnect();

// Export ObjectID
export const ObjectID = mongoose.Types.ObjectId;

// DB SETUP
