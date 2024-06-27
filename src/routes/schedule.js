import express from "express";

import { createSchedule, deleteSchedule, getSchedulesByChurch } from "../controllers/schedule.js";

import slidesRouter from "./slide.js";

const router = express.Router({ mergeParams: true });

router.post("/", createSchedule);
router.get("/", getSchedulesByChurch);
router.delete("/:scheduleId", deleteSchedule);
router.use("/:scheduleId/slides", slidesRouter);

export default router;
