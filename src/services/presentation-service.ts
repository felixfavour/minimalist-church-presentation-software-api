import { presentationRepository } from "../repositories/presentation-repository";
import { slideRepository } from "../repositories/slide-repository";
import { IPresentation } from "../schemas/Presentation";
import { ISlide } from "../schemas/Slide";

async function addPresentation(
    presentationData: IPresentation
): Promise<IPresentation> {
    try {
        const presentation = await presentationRepository.create(
            presentationData
        );
        return presentation;
    } catch (error) {
        throw new Error("Error creating presentation");
    }
}

async function getAllPresentations(): Promise<IPresentation[]> {
    try {
        const presentations = await presentationRepository.findAll();
        return presentations;
    } catch (error) {
        throw new Error("Error retrieving presentationes");
    }
}

async function getPresentationById(id: number): Promise<IPresentation> {
    try {
        const presentation = await presentationRepository.findById(id);
        if (!presentation) {
            throw new Error(`Presentation with ID ${id} not found`);
        }
        return presentation;
    } catch (errorr) {
        throw new Error("Error retrieving presentation");
    }
}

async function updatePresentation(id: number, presentationData: IPresentation) {
    try {
        const presentation = await presentationRepository.update(
            id,
            presentationData
        );
        return presentation;
    } catch (error) {
        throw new Error("Error updating presentation");
    }
}

async function removePresentation(id: number): Promise<void> {
    try {
        await slideRepository.deleteMany(id);
        await presentationRepository.delete(id);
    } catch (error) {
        throw new Error("Error removing presentation");
    }
}

async function addSlide(presentationId: number, slideData: ISlide) {
    try {
        const newSlide = await slideRepository.create(slideData);
        const updatedPresentation =
            await presentationRepository.addSlideToPresentation(
                presentationId,
                newSlide._id
            );
        return updatedPresentation;
    } catch (error) {
        throw new Error(`Error adding slide to presentation`);
    }
}

async function removeSlide(presentationId: number, slideId: number) {
    try {
        const updatedPresentation = await presentationRepository.removeSlide(
            presentationId,
            slideId
        );

        await slideRepository.delete(slideId);

        if (!updatedPresentation) {
            throw new Error(
                "Presentation not found or slide not part of the presentation"
            );
        }

        return updatedPresentation;
    } catch (error) {
        throw new Error(`Error removing slide`);
    }
}

export default {
    addPresentation,
    getAllPresentations,
    getPresentationById,
    updatePresentation,
    removePresentation,
    addSlide,
    removeSlide,
};
