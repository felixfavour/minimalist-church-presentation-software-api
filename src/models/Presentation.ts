import mongoose, { Schema, model, Document } from "mongoose";

export interface IPresentation extends Document {
    title: string;
}

const presentationSchema: Schema = new Schema({
    title: { type: String, required: true },
});

export default model<IPresentation>("Presentation", presentationSchema);
