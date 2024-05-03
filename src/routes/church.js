import express from "express";
import { createChurch } from "../controllers/church.js";
import { createSlide, getSlidesByChurch } from "../controllers/slide.js";

const router = express.Router();

router.post("/", createChurch);

router.post("/:churchId/slides", createSlide);

router.get("/:churchId/slides", getSlidesByChurch);

export default router;
