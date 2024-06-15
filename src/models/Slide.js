import mongoose from "mongoose";
import { Alignment } from "../helpers/constants.js";

const slideStyleSchema = new mongoose.Schema({
  blur: Number,
  brightness: Number,
  alignment: {
    type: String,
    enum: Object.values(Alignment),
    default: Alignment.LEFT,
  },
  font: String,
});

const slideSchema = new mongoose.Schema({
  churchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Church",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  layout: {
    type: String,
    required: true,
  },
  // contents: [
  //   {
  //     type: String,
  //     required: true,
  //   },
  // ],
  contents: [
    {
      type: Array,
      required: true,
    },
  ],
  backgroundType: String,
  background: String,
  backgroundVideoKey: String,
  title: String,
  songId: String,
  hasChorus: {
    type: Boolean,
    default: false,
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
  },
  slideStyle: {
    type: Object,
  },
}, { timestamps: true });

export const Slide = mongoose.model("Slide", slideSchema);
