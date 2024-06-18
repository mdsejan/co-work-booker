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

router.get("/", RoomControllers.getAllRooms);
router.get("/:id", RoomControllers.getRoomById);

router.put("/:id", auth, isAdmin, RoomControllers.updateRoom);

export const RoomRoutes = router;
