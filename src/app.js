import express, { json, urlencoded } from "express";
import cors from "cors";

import logRequests from "./middlewares/logger.js";

import { protect } from "./middlewares/auth.js";

import auth from "./routes/auth.js";
import church from "./routes/church.js";
import song from "./routes/song.js";
import slide from "./routes/slide.js";

const app = express();

// Set CORS
app.use(cors());

// Parse JSON requests
app.use(json());

// Log all requests
app.use(logRequests);

// Parse FormData requests
app.use(urlencoded({ extended: true }));

app.use("/api/v1/auth", auth);

app.use("/api/v1/church", protect, church);

app.use("/api/v1/song", protect, song);

app.use("/api/v1/slide", protect, slide);

export default app;
