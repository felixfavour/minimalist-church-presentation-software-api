import { Server } from "socket.io";
import { handleScheduleSocket } from "./controllers/schedule.js";

export function setupWebSocket(server) {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", socket => {
        console.log("a user connected");

        handleScheduleSocket(io, socket);

        socket.on("disconnect", () => {
            console.log("user disconnected");
        });
    });

    return io;
}
