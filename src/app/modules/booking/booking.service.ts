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
  const result = await BookingModel.find()
    .populate("slots")
    .populate("room")
    .populate("user");
  return result;
};

// ===> Get User Bookings From DB <===
const getUserBookingsFromDB = async (id: string) => {
  const result = await BookingModel.find({ user: id })
    .populate("room")
    .populate("slots");

  const sanitizedResult = result.map((booking: any) => {
    const { user, ...rest } = booking.toObject();
    return rest;
  });

  return sanitizedResult;
};

// ===> Update Booking Into DB <===
const updateBookingIntoDB = async (id: string, payload: Partial<IBooking>) => {
  const result = await BookingModel.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

// ===> Delete a Booking <===
const deleteBookingFromDB = async (id: string) => {
  const result = await BookingModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return result;
};

export const bookingServices = {
  createBookingIntoDb,
  getBookingsFromDB,
  getUserBookingsFromDB,
  updateBookingIntoDB,
  deleteBookingFromDB,
};
