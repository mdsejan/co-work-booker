import { z } from "zod";

const userValidationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password can not be more than 20 characters long"),
  phone: z.string().min(11, "Phone number must be at least 11 characters long"),
  address: z.string().min(1, "Address is required"),
  role: z.enum(["user", "admin"]),
  isDeleted: z.boolean().optional().default(false),
});

export const UserValidation = {
  userValidationSchema,
};
