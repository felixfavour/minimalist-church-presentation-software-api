import mongoose, { Schema, Document } from "mongoose";

interface IChurch extends Document {
    name: string;
    address: string;
    phone: string;
    email: string;
}

const churchSchema: Schema = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
});

export default mongoose.model<IChurch>("Church", churchSchema);
