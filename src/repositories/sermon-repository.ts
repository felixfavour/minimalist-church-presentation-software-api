import mongoose from "mongoose";
import Sermon, { ISermon } from "../schemas/Sermon";

class SermonRepository {
    async create(sermonData: ISermon) {
        const sermon = new Sermon(sermonData);
        await sermon.save();
        return sermon;
    }

    async findAll() {
        return Sermon.find();
    }

    async findById(id: number) {
        return Sermon.findById(id);
    }

    async update(id: number, sermonData: ISermon) {
        return Sermon.findByIdAndUpdate(id, sermonData, { new: true });
    }

    async delete(id: number) {
        return Sermon.findByIdAndDelete(id);
    }

    async findByChurchId(
        churchId: mongoose.Types.ObjectId
    ): Promise<ISermon[]> {
        return Sermon.find({ churchId: churchId });
    }
}

export const sermonRepository = new SermonRepository();
