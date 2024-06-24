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
            // required: true,
        },
        cover: {
            type: String,
            // required: true,
        },
        artist: {
            type: String,
            required: true,
        },
        isPublic: {
            type: Boolean,
            default: false,
        },
        churchId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Church",
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true },
);

SongSchema.index(
    { title: "text", artist: "text", lyrics: "text" },
    { weights: { title: 5, artist: 4, lyrics: 3 }, default_language: "none" },
);

export const Song = mongoose.model("song", SongSchema);
