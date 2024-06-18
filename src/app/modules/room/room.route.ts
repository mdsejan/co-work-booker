import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { RoomValidation } from "./room.validation";
import { auth } from "../../middlewares/auth";
import { isAdmin } from "../../middlewares/isAdmin";
import { RoomControllers } from "./room.controller";

const router = express.Router();

router.post(
  "/",
  validateRequest(RoomValidation.roomValidationSchema),
  auth,
  isAdmin,
  RoomControllers.createRoom
);

export const RoomRoutes = router;
