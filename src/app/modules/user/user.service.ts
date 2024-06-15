import { IUser } from "./user.interface";
import { UserModel } from "./user.model";

// signup service
const signupUserIntoDB = async (payload: IUser) => {
  if (!payload) {
    throw new Error("Data is undefined or null");
  }
  const email = payload.email;
  const userExist = await UserModel.findOne({ email: email });
  if (userExist) {
    throw new Error("User already exists");
  }
  const result = await UserModel.create(payload);
  return result;
};

export const userServices = {
  signupUserIntoDB,
};
