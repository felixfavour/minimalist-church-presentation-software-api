import mongoose from "mongoose";
import Presentation, { IPresentation } from "../schemas/Presentation";

class PresentationRepository {
    async create(sermonData: IPresentation) {
        const presentation = new Presentation(sermonData);
        await presentation.save();
        return presentation;
    }

    async findAll() {
        return Presentation.find();
    }

    async findById(id: number) {
        return Presentation.findById(id);
    }

    async update(id: number, sermonData: IPresentation) {
        return Presentation.findByIdAndUpdate(id, sermonData, { new: true });
    }

    async delete(id: number) {
        return Presentation.findByIdAndDelete(id);
    }

    async findByChurchId(
        churchId: mongoose.Types.ObjectId
    ): Promise<IPresentation[]> {
        return Presentation.find({ churchId: churchId });
    }
}

export const presentationRepository = new PresentationRepository();
