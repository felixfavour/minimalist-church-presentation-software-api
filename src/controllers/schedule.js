import { Schedule } from "../models/Schedule.js";

export const createSchedule = async (req, res) => {
    try {
        const newSchedule = await Schedule.create(req.body);

        res.status(201).json(newSchedule);
    } catch (error) {
        res.status(500).json({
            message: "Error creating schedule",
            error: error.message,
        });
    }
};

export const getSchedulesByChurch = async (req, res) => {
    try {
        const { churchId } = req.params;
        const schedules = await Schedule.find({ churchId });

        res.status(200).json(schedules);
    } catch {
        res.status(500).json({
            message: "Error reading schedules",
            error: error.message,
        });
    }
};

export const deleteSchedule = async (req, res) => {
    try {
        const { scheduleId } = req.params;
        const schedule = await Schedule.findByIdAndDelete(scheduleId);
        if (!schedule) {
            return res.status(404).json({ message: "Schedule not found" });
        }
        res.status(200).json({ message: "Schedule successfully deleted" });
    } catch {
        res.status(500).json({
            message: "Error deleting schedule",
            error: error.message,
        });
    }
};
