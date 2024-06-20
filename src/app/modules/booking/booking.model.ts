import { RoomModel } from "./../room/room.model";
import { UserModel } from "./../user/user.model";
import { SlotModel } from "./../slot/slot.model";
import { Schema, model } from "mongoose";
import { IBooking } from "./booking.interface";

const bookingSchema = new Schema<IBooking>({
  room: { type: Schema.Types.ObjectId, ref: RoomModel, required: true },
  slots: [{ type: Schema.Types.ObjectId, ref: SlotModel, required: true }],
  user: { type: Schema.Types.ObjectId, ref: UserModel, required: true },
  date: { type: Date, required: true },
  totalAmount: { type: Number, required: true },
  isConfirmed: {
    type: String,
    enum: ["confirmed", "unconfirmed", "canceled"],
    default: "unconfirmed",
  },
  isDeleted: { type: Boolean, default: false },
});

export const BookingModel = model<IBooking>("Booking", bookingSchema);
