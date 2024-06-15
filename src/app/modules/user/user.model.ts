import mongoose, { Schema, model } from "mongoose";
import { IUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  role: { type: String, required: true, enum: ["user", "admin"] },
  isDeleted: { type: Boolean, default: false },
});

UserSchema.pre("save", async function (next) {
  const user = this;
  try {
    const salt = config.bcrypt_salt_rounds;
    if (!salt) {
      throw new Error("salt not found");
    }
    user.password = await bcrypt.hash(user.password, Number(salt));
    next();
  } catch (err: any) {
    next(err);
  }
});

UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UserModel = model<IUser>("User", UserSchema);
