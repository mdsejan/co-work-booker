import express from "express";
import { userController } from "./user.controller";

const router = express.Router();

router.post("/signup", userController.signupUser);

export const UserRoutes = router;
