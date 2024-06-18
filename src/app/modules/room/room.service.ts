import { IRoom } from "./room.interface";
import { RoomModel } from "./room.model";

const createRoomIntoDb = async (data: IRoom) => {
  const result = await RoomModel.create(data);
  return result;
};

export const RoomServices = {
  createRoomIntoDb,
};
