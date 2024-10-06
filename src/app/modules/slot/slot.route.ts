import express from "express";
import { auth } from "../../middlewares/auth";
import { isAdmin } from "../../middlewares/isAdmin";
import validateRequest from "../../middlewares/validateRequest";
import { slotController } from "./slot.controller";
import { SlotValidation } from "./slot.validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(SlotValidation.slotValidationZodSchema),
  auth,
  isAdmin,
  slotController.createSlots
);

router.get("/availability", slotController.getAvailableSlots);
router.put("/:id", auth, isAdmin, slotController.updateSlot);
router.delete("/:id", auth, isAdmin, slotController.deleteSlot);
export const SlotRoutes = router;
