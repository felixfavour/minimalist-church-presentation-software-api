import mongoose from "mongoose";

const PresentationSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        slides: [{ type: Schema.Types.ObjectId, ref: "Slide" }],
        church: { type: Schema.Types.ObjectId, ref: "Church", required: true },
    },
    {
        timestamps: true,
    },
);

export const Presentation = mongoose.model("presentation", PresentationSchema);
