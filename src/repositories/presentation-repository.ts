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
        return Presentation.findById(id).populate("slides");
    }

    async update(id: number, sermonData: IPresentation) {
        return Presentation.findByIdAndUpdate(id, sermonData, { new: true });
    }

    async delete(id: number) {
        return Presentation.findByIdAndDelete(id);
    }

    async findByChurchId(churchId: number): Promise<IPresentation[]> {
        return Presentation.find({ churchId: churchId });
    }

    async addSlideToPresentation(
        presentationId: number,
        slideId: number
    ): Promise<IPresentation> {
        const updatedPresentation = await Presentation.findOneAndUpdate(
            { _id: presentationId },
            { $push: { slides: slideId } },
            { new: true }
        );

        if (!updatedPresentation) {
            throw new Error(`Presentation with ID ${presentationId} not found`);
        }

        return updatedPresentation;
    }

    async removeSlide(
        presentationId: number,
        slideId: number
    ): Promise<IPresentation> {
        try {
            const updatedPresentation = await Presentation.findOneAndUpdate(
                { _id: presentationId, slides: slideId },
                { $pull: { slides: slideId } },
                { new: true }
            );

            if (!updatedPresentation) {
                throw new Error(
                    `Presentation containing slide ID ${slideId} not found`
                );
            }

            return updatedPresentation;
        } catch (error) {
            throw new Error(`Error removing slide from presentation`);
        }
    }
}

export const presentationRepository = new PresentationRepository();
