"use server";

import { connectToDatabase } from "@/database";
import College from "@/database/models/college.model";
import { handleError } from "@/lib/utils";
import { CollegeType } from "@/types";

export const AddOrEditCollege = async ({
  collegeFullName,
  collegeAcronym,
}: CollegeType): Promise<"invalid-input" | "exists" | "error" | "success"> => {
  try {
    await connectToDatabase();

    const college = await College.findOne({
      $or: [
        {
          collegeFullName: collegeFullName,
          collegeAcronym: collegeAcronym,
        },
      ],
    });

    if (college) return "exists";

    const newCollege = await College.create({
      collegeFullName: collegeFullName,
      collegeAcronym: collegeAcronym,
    });
    return newCollege ? "success" : "error";
  } catch (error) {
    handleError("Error Adding College: ", error);
    return "error";
  }
};

export const GetAllColleges = async (): Promise<CollegeType[]> => {
  try {
    await connectToDatabase();

    const colleges = await College.find().lean();

    return colleges.map((college: any) => ({
      id: college._id.toString(),
      collegeFullName: college.collegeFullName,
      collegeAcronym: college.collegeAcronym,
    })) as CollegeType[];
  } catch (error) {
    handleError("Error Adding College: ", error);
    return [];
  }
};
