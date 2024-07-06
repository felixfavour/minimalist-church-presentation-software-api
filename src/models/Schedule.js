import mongoose from "mongoose";

const ScheduleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    churchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Church",
      required: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    editorIds: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      required: true,
    },
    lastUpdated: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

export const Schedule = mongoose.model("Schedule", ScheduleSchema);
