import express from "express";

import {
  createSong,
  deleteSong,
  getSongsByChurch,
  searchSongs,
  updateSong,
} from "../controllers/song.js";

const router = express.Router();

router.post("/", createSong);
router.get("/", searchSongs);
router.get("/all", getSongsByChurch);
router.put("/:songId", updateSong);
router.delete("/:songId", deleteSong);

export default router;
