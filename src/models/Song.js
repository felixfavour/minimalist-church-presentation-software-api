import mongoose from "mongoose";

const SongSchema = mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
        },
        lyrics: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        album: {
            type: String,
            required: true,
        },
        cover: {
            type: String,
            required: true,
        },
        artist: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

export const Song = mongoose.model("song", SongSchema);
