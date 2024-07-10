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

export const updateSchedule = async (req, res) => {
    try {
        const { scheduleId } = req.params;
        const scheduleData = req.body;

        const updatedSchedule = await Schedule.findByIdAndUpdate(
            scheduleId,
            {
                $set: scheduleData,
            },
            { new: true },
        );

        if (!updatedSchedule) {
            return res.status(200).json(updateSchedule);
        }
    } catch (error) {
        res.status(500).json({
            message: "Error updating schedule",
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

// WebSocket Handlers
export const handleScheduleSocket = (io, socket) => {
    socket.on("join_schedule", scheduleId => {
        socket.join(scheduleId);
        console.log(`User joined schedule ${scheduleId}`);
    });

    socket.on("leave_schedule", scheduleId => {
        socket.leave(scheduleId);
        console.log(`User left schedule ${scheduleId}`);
    });
};
