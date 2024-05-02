import mongoose from "mongoose";

const hymnSchema = new mongoose.Schema({
    number: { type: String, required: true },
    title: { type: String, required: true },
    chorus: { type: String, required: true },
    verses: [{ type: String, required: true }],
    author: String,
    source: String,
    meta: String,
});

const Hymn = mongoose.model("Hymn", hymnSchema);
