import mongoose, { Document, model, Schema } from "mongoose";

export interface ISlide extends Document {
    name: string;
    type: string;
    layout: string;
    contents: string[];
    backgroundType?: string;
    background?: string;
    presentationId: mongoose.Types.ObjectId;
}

const slideSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    layout: { type: String, required: true },
    contents: { type: [String], required: true },
    backgroundType: String,
    background: String,
    presentationId: {
        type: Schema.Types.ObjectId,
        ref: "Presentation",
        required: true,
    },
});

export default model<ISlide>("Slide", slideSchema);
