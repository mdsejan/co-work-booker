import httpStatus from "http-status";
import noDataFound from "../../error/noDataFound";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { RoomServices } from "./room.service";

const createRoom = catchAsync(async (req, res) => {
  const roomData = req.body;
  if (!roomData) {
    throw new Error("Data is invalid or null");
  }

  const result = await RoomServices.createRoomIntoDb(roomData);
  if (!result) {
    return noDataFound(res);
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Room added successfully",
    data: result,
  });
});

const getAllRooms = catchAsync(async (req, res) => {
  const result = await RoomServices.getAllRoomsFromDB();
  if (!result || result.length === 0) {
    return noDataFound(res);
  }
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Rooms retrieved successfully",
    data: result,
  });
});

export const RoomControllers = {
  createRoom,
  getAllRooms,
};
