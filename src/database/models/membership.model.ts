import { Schema, model, models } from "mongoose";
// import { Boolean } from "zod";

const MembershipFormSchema = new Schema(
  {
    fullName: { type: String, required: true, unique: true, trim: true },
    cadetName: { type: String, required: true },
    cadetNo: { type: String, required: true },
    college: { type: String, required: true },
    house: { type: String, required: true },
    batch: { type: String, required: true },
    passOutYear: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true },
    nationalId: { type: String, required: true, unique: true, trim: true },
    bloodGroup: { type: String, required: true },
    fathersName: { type: String, required: true },
    mothersName: { type: String, required: true },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    profession: { type: String, required: true },
    designation: { type: String, required: true },
    organization: { type: String, required: true },
    workAddress: { type: String, required: true },
    membershipCategory: { type: String, required: true },
    translationId: { type: String, required: true, unique: true, trim: true },
    isAgreedToTerms: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

const Membership =
  models?.Membership || model("Membership", MembershipFormSchema);

export default Membership;
