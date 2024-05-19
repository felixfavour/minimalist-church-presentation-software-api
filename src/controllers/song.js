/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import { errorMsg, successMsg } from "../helpers/functions.js";
import { Song } from "../models/Song.js";

export const getSongs = async (req, res) => {
    try {
        let songs = [];
        if (req.query.search) {
            songs = await Song.aggregate([
                {
                    // $match: {
                    //     $or: [
                    //         { title: { $regex: req.query.search, $options: "i" } },
                    //         { artist: { $regex: req.query.search, $options: "i" } },
                    //     ],
                    // },
                    $match: {
                        $text: { $search: req.query.search },
                    },
                },
                {
                    $sort: { score: { $meta: "textScore" } }, // Sorting by relevance
                },
                {
                    $limit: 20,
                },
            ]);
            res.json(successMsg(songs));
        } else {
            songs = await Song.aggregate([{ $sample: { size: 15 } }]);
            res.json(successMsg(songs));
        }
    } catch (err) {
        console.error(`GET SONG ERROR: ${err}`);
        res.status(400).json(errorMsg(err));
    }
};

export const addSong = async (req, res) => {
    try {
        const { title, artist, lyrics } = req.body;
        const newSong = await Song.create({
            title,
            artist,
            lyrics,
        });
        res.status(201).json(newSong);
    } catch (error) {
        res.status(500).json({ message: "Error creating song", error: error.message });
    }
};
