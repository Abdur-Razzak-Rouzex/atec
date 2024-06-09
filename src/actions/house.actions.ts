"use server";

import { connectToDatabase } from "@/database";
import House from "@/database/models/house.model";
import { handleError } from "@/lib/utils";

export type AddOrEditHouseParams = {
  houseFullName: string;
  houseShortName: string;
  collegeId: string;
};

export const AddOrEditHouse = async ({
  houseFullName,
  houseShortName,
  collegeId,
}: AddOrEditHouseParams): Promise<
  "invalid-input" | "exists" | "error" | "success"
> => {
  try {
    await connectToDatabase();

    const house = await House.findOne({
      $or: [
        {
          houseFullName: houseFullName,
          houseShortName: houseShortName,
          collegeId: collegeId,
        },
      ],
    });


    if (house) return "exists";

    const newHouse = await House.create({
      houseFullName: houseFullName,
      houseShortName: houseShortName,
      collegeId: collegeId,
    });
    return newHouse ? "success" : "error";
  } catch (error) {
    handleError("Error Adding House: ", error);
    return "error";
  }
};
