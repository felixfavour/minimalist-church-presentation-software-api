import express, { json, urlencoded } from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import logRequests from "./middlewares/logger.js";
import { protect } from "./middlewares/auth.js";

import { User } from "./models/User.js";

import auth from "./routes/auth.js";
import church from "./routes/church.js";
import song from "./routes/song.js";
import slide from "./routes/slide.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

// Middleware to attach io to req
app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use(cors());
app.use(json());
app.use(logRequests);
app.use(urlencoded({ extended: true }));

app.use("/api/v1/auth", auth);
app.use("/api/v1/church", church);
app.use("/api/v1/song", protect, song);
app.use("/api/v1/slide", protect, slide);

io.on("connection", socket => {
    console.log("a user connected");

    socket.on("disconnect", reason => {
        console.log("user disconnected:", reason);
    });

    socket.on("message", message => {
        console.log("received message:", message);
        io.emit("message", message);
    });

    socket.on("error", err => {
        console.error("Socket error:", err);
    });

    // Fetch user's church ID from the database and join the appropriate room
    socket.on("joinChurch", async userId => {
        try {
            const user = await User.findById(userId);
            if (user && user.churchId) {
                socket.join(`church_${user.churchId}`);
                console.log(`User joined church room: church_${user.churchId}`);
            } else {
                console.log("User or church ID not found");
            }
        } catch (err) {
            console.error("Error joining church room:", err);
        }
    });
});

export default server;
