import mongoose, { Schema, Document } from "mongoose";

export interface ISlide extends Document {
    content: string;
    churchId: mongoose.Types.ObjectId;
}

const slideSchema: Schema = new Schema({
    content: { type: String, required: true },
    presentationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Presentation",
        required: true,
    },
});

export default mongoose.model<ISlide>("Slide", slideSchema);
