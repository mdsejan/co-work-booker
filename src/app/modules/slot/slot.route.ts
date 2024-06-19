import { auth } from "../../middlewares/auth";
import { isAdmin } from "../../middlewares/isAdmin";
import validateRequest from "../../middlewares/validateRequest";
import router from "../../routes";
import { slotController } from "./slot.controller";
import { SlotValidation } from "./slot.validation";

router.post(
  "/",
  validateRequest(SlotValidation.slotValidationZodSchema),
  auth,
  isAdmin,
  slotController.createSlots
);

export const SlotRoutes = router;
