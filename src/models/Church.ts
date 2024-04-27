import mongoose, { Document, model, Schema } from "mongoose";

export interface IChurch extends Document {
    name: string;
    type: string;
    address: string;
    email: string;
    password: string;
    pastor: string;
    presentations: mongoose.Types.ObjectId[];
}

const churchSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    pastor: { type: String, required: true },
    presentations: [{ type: Schema.Types.ObjectId, ref: "Presentation" }],
});

export default model<IChurch>("Church", churchSchema);
