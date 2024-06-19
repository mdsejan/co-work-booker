import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { slotServices } from "./slot.service";

const createSlots = catchAsync(async (req, res) => {
  const data = req.body;

  if (!data) {
    throw new Error("Data is invalid or null");
  }

  const result = await slotServices.createSlotsIntoDb(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Slots created successfully",
    data: result,
  });
});

export const slotController = {
  createSlots,
};
