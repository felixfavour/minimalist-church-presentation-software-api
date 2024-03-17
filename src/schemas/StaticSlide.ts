import mongoose, { Schema, Document } from "mongoose";

export interface IStaticSlide extends Document {
    content: string;
    churchId: mongoose.Types.ObjectId;
}

const staticSlideSchema: Schema = new Schema({
    content: { type: String, required: true },
    churchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Church",
        required: true,
    },
});

export default mongoose.model<IStaticSlide>("StaticSlide", staticSlideSchema);
