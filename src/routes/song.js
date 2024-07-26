import express from "express";

import {
  createSong,
  deleteSong,
  getSong,
  getSongsByChurch,
  searchSongs,
  updateSong,
} from "../controllers/song.js";

const router = express.Router();

router.post("/", createSong);
router.get("/", searchSongs);
router.get("/all", getSongsByChurch);
router.get("/:songId", getSong);
router.put("/:songId", updateSong);
router.delete("/:songId", deleteSong);

export default router;
