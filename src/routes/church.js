import express from "express";
import { createChurch, getChurch, sendEmailInvite } from "../controllers/church.js";
import {
    batchCreateSlides,
    batchDeleteSlides,
    batchUpdateSlides,
    createSlide,
    deleteSlide,
    getSlidesByChurch,
    updateSlide,
} from "../controllers/slide.js";
import { addSong, deleteSong, getSong, getSongsByChurch, updateSong } from "../controllers/song.js";

const router = express.Router();

router.post("/", createChurch);

router.get("/:churchId", getChurch);

router.post("/:churchId/emailInvite", sendEmailInvite);

router.post("/:churchId/slides", createSlide);

router.post("/:churchId/slides/batch", batchCreateSlides);

router.post("/:churchId/songs", addSong);

router.get("/:churchId/slides", getSlidesByChurch);

router.get("/:churchId/songs", getSongsByChurch);

router.put("/:churchId/slides/batch", batchUpdateSlides);

router.put("/:churchId/slides/:slideId", updateSlide);

router.get("/:churchId/song/:songId", getSong);

router.put("/:churchId/songs/:songId", updateSong);

router.delete("/:churchId/slides/:slideId", deleteSlide);

router.delete("/:churchId/songs/:songId", deleteSong);

router.delete("/:churchId/slides/batch", batchDeleteSlides);

export default router;
