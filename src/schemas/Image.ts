import mongoose, { Schema, Document } from "mongoose";

interface IImage extends Document {
    title: string;
    url: string;
    filesize: number;
    format: string;
    width: number;
    height: number;
    uploadDate: Date;
    description: string;
    churchId: mongoose.Types.ObjectId;
}

const imageSchema: Schema = new Schema({
    churchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Church",
        required: true,
    },
    title: { type: String, required: true },
    url: { type: String, required: true },
    filesize: { type: Number, required: true },
    format: { type: String, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    uploadDate: { type: Date, default: Date.now },
    description: { type: String },
});

export default mongoose.model<IImage>("Image", imageSchema);
