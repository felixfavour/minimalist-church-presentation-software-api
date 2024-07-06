import express from "express";
import {
    batchCreateSlides,
    batchDeleteSlides,
    batchUpdateSlides,
    createSlide,
    deleteSlide,
    getSlidesBySchedule,
    updateSlide,
} from "../controllers/slide.js";

const router = express.Router({ mergeParams: true });

router.post("/", createSlide);
router.post("/batch", batchCreateSlides);
router.get("/", getSlidesBySchedule);
router.put("/batch", batchUpdateSlides);
router.put("/:slideId", updateSlide);
router.delete("/:slideId", deleteSlide);
router.delete("/batch", batchDeleteSlides);

export default router;
