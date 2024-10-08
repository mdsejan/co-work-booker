import { IRoom, Room, RoomQuery } from "./room.interface";
import { RoomModel } from "./room.model";

// ===> Create Room Into Database <===
const createRoomIntoDb = async (data: IRoom) => {
  const result = await RoomModel.create(data);
  return result;
};

// ===> Get All Rooms From Database <===
// const getAllRoomsFromDB = async () => {
//   const result = await RoomModel.find({ isDeleted: false });
//   return result;
// };

// ===> Get All Rooms From DB with Filtering, Searching, and Sorting <===
const getAllRoomsFromDB = async (query: RoomQuery): Promise<Room[]> => {
  const { search, minCapacity, maxCapacity, minPrice, maxPrice, sortPrice } =
    query;

  const filter: any = { isDeleted: false };

  if (search) {
    filter.$or = [{ name: { $regex: search, $options: "i" } }];
  }

  if (minCapacity) {
    filter.capacity = { ...filter.capacity, $gte: parseInt(minCapacity) };
  }

  if (maxCapacity) {
    filter.capacity = { ...filter.capacity, $lte: parseInt(maxCapacity) };
  }

  if (minPrice) {
    filter.pricePerSlot = {
      ...filter.pricePerSlot,
      $gte: parseFloat(minPrice),
    };
  }

  if (maxPrice) {
    filter.pricePerSlot = {
      ...filter.pricePerSlot,
      $lte: parseFloat(maxPrice),
    };
  }

  let sort: any = {};
  if (sortPrice) {
    if (sortPrice === "priceAsc") {
      sort.pricePerSlot = 1;
    } else if (sortPrice === "priceDesc") {
      sort.pricePerSlot = -1;
    }
  }

  const result = await RoomModel.find(filter).sort(sort);

  return result.map((room) => ({
    _id: room._id.toString(),
    name: room.name,
    roomNo: room.roomNo,
    floorNo: room.floorNo,
    capacity: room.capacity,
    pricePerSlot: room.pricePerSlot,
    amenities: room.amenities,
    isDeleted: room.isDeleted,
    __v: room.__v,
    image: room.image,
  }));
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
