import mongoose from "mongoose";
import Video, { IVideo } from "../schemas/Video";

class VideoRepository {
    async create(videoData: IVideo) {
        const video = new Video(videoData);
        await video.save();
        return video;
    }

    async findAll() {
        return Video.find();
    }

    async findById(id: number) {
        return Video.findById(id);
    }

    async update(id: number, videoData: IVideo) {
        return Video.findByIdAndUpdate(id, videoData, { new: true });
    }

    async delete(id: number) {
        return Video.findByIdAndDelete(id);
    }

    async findByChurchId(churchId: mongoose.Types.ObjectId): Promise<IVideo[]> {
        return Video.find({ churchId: churchId });
    }
}

export const videoRepository = new VideoRepository();
