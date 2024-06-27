import express from "express";

import { createSong, deleteSong, searchSongs, getSongsByChurch, updateSong } from "../controllers/song.js";

const router = express.Router();

router.post("/", createSong);
router.get("/", getSongsByChurch);
router.get("/", searchSongs);
router.put("/:songId", updateSong);
router.delete("/:songId", deleteSong);

export default router;
