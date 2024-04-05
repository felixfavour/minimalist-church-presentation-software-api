import mongoose, { Schema, model, Document } from "mongoose";

export interface IPresentation extends Document {
    title: string;
    slides: mongoose.Types.ObjectId[];
    createdAt: Date;
}

const presentationSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        slides: [{ type: Schema.Types.ObjectId, ref: "Slide" }],
    },
    {
        timestamps: true,
    }
);

export default model<IPresentation>("Presentation", presentationSchema);
