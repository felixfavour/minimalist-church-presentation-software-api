import mongoose, { Schema, Document } from "mongoose";

interface ISermon extends Document {
    title: string;
    date: Date;
    content: string;
    documentLink: string;
    churchId: mongoose.Types.ObjectId;
}

const sermonSchema: Schema = new Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true },
    content: { type: String, required: true },
    documentLink: { type: String },
    churchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Church",
        required: true,
    },
});

export default mongoose.model<ISermon>("Sermon", sermonSchema);
