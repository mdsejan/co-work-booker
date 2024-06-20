import { Schema, model } from "mongoose";
import { ISlot } from "./slot.interface";
import { RoomModel } from "../room/room.model";

const slotSchema = new Schema<ISlot>({
  room: { type: Schema.Types.ObjectId, ref: RoomModel, required: true },
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  isBooked: { type: Boolean, default: false },
});

export const SlotModel = model<ISlot>("Slot", slotSchema);
