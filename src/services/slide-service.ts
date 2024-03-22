import { slideRepository } from "../repositories/slide-repository";
import { presentationRepository } from "../repositories/presentation-repository";

import { ISlide } from "../schemas/Slide";

async function addSlide(slideData: ISlide): Promise<ISlide> {
    try {
        const slide = await slideRepository.create(slideData);
        return slide;
    } catch (error) {
        throw new Error("Error creating slide");
    }
}

async function getAllSlidees(): Promise<ISlide[]> {
    try {
        const slidees = await slideRepository.findAll();
        return slidees;
    } catch (error) {
        throw new Error("Error retrieving slidees");
    }
}

async function getSlideById(id: number): Promise<ISlide> {
    try {
        const slide = await slideRepository.findById(id);
        if (!slide) {
            throw new Error(`Slide with ID ${id} not found`);
        }
        return slide;
    } catch (errorr) {
        throw new Error("Error retrieving slide");
    }
}

async function updateSlide(id: number, slideData: ISlide) {
    try {
        const slide = await slideRepository.update(id, slideData);
        return slide;
    } catch (error) {
        throw new Error("Error updating slide");
    }
}

export default {
    addSlide,
    getAllSlidees,
    getSlideById,
    updateSlide,
};
