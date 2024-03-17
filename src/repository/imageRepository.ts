import mongoose from "mongoose";
import Image, { IImage } from "../schemas/Image";

class ImageRepository {
    async create(imageData: IImage) {
        const image = new Image(imageData);
        await image.save();
        return image;
    }

    async findAll() {
        return Image.find();
    }

    async findById(id: number) {
        return Image.findById(id);
    }

    async update(id: number, imageData: IImage) {
        return Image.findByIdAndUpdate(id, imageData, { new: true });
    }

    async delete(id: number) {
        return Image.findByIdAndDelete(id);
    }

    async findByChurchId(churchId: mongoose.Types.ObjectId): Promise<IImage[]> {
        return Image.find({ churchId: churchId });
    }
}

export const imageRepository = new ImageRepository();
