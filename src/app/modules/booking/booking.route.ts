import express from "express";
import { BookingValidation } from "./booking.validation";
import { auth } from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { bookingController } from "./booking.controller";
import { isAdmin } from "../../middlewares/isAdmin";

const router = express.Router();

router.post(
  "/",
  validateRequest(BookingValidation.BookingValidationSchema),
  auth,
  bookingController.createBooking
);

router.get("/", auth, isAdmin, bookingController.getAllBookings);
router.put("/:id", auth, isAdmin, bookingController.updateBooking);
router.delete("/:id", auth, isAdmin, bookingController.deleteBooking);

export const BookingRoutes = router;
