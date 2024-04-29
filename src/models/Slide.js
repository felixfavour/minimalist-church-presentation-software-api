import mongoose from "mongoose";

const SlideSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    layout: { type: String, required: true },
    contents: { type: [String], required: true },
    backgroundType: String,
    background: String,
    presentationId: {
        type: Schema.Types.ObjectId,
        ref: "Presentation",
        required: true,
    },
});

export const Slide = mongoose.model("slide", SlideSchema);
