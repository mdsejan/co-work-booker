import noDataFound from "../../error/noDataFound";
import catchAsync from "../../utils/catchAsync";
import { userServices } from "./user.service";

const signupUser = catchAsync(async (req, res) => {
  const data = req.body;

  if (!data) {
    throw new Error("Invalid data or null");
  }

  const result = await userServices.signupUserIntoDB(data);
  if (!result) {
    return noDataFound(res);
  }
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "User registered successfully",
    data: result,
  });
});

export const userController = {
  signupUser,
};
