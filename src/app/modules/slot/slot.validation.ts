import { z } from "zod";

const slotValidationZodSchema = z.object({
  room: z.string().nonempty("Room is required"),
  date: z.date(),
  startTime: z.string().nonempty("Start time is required"),
  endTime: z.string().nonempty("End time is required"),
  isBooked: z.boolean().default(false),
});

export const RoomValidation = {
  slotValidationZodSchema,
};
