import { IRoom } from "./room.interface";
import { RoomModel } from "./room.model";

const createRoomIntoDb = async (data: IRoom) => {
  const result = await RoomModel.create(data);
  return result;
};

const getAllRoomsFromDB = async () => {
  const result = await RoomModel.find({ isDeleted: false });
  return result;
};

export const RoomServices = {
  createRoomIntoDb,
  getAllRoomsFromDB,
};
