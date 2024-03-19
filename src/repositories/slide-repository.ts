import mongoose from "mongoose";
import Slide, { ISlide } from "../schemas/Slide";

class SlideRepository {
    async create(slideData: ISlide) {
        const slide = new Slide(slideData);
        await slide.save();
        return slide;
    }

    async findAll() {
        return Slide.find();
    }

    async findById(id: number) {
        return Slide.findById(id);
    }

    async update(id: number, slideData: ISlide) {
        return Slide.findByIdAndUpdate(id, slideData, {
            new: true,
        });
    }

    async delete(id: number) {
        return Slide.findByIdAndDelete(id);
    }

    async findByChurchId(churchId: mongoose.Types.ObjectId): Promise<ISlide[]> {
        return Slide.find({ churchId: churchId });
    }
}

export const slideRepository = new SlideRepository();
