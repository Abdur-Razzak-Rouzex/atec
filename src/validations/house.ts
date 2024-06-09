import { z } from "zod";

// Add / Edit College Form
export const houseFormSchema = z.object({
  houseFullName: z.string().min(6, {
    message: "House Full Name must be at least 6 characters.",
  }),
  houseShortName: z.string().min(3, {
    message: "House Short Name must be at least 3 characters.",
  }),

  collegeId: z.string().min(1, {
    message: "House id must be at least 1 characters.",
  }),
});
