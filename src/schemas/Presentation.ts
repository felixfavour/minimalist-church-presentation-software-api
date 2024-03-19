import mongoose, { Schema, Document } from "mongoose";

export interface IPresentation extends Document {
    title: string;
    date: Date;
    slides: mongoose.Types.ObjectId[];
    churchId: mongoose.Types.ObjectId;
}

const presentationSchema: Schema = new Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true },
    slides: [{ type: mongoose.Schema.Types.ObjectId, ref: "Slide" }],
    churchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Church",
        required: true,
    },
});

export default mongoose.model<IPresentation>(
    "Presentation",
    presentationSchema
);
