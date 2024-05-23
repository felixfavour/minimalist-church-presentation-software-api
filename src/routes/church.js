import express from "express";
import { createChurch, getChurch } from "../controllers/church.js";
import {
    batchDeleteSlides,
    batchCreateSlides,
    createSlide,
    deleteSlide,
    getSlidesByChurch,
    updateSlide,
} from "../controllers/slide.js";
import { addSong, getSongsByChurch } from "../controllers/song.js";

const router = express.Router();

router.post("/", createChurch);

router.get("/:churchId", getChurch);

router.post("/:churchId/slides", createSlide);

router.post("/:churchId/slides/batch", batchCreateSlides);

router.post("/:churchId/songs", addSong);

router.get("/:churchId/slides", getSlidesByChurch);

router.get("/:churchId/songs", getSongsByChurch);

router.put("/:churchId/slides/:slideId", updateSlide);

router.delete("/:churchId/slides/:slideId", deleteSlide);

router.delete("/:churchId/slides/batch", batchDeleteSlides);

export default router;
