import express from "express";
import { auth } from "../../middlewares/auth";
import { bookingController } from "./booking.controller";

const router = express.Router();

router.get("/", auth, bookingController.getUserBookings);

export const MyBookingRoutes = router;
