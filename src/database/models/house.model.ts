import { Schema, model, models } from "mongoose";
import mongoose from "mongoose";

const HouseSchema = new Schema(
  {
    houseFullName: {
      type: String,
      required: [true, "House Full Name is required"],
      minlength: [6, "House Full name must be at least 8 characters long"],
    },

    houseShortName: {
      type: String,
      required: [true, "House Short Name is required"],
      min: [2, "House Short Name must be at least 2 characters long"],
    },
    collegId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
      required: [true, "College id is required"],
    },
  },
  {
    timestamps: true,
  }
);

const House = models?.House || model("House", HouseSchema);

export default House;
