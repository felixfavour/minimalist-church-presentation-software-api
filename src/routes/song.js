import express from "express";

import { createSong, deleteSong, getSongs, getSongsByChurch, updateSong } from "../controllers/song.js";

const router = express.Router();

router.post("/", createSong);
router.get("/", getSongs);
router.get("/", getSongsByChurch);
router.put("/:songId", updateSong);
router.delete("/:songId", deleteSong);

export default router;
