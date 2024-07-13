import express from "express";

import { protect } from "../middlewares/auth.js";

import { createChurch, getChurch, sendEmailInvite } from "../controllers/church.js";

import scheduleRoutes from "./schedule.js";
import songRoutes from "./song.js";

const router = express.Router();

router.post("/", protect, createChurch);
router.post("/:churchId/emailInvite", protect, sendEmailInvite);
router.get("/:churchId", getChurch);

// nested routes
router.use("/:churchId/schedules", protect, scheduleRoutes);
router.use("/:churchId/songs", protect, songRoutes);

export default router;
