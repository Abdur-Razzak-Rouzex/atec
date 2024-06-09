"use server";

import { connectToDatabase } from "@/database";
import College from "@/database/models/college.model";
import { handleError } from "@/lib/utils";

export type AddOrEditCollegeParams = {
  collegeFullName: string;
  collegeShortName: string;
};

export const AddOrEditCollege = async ({
  collegeFullName,
  collegeShortName,
}: AddOrEditCollegeParams): Promise<
  "invalid-input" | "exists" | "error" | "success"
> => {
  try {
    await connectToDatabase();

    const college = await College.findOne({
      $or: [
        {
          collegeFullName: collegeFullName,
          collegeShortName: collegeShortName,
        },
      ],
    });


    if (college) return "exists";

    const newCollege = await College.create({
      collegeFullName: collegeFullName,
      collegeShortName: collegeShortName,
    });
    return newCollege ? "success" : "error";
  } catch (error) {
    handleError("Error Adding College: ", error);
    return "error";
  }
};
