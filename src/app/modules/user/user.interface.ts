import { USER_ROLE } from "./user.constant";

export interface IUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: "user" | "admin";
  isDeleted: boolean;
}

export type IUserRole = keyof typeof USER_ROLE;
