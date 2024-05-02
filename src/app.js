import express, { json, urlencoded } from "express";
import cors from "cors";

import logRequests from "./middlewares/logger.js";

import { protect } from "./middlewares/auth.js";

import song from "./routes/song.js";
import auth from "./routes/auth.js";
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

// Song-temp routes
app.use("/api/v1/songs", protect, song);

app.use("/api/v1/slides", slide);

export default app;
