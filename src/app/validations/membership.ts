import { z } from "zod";

export const MembershipFromSchema = z.object({
  fullName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  fathersName: z.string(),
  mothersName: z.string(),
  email: z.string().email({ message: "Must be a valid email address" }),
  phoneNumber: z.string(),
  batch: z.string(),
  presentAddress: z.string(),
  permanentAddress: z.string(),
  house: z.string(),
  cadetNo: z.string(),
  workAddress: z.string(),
  designation: z.string(),
  profession: z.string(),
  organization: z.string(),
  translationId: z.string(),
  nationalId: z.string(),
  bloodGroup: z.string(),
  cadetName: z.string(),
  college: z.string(),
  membershipCategory: z.string(),
  calender: z.date(),
  isAgreedToTerms: z.boolean().default(false).optional(),
  passOutYear: z.string(),
});
//()

// check whether the username exists in the User table or not , then save the membership information
/* const user = await User.findOne({
    $or: [
        { username: username },
        { email: email },
    ],
}); */
