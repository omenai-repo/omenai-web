import mongoose, { Schema, model, models } from "mongoose";

const recentView = new Schema(
  {
    artwork: {
      type: String,
    },
    artist: {
      type: String,
    },
    user: {
      type: String,
      unique: true,
    },
    art_id: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

export const RecentView =
  mongoose.models.RecentView || mongoose.model("RecentView", recentView);
