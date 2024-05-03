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

        if (churchId) {
            await Church.findByIdAndUpdate(churchId, {
                $push: { slideIds: newSlide._id },
            });
        }

        res.status(201).json(newSlide);
    } catch (error) {
        res.status(500).json({ message: "Error creating slide", error: error.message });
    }
};

export const editSlide = async (req, res) => {
    try {
        const { slideId } = req.params;
        const slideUpdate = req.body;
        const updatedSlide = await Slide.findByIdAndUpdate(slideId, slideUpdate, { new: true });
        if (!updatedSlide) {
            return res.status(404).json({ message: "Slide not found" });
        }
        res.status(200).json(updatedSlide);
    } catch (error) {
        res.status(500).json({ message: "Error updating slide", error: error.message });
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
