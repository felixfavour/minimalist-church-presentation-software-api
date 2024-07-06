import { Slide } from "../models/Slide.js";
import { errorMsg, successMsg } from "../helpers/functions.js";

export const getSlidesBySchedule = async (req, res) => {
  try {
    const { scheduleId } = req.params;
    const slides = await Slide.find({ scheduleId });

    res.status(200).json(slides);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching slides",
      error: error.message,
    });
  }
};

export const createSlide = async (req, res) => {
  try {
    const newSlide = await Slide.create(req.body);

    res.status(201).json(newSlide);
  } catch (error) {
    res.status(500).json({
      message: "Error creating slide",
      error: error.message,
    });
  }
};

export const updateSlide = async (req, res) => {
  const { slideId } = req.params;
  const slideData = req.body;

  try {
    const updatedSlide = await Slide.findByIdAndUpdate(
      slideId,
      {
        $set: slideData,
      },
      { new: true },
    );

    if (!updatedSlide) {
      return res.status(404).send("Slide not found");
    }

    res.status(200).json(updatedSlide);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update slide",
      error: error.message,
    });
  }
};

export const deleteSlide = async (req, res) => {
  try {
    const { slideId } = req.params;
    const slide = await Slide.findByIdAndDelete(slideId);
    if (!slide) {
      return res.status(404).json({ message: "Slide not found" });
    }
    res.status(200).json({ message: "Slide successfully deleted" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting slide",
      error: error.message,
    });
  }
};

export const batchCreateSlides = async (req, res) => {
  try {
    const slidesData = req.body;
    console.log(req.params.scheduleId);

    if (!Array.isArray(slidesData) || slidesData.length === 0) {
      return res.status(400).json(errorMsg("Invalid data provided"));
    }

    const createdSlides = await Slide.insertMany(slidesData, {
      validate: true,
    });

    res.status(201).json(createdSlides);
    // res.status(201).json(
    //   successMsg({
    //     data: `${createdSlides?.filter((slide) => !!slide)
    //       ?.length} slides created`,
    //   }),
    // );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const batchUpdateSlides = async (req, res) => {
  const updatedSlidesData = req.body;

  try {
    if (!Array.isArray(req.body) || req.body?.length === 0) {
      return res.status(400).json(errorMsg("Invalid data provided"));
    }

    const updatePromises = [];
    updatedSlidesData.forEach((slide) => {
      updatePromises.push(
        Slide.findByIdAndUpdate(slide?._id, { $set: slide }, { new: true }),
      );
    });
    const updatedSlides = await Promise.all(updatePromises);

    // res.status(200).json(updatedSlides);
    res.status(200).json(
      successMsg({
        data: `${updatedSlides?.filter((slide) => !!slide)
          ?.length} slides updated`,
      }),
    );
  } catch (error) {
    res.status(500).json({
      message: "Failed to batch update slide",
      error: error.message,
    });
  }
};

export const batchDeleteSlides = async (req, res) => {
  try {
    const slideIds = req.body;

    if (!Array.isArray(slideIds) || slideIds.length === 0) {
      return res.status(400).send("Invalid data provided.");
    }

    const deleteResult = await Slide.deleteMany({
      _id: { $in: slideIds },
    });

    if (deleteResult.deletedCount === 0) {
      return res.status(404).send("No slides found to delete.");
    }

    res.status(200).send(
      `Successfully deleted ${deleteResult.deletedCount} slides.`,
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
