import { z } from "zod";

const BookingValidationSchema = z.object({
  body: z.object({
    room: z.string().nonempty("Room is required"),
    slots: z.array(z.string().nonempty("Slots is required")),
    user: z.string().nonempty("User is required"),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  }),
});

export const BookingValidation = {
  BookingValidationSchema,
};
