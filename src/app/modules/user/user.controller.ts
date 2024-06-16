import noDataFound from "../../error/noDataFound";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userServices } from "./user.service";
import httpStatus from "http-status";

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

export const userController = {
  signupUser,
};
