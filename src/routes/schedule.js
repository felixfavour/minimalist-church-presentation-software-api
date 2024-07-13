import express from "express";

import {
  createSchedule,
  deleteSchedule,
  getSchedulesByChurch,
  updateSchedule,
} from "../controllers/schedule.js";

import slidesRouter from "./slide.js";

const router = express.Router({ mergeParams: true });

router.post("/", createSchedule);
router.get("/", getSchedulesByChurch);
router.put("/:scheduleId", updateSchedule);
router.delete("/:scheduleId", deleteSchedule);

// nested routes
router.use("/:scheduleId/slides", slidesRouter);

export default router;
