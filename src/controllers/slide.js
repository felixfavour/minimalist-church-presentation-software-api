import mongoose from "mongoose";
import { Slide } from "../models/Slide.js";
import { Church } from "../models/Church.js";

export const getSlidesByChurch = async (req, res) => {
    try {
        const { churchId } = req.params;
        const slides = await Slide.find({ churchId });

        res.status(200).json(slides);
    } catch (error) {
        res.status(500).json({ message: "Error fetching slides", error: error.message });
    }
};

export const createSlide = async (req, res) => {
    try {
        const { churchId } = req.params;
        const { name, type, layout } = req.body;
        const newSlide = await Slide.create({
            churchId,
            name,
            type,
            layout,
        });

        res.status(201).json(newSlide);
    } catch (error) {
        res.status(500).json({ message: "Error creating slide", error: error.message });
    }
};

export const updateSlide = async (req, res) => {
    const { slideId } = req.params;
    const slideData = req.body;

    try {
        const updatedSlide = await Slide.findByIdAndUpdate(slideId, { $set: slideData }, { new: true });

        if (!updatedSlide) {
            return res.status(404).send("Slide not found");
        }

        res.status(200).json(updatedSlide);
    } catch (error) {
        res.status(500).json({ message: "Failed to update slide", error: error.message });
    }
};

export const deleteSlide = async (req, res) => {
    try {
        const { slideId } = req.params;
        const slide = await Slide.findByIdAndDelete(slideId);
        if (!slide) {
            return res.status(404).json({ message: "Slide not found" });
        }
        res.status(200).json({ message: "Slide successfully deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting slide", error: error.message });
    }
};

export const batchCreateSlides = async (req, res) => {
    try {
        const { churchId } = req.params;
        const slidesData = req.body;

        if (!Array.isArray(slidesData) || slidesData.length === 0) {
            return res.status(400).send("Invalid data provided.");
        }

        const slidesWithChurchId = slidesData.map(data => ({ ...data, churchId }));

        const createdSlides = await Slide.insertMany(slidesWithChurchId, { validate: true });

        res.status(201).json(createdSlides);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const batchDeleteSlides = async (req, res) => {
    try {
        const slideIds = req.body;

        if (!Array.isArray(slideIds) || slideIds.length === 0) {
            return res.status(400).send("Invalid data provided.");
        }

        const deleteResult = await Slide.deleteMany({
            _id: { $in: slideIds },
        });

        if (deleteResult.deletedCount === 0) {
            return res.status(404).send("No slides found to delete.");
        }

        res.status(200).send(`Successfully deleted ${deleteResult.deletedCount} slides.`);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
