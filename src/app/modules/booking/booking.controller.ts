import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { bookingServices } from "./booking.service";
import noDataFound from "../../error/noDataFound";

// ===> Create Booking <===
const createBooking = catchAsync(async (req, res) => {
  const data = req.body;

  if (!data) {
    throw new Error("Data is invalid or null");
  }

  const result = await bookingServices.createBookingIntoDb(data);

  if (!result) {
    throw new Error("Booking Not created");
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking created successfully",
    data: result,
  });
});

// ===> Get All Bookings <===
const getAllBookings = catchAsync(async (req, res) => {
  const result = await bookingServices.getBookingsFromDB();
  if (!result || result.length === 0) {
    return noDataFound(res);
  }
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All bookings retrieved successfully",
    data: result,
  });
});

// ===> Get User's Bookings <===
const getUserBookings = catchAsync(async (req, res) => {
  const userId = req.user?.id;

  const result = await bookingServices.getUserBookingsFromDB(userId);

  if (!result || result.length === 0) {
    return noDataFound(res);
  }
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User bookings retrieved successfully",
    data: result,
  });
});

// ===> Update Booking By Id <===
const updateBooking = catchAsync(async (req, res) => {
  const { id } = req.params;

  console.log(id);
  const result = await bookingServices.updateBookingIntoDB(id, req.body);

  if (!result) {
    return noDataFound(res);
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Booking updated successfully",
    data: result,
  });
});

export const bookingController = {
  createBooking,
  getAllBookings,
  getUserBookings,
  updateBooking,
};
