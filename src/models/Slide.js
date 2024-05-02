import mongoose from "mongoose";

const slideStyleSchema = new mongoose.Schema({
    blur: Number,
    brightness: Number,
    alignment: String,
    font: String,
});

const slideSchema = new mongoose.Schema({
    church: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Church",
        required: true,
    },

    name: { type: String, required: true },
    type: { type: String, required: true },
    layout: { type: String, required: true },
    contents: [{ type: String, required: true }],
    backgroundType: String,
    background: String,
    title: String,
    songId: String,
    hasChorus: Boolean,
    data: {
        type: mongoose.Schema.Types.Mixed,
    },
    slideStyle: slideStyleSchema,
});

export const Slide = mongoose.model("Slide", slideSchema);
