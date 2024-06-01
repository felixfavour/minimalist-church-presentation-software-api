/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import { errorMsg, successMsg } from "../helpers/functions.js";
import { Song } from "../models/Song.js";

export const searchSongs = async (req, res) => {
  try {
    let songs = [];
    const churchId = req.query.churchId;

    if (req.query.search) {
      songs = await Song.aggregate([
        {
          $match: {
            $and: [
              { $text: { $search: req.query.search } },
              {
                $or: [{ isPublic: { $ne: false } }, { churchId }],
              },
            ],
          },
        },
        {
          $sort: { score: { $meta: "textScore" } },
        },
        {
          $limit: 20,
        },
      ]);
      res.json(successMsg(songs));
    } else {
      songs = await Song.aggregate([
        {
          $match: {
            $or: [{ isPublic: { $ne: false } }, { churchId }],
          },
        },
        { $sample: { size: 15 } },
      ]);
      res.json(successMsg(songs));
    }
  } catch (err) {
    console.error(`GET SONG ERROR: ${err}`);
    res.status(400).json(errorMsg(err));
  }
};

export const getSongsByChurch = async (req, res) => {
  try {
    const { churchId } = req.params;
    const songs = await Song.find({ churchId });

    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching songs",
      error: error.message,
    });
  }
};

export const addSong = async (req, res) => {
  try {
    const userId = req.user._id;
    const { churchId } = req.params;

    const { id, title, artist, lyrics, isPublic } = req.body;
    const newSong = await Song.create({
      id,
      title,
      artist,
      lyrics,
      isPublic,
      churchId,
      createdBy: userId,
    });
    res.status(201).json(newSong);
  } catch (error) {
    res.status(500).json({
      message: "Error creating song",
      error: error.message,
    });
  }
};

export const updateSong = async (req, res) => {
  const { songId } = req.params;
  const songData = req.body;

  try {
    const updatedSong = await Song.findByIdAndUpdate(
      songId,
      { $set: songData },
      { new: true, runValidators: true },
    );

    if (!updatedSong) {
      return res.status(404).json({ message: "Song not found" });
    }

    res.status(200).json(updatedSong);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update song",
      error: error.message,
    });
  }
};

export const deleteSong = async (req, res) => {
  try {
    const { songId } = req.params;

    const deletedSong = await Song.findByIdAndDelete(songId);

    if (!deletedSong) {
      return res.status(404).json({ message: "Song not found" });
    }

    res.status(200).json(successMsg(deletedSong));
  } catch (error) {
    console.error(`DELETE SONG ERROR: ${error}`);
    res.status(500).json(errorMsg(error));
  }
};
