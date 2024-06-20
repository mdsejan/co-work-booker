import { Types } from "mongoose";
import { RoomModel } from "../room/room.model";
import { SlotModel } from "../slot/slot.model";
import { UserModel } from "../user/user.model";
import { IBooking } from "./booking.interface";
import { BookingModel } from "./booking.model";

// ===> Create Booking Into DB <===
const createBookingIntoDb = async (data: IBooking) => {
  const { room, slots, user, date } = data;

  const roomDoc = await RoomModel.findById(room);
  if (!roomDoc) {
    throw new Error("Room not found");
  }

  const slotDocs = await SlotModel.find({ _id: { $in: slots } });
  if (slotDocs.length !== slots.length) {
    throw new Error("One or more slots not found");
  }

  const alreadyBookedSlots = slotDocs.filter((slot) => slot.isBooked);
  if (alreadyBookedSlots.length > 0) {
    throw new Error("One or more slots are already booked");
  }

  const userDoc = await UserModel.findById(user);
  if (!userDoc) {
    throw new Error("User not found");
  }

  const totalAmount = roomDoc.pricePerSlot * slots.length;

  const booking = new BookingModel({
    room: new Types.ObjectId(room),
    slots: slots.map((slot) => new Types.ObjectId(slot)),
    user: new Types.ObjectId(user),
    date: new Date(date),
    totalAmount,
    isConfirmed: "unconfirmed",
    isDeleted: false,
  });

  // Update slots to set isBooked to true
  await SlotModel.updateMany({ _id: { $in: slots } }, { isBooked: true });

  const result = (
    await (
      await (await BookingModel.create(booking)).populate("room")
    ).populate("slots")
  ).populate("user");
  return result;
};

// ===> Get All Bookings From DB <===
const getBookingsFromDB = async () => {
  const result = await BookingModel.find();
  return result;
};

export const bookingServices = {
  createBookingIntoDb,
  getBookingsFromDB,
};
