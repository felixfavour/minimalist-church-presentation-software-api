import mongoose, { Document, model, Schema } from "mongoose";

export interface IChurch extends Document {
    name: string;
    type: string;
    address: string;
    email: string;
    password: string;
    pastor: string;
}

const churchSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    pastor: { type: String, required: true },
});

export default model<IChurch>("Church", churchSchema);
