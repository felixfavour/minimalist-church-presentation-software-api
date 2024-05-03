import express from "express";
import { createChurch } from "../controllers/church.js";
import { createSlide, deleteSlide, getSlidesByChurch, updateSlide } from "../controllers/slide.js";

const router = express.Router();

router.post("/", createChurch);

router.post("/:churchId/slides", createSlide);

router.get("/:churchId/slides", getSlidesByChurch);

router.put("/:churchId/slides/:slideId", updateSlide);

router.delete("/:churchId/slides/:slideId", deleteSlide);

export default router;
