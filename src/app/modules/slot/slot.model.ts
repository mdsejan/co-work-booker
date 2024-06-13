import { Schema, model } from "mongoose";
import { ISlot } from "./slot.interface";

const slotSchema = new Schema<ISlot>({
  room: { type: String, required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  isBooked: { type: Boolean, default: false },
});

export const AlotModel = model<ISlot>("Slot", slotSchema);
