const { z } = require("zod");

 const signUpSchema = z
  .object({
    userName: z
      .string()
      .min(1, { message: "Username is required" })
      .trim(),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Confirm Password must be at least 6 characters long" })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // error will show at confirmPassword field
  });

  module.exports = {
    signUpSchema
  }
