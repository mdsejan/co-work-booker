import { z } from "zod";

const slotValidationZodSchema = z.object({
  body: z.object({
    room: z.string().nonempty("Room is required"),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    startTime: z
      .string()
      .regex(/^\d{2}:\d{2}$/)
      .nonempty("Start time is required"),
    endTime: z
      .string()
      .regex(/^\d{2}:\d{2}$/)
      .nonempty("End time is required"),
    isBooked: z.boolean().default(false),
  }),
});

export const SlotValidation = {
  slotValidationZodSchema,
};
