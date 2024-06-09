import { z } from "zod";

// Add / Edit College Form
export const collegeFormSchema = z.object({
  collegeFullName: z.string().min(16, {
    message: "College Full Name must be at least 16 characters.",
  }),
  collegeAcronym: z.string().min(3, {
    message: "College Acronym must be at least 3 characters.",
  }),
});
