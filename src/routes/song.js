import express from "express";

import { getSongs } from "../controllers/song.js";

const router = express.Router();

router.get("/", getSongs);

export default router;
