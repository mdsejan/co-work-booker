import catchAsync from "../../utils/catchAsync";
import { slotServices } from "./slot.service";

const createSlots = catchAsync(async (req, res) => {
  const data = req.body;

  if (!data) {
    throw new Error("Data is invalid or null");
  }

  const result = await slotServices.createSlotsIntoDb(data);
});

export const slotController = {
  createSlots,
};
