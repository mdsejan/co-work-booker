import { IRoom } from "./room.interface";
import { RoomModel } from "./room.model";

// ===> Create Room Into Database <===
const createRoomIntoDb = async (data: IRoom) => {
  const result = await RoomModel.create(data);
  return result;
};

// ===> Get All Rooms From Database <===
const getAllRoomsFromDB = async () => {
  const result = await RoomModel.find({ isDeleted: false });
  return result;
};

// ===> Get Room By ID <===
const getRoomByIdFromDB = async (id: string) => {
  const result = await RoomModel.findById(id);
  return result;
};

// ===> Update Room <===
const updateRoomIntoDB = async (id: string, payload: Partial<IRoom>) => {
  const result = await RoomModel.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

// ===> Delete a Room <===
const deleteRoomFromDB = async (id: string) => {
  const result = await RoomModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return result;
};

export const RoomServices = {
  createRoomIntoDb,
  getAllRoomsFromDB,
  getRoomByIdFromDB,
  updateRoomIntoDB,
  deleteRoomFromDB,
};
