import express from "express";

import { searchSongs } from "../controllers/song.js";

const router = express.Router();

router.get("/", searchSongs);

export default router;
