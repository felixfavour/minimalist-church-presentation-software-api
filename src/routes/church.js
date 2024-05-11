import express from "express";
import { createChurch, getChurch } from "../controllers/church.js";
import { batchDeleteSlides, createSlide, deleteSlide, getSlidesByChurch, updateSlide } from "../controllers/slide.js";

const router = express.Router();

router.post("/", createChurch);

router.get("/:churchId", getChurch);

router.post("/:churchId/slides", createSlide);

router.post("/:churchId/slides/batch", batchCreateSlides);

router.get("/:churchId/slides", getSlidesByChurch);

router.put("/:churchId/slides/:slideId", updateSlide);

router.delete("/:churchId/slides/:slideId", deleteSlide);

router.delete("/:churchId/slides/batch", batchDeleteSlides);

export default router;
