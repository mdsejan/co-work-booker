import { minutesToTime, timeToMinutes } from "../../utils/ConvertTime";
import { RoomModel } from "../room/room.model";
import { ISlot, QueryParams } from "./slot.interface";
import { SlotModel } from "./slot.model";

const createSlotsIntoDb = async (data: ISlot) => {
  const { room, date, startTime, endTime } = data;

  const roomExists = await RoomModel.findById(room);

  if (!roomExists) {
    throw new Error(`Room with ID ${room} does not exist.`);
  }

  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);
  const slotDuration = 60; // in minutes

  const slots = [];
  for (let time = startMinutes; time < endMinutes; time += slotDuration) {
    const slot = new SlotModel({
      room,
      date,
      startTime: minutesToTime(time),
      endTime: minutesToTime(time + slotDuration),
      isBooked: false,
    });
    slots.push(slot);
  }

  const result = await SlotModel.insertMany(slots);
  return result;
};

const getAllAvailableSlotsFromDB = async (queryParams: QueryParams) => {
  const { date, roomId, isbooked } = queryParams;

  let query: Record<string, any> = {};

  query.isBooked = isbooked !== undefined ? isbooked : false;

  if (date) {
    query.date = date;
  }
  if (roomId) {
    query.room = roomId;
  }

  // Fetch available slots
  const slots = await SlotModel.find(query).populate("room");
  return slots;
};

const getAvailableDatesFromDB = async (id: string) => {
  const result = await SlotModel.distinct("date", {
    room: id,
    isBooked: false,
  });
  return result;
};

// ===> Update Slot Into DB <===
const updateSlotIntoDB = async (id: string, payload: Partial<ISlot>) => {
  const result = await SlotModel.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

// ===> Delete a Slot <===
const deleteSlotFromDB = async (id: string) => {
  const result = await SlotModel.findByIdAndDelete(id);
  return result;
};

export const slotServices = {
  createSlotsIntoDb,
  getAllAvailableSlotsFromDB,
  getAvailableDatesFromDB,
  updateSlotIntoDB,
  deleteSlotFromDB,
};
