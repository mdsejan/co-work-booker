import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { slotServices } from "./slot.service";
import noDataFound from "../../error/noDataFound";

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

const getAvailableSlots = catchAsync(async (req, res) => {
  const queryParams = req.query;

  const slots = await slotServices.getAllAvailableSlotsFromDB(queryParams);

  if (!slots || slots.length === 0) {
    return noDataFound(res);
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Available slots retrieved successfully",
    data: slots,
  });
});

// ===> Update Slot By Id <===
const updateSlot = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await slotServices.updateSlotIntoDB(id, req.body);

  if (!result) {
    return noDataFound(res);
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Slot updated successfully",
    data: result,
  });
});

// ===> Delete a Slot <===
const deleteSlot = catchAsync(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new Error("Data is invalid or null");
  }
  const result = await slotServices.deleteSlotFromDB(id);
  if (!result) {
    return noDataFound(res);
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Slot deleted successfully",
    data: [],
  });
});

export const slotController = {
  createSlots,
  getAvailableSlots,
  updateSlot,
  deleteSlot,
};
