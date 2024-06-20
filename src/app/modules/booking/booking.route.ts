import express from "express";
import { BookingValidation } from "./booking.validation";
import { auth } from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { bookingController } from "./booking.controller";

const router = express.Router();

router.post(
  "/",
  validateRequest(BookingValidation.BookingValidationSchema),
  auth,
  bookingController.createBooking
);

export const BookingRoutes = router;
