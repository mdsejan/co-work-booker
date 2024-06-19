import { minutesToTime, timeToMinutes } from "../../utils/ConvertTime";
import { RoomModel } from "../room/room.model";
import { ISlot } from "./slot.interface";
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

export const slotServices = {
  createSlotsIntoDb,
};
