import { z } from "zod";

const roomValidationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  roomNo: z.string().min(1, "Room number is required"),
  floorNo: z
    .number()
    .int()
    .min(0, "Floor number must be a non-negative integer"),
  capacity: z.number().int().min(1, "Capacity must be at least 1"),
  pricePerSlot: z
    .number()
    .min(0, "Price per slot must be a non-negative number"),
  amenities: z
    .array(z.string())
    .nonempty("Amenities must contain at least one item"),
  isDeleted: z.boolean().optional(),
});

export const RoomValidation = {
  roomValidationSchema,
};
