import { z } from "zod";

export const authZodSchema = z.object({
  userName: z
    .string()
    .min(1, { message: "Username is required" }) // non-empty
    .trim(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }) // security measure
});
