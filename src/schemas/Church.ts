import mongoose, { Schema, Document } from "mongoose";

export interface IChurch extends Document {
    name: string;
    address: string;
    phone: string;
    email: string;
}

const eventSchema: Schema = new Schema({
    day: String,
    time: String,
    description: String,
});

const churchSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    pastor: { type: String, required: false },
    address: { type: String, required: true },
    schedule: [eventSchema],
    timezone: { type: String, required: false },
    phone: { type: String, required: true },
    email: { type: String, required: true },
});

export default mongoose.model<IChurch>("Church", churchSchema);
