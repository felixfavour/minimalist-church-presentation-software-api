/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import { errorMsg, successMsg } from "../helpers/functions.js";
import { Song } from "../models/Song.js";

export const getSongs = async (req, res) => {
    try {
        console.log("gello");
        let songs = [];
        if (req.query.search) {
            songs = await Song.aggregate([
                {
                    $match: {
                        $or: [
                            { title: { $regex: req.query.search, $options: "i" } },
                            { artist: { $regex: req.query.search, $options: "i" } },
                        ],
                    },
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
