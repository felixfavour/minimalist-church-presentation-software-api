import express from "express";
import { createChurch, getChurch, sendEmailInvite } from "../controllers/church.js";

import scheduleRoutes from "./schedule.js";
import songRoutes from "./song.js";

const router = express.Router();

router.post("/", createChurch);
router.get("/:churchId", getChurch);
router.post("/:churchId/emailInvite", sendEmailInvite);

// nested routes
router.use("/:churchId/schedules", scheduleRoutes);
router.use("/:churchId/songs", songRoutes);

export default router;
