import noDataFound from "../../error/noDataFound";
import catchAsync from "../../utils/catchAsync";
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
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Room added successfully",
    data: result,
  });
});

export const RoomControllers = {
  createRoom,
};
