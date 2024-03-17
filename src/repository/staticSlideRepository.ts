import mongoose from "mongoose";
import StaticSlide, { IStaticSlide } from "../schemas/StaticSlide";

class StaticSlideRepository {
    async create(staticSlideData: IStaticSlide) {
        const staticSlide = new StaticSlide(staticSlideData);
        await staticSlide.save();
        return staticSlide;
    }

    async findAll() {
        return StaticSlide.find();
    }

    async findById(id: number) {
        return StaticSlide.findById(id);
    }

    async update(id: number, staticSlideData: IStaticSlide) {
        return StaticSlide.findByIdAndUpdate(id, staticSlideData, {
            new: true,
        });
    }

    async delete(id: number) {
        return StaticSlide.findByIdAndDelete(id);
    }

    async findByChurchId(
        churchId: mongoose.Types.ObjectId
    ): Promise<IStaticSlide[]> {
        return StaticSlide.find({ churchId: churchId });
    }
}

export const staticSlideRepository = new StaticSlideRepository();
