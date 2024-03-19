import { presentationRepository } from "../repositories/presentation-repository";
import { IPresentation } from "../schemas/Presentation";

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

async function removePresentation(id: number) {
    try {
        const presentation = await presentationRepository.delete(id);
        return presentation;
    } catch (error) {
        throw new Error("Error removing presentation");
    }
}

export default {
    addPresentation,
    getAllPresentations,
    getPresentationById,
    updatePresentation,
    removePresentation,
};
