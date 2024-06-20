import jwt from "jsonwebtoken";
import noDataFound from "../../error/noDataFound";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userServices } from "./user.service";
import httpStatus from "http-status";
import config from "../../config";

const signupUser = catchAsync(async (req, res) => {
  const data = req.body;

  if (!data) {
    throw new Error("Invalid data or null");
  }

  const result = await userServices.signupUserIntoDB(data);
  if (!result) {
    return noDataFound(res);
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const user = await userServices.loginUserIntoDB(email, password);

  if (!user) {
    return noDataFound(res);
  }

  // create token and send to the client

  const jwtPayload = {
    userId: user._id,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwtSecret as string, {
    expiresIn: "2h",
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User logged in successfully",
    token: accessToken,
    data: user,
  });
});

export const userController = {
  signupUser,
  loginUser,
};
