import { Presentation } from "../models/Presentation.js";
import { Slide } from "../models/Slide.js";

export const getPresentationsByChurch = async (req, res) => {
    try {
        const presentations = await Presentation.find({ church: req.params.churchId });
        res.status(200).json(presentations);
    } catch (error) {
        res.status(500).json({ message: "Error fetching presentations", error: error.message });
    }
};

export const addPresentation = async (req, res) => {
    try {
        const { title, church } = req.body;
        const newPresentation = await Presentation.create({ title, church });
        res.status(201).json(newPresentation);
    } catch (error) {
        res.status(500).json({ message: "Error creating presentation", error: error.message });
    }
};

export const addSlideToPresentation = async (req, res) => {
    try {
        const presentation = await Presentation.findById(req.params.presentationId);
        const newSlide = new Slide(req.body);
        presentation.slides.push(newSlide);
        await presentation.save();
        res.status(200).json(presentation);
    } catch (error) {
        res.status(500).json({ message: "Error adding slide", error: error.message });
    }
};

export const removeSlideFromPresentation = async (req, res) => {
    try {
        const presentation = await Presentation.findById(req.params.presentationId);
        presentation.slides.pull({ _id: req.params.slideId });
        await presentation.save();
        res.status(200).json(presentation);
    } catch (error) {
        res.status(500).json({ message: "Error removing slide", error: error.message });
    }
};
