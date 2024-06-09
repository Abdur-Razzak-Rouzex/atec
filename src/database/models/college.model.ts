import { Schema, model, models } from "mongoose";

const CollegeSchema = new Schema(
  {
    collegeFullName: {
      type: String,
      required: [true, "Colleg Full Name is required"],
      minlength: [16, "Collge Full name must be at least 16 characters long"],
      unique: true,
    },

    collegeAcronym: {
      type: String,
      required: [true, "Colleg Short Name is required"],
      min: [3, "Colleg Short Name must be at least 3 characters long"],
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const College = models?.College || model("College", CollegeSchema);

export default College;
