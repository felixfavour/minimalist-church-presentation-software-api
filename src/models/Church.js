import mongoose from "mongoose";

const ChurchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    pastor: {
        type: String,
        required: true,
    },
});

export const Church = mongoose.model("Church", ChurchSchema);
