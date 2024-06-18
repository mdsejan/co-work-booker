import httpStatus from "http-status";
import noDataFound from "../../error/noDataFound";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { RoomServices } from "./room.service";

// ===> Create Room (Only Accessible by Admin) <===
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

// ===> Get All Rooms <===
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

// ===> Get Room By Id <===
const getRoomById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await RoomServices.getRoomByIdFromDB(id);
  if (!result) {
    return noDataFound(res);
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Rooms retrieved successfully",
    data: result,
  });
});

// ===> Update Room By Id <===
const updateRoom = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await RoomServices.updateRoomIntoDB(id, req.body);

  if (!result) {
    return noDataFound(res);
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Room updated successfully",
    data: result,
  });
});

// ===> Delete a Room <===
const deleteRoom = catchAsync(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new Error("Data is invalid or null");
  }
  const result = await RoomServices.deleteRoomFromDB(id);
  if (!result) {
    return noDataFound(res);
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Room deleted successfully",
    data: result,
  });
});

export const RoomControllers = {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
};
