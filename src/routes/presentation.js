import express from "express";
import {
    getPresentationsByChurch,
    addPresentation,
    addSlideToPresentation,
    removeSlideFromPresentation,
} from "../controllers/presentation.js";

const router = express.Router();

router.get("/church/:churchId", getPresentationsByChurch);

router.post("/", addPresentation);

router.post("/:presentationId/slides", addSlideToPresentation);

router.delete("/:presentationId/slides/:slideId", removeSlideFromPresentation);

export default router;
