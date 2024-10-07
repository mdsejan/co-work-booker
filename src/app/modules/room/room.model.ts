import { Schema, model } from "mongoose";
import { IRoom } from "./room.interface";

const RoomSchema = new Schema<IRoom>({
  name: { type: String, required: true },
  image: { type: String, required: true },
  roomNo: { type: Number, required: true },
  floorNo: { type: Number, required: true },
  capacity: { type: Number, required: true },
  pricePerSlot: { type: Number, required: true },
  amenities: [{ type: String, required: true }],
  isDeleted: { type: Boolean, default: false },
});

export const RoomModel = model<IRoom>("Room", RoomSchema);
