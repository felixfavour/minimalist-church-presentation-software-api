import express from "express";
import { getSlidesByChurch, addSlide, editSlide, deleteSlide } from "../controllers/slide.js";

const router = express.Router();

router.get("/church/:churchId", getSlidesByChurch);

router.post("/", addSlide);

router.put("/:slideId", deleteSlide);

router.delete("/:slideId", deleteSlide);

export default router;
