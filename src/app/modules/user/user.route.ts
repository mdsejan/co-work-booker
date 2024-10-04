import express from "express";
import { userController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";

const router = express.Router();

router.post(
  "/signup",
  validateRequest(UserValidation.userValidationSchema),
  userController.signupUser
);
router.post("/login", userController.loginUser);
router.get("/user/:id", userController.getUserById);

export const UserRoutes = router;
