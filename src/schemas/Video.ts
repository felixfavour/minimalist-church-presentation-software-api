import mongoose, { Schema, Document } from "mongoose";

interface IVideo extends Document {
    title: string;
    url: string;
    filesize: number;
    format: string;
    duration: number;
    uploadDate: Date;
    description: string;
    churchId: mongoose.Types.ObjectId;
}

const videoSchema: Schema = new Schema({
    churchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Church",
        required: true,
    },
    title: { type: String, required: true },
    url: { type: String, required: true },
    filesize: { type: Number, required: true },
    format: { type: String, required: true },
    duration: { type: Number, required: true },
    uploadDate: { type: Date, default: Date.now },
    description: { type: String },
});

export default mongoose.model<IVideo>("Video", videoSchema);
