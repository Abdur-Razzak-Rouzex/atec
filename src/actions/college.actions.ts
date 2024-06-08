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
  console.log("second call");
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

    console.log("the college: ", college);

    if (college) return "exists";

    const newCollege = await College.create({
      collegeFullName: collegeFullName,
      collegeShortName: collegeShortName,
    });

    console.log("final call");
    return newCollege ? "success" : "error";
  } catch (error) {
    handleError("Error Adding College: ", error);
    return "error";
  }
};
