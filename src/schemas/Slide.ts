import mongoose, { Schema, Document } from "mongoose";

export interface ISlide extends Document {
    content: string;
    churchId: mongoose.Types.ObjectId;
}

const slideSchema: Schema = new Schema({
    content: { type: String, required: true },
    churchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Church",
        required: true,
    },
});

export default mongoose.model<ISlide>("Slide", slideSchema);
