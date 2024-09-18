import { z } from "zod";

const signUpSchemaValidation = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "First name is required" })
      .max(50, { message: "First name is too long" }),
    lastName: z
      .string()
      .min(2, { message: "Last name is required" })
      .max(50, { message: "Last name is too long" }),
    email: z.string().min(2, { message: "Email address is required" }).email(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters longs" })
      .regex(/.*[!@#$%^&*()_+{}|[\]\\:";'<>?,./].*/, {
        message: "Password should contain at least 1 special characters",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine((input) => input.password === input.confirmPassword, {
    message: "Password and Confirm Password does not match",
    path: ["confirmPassword"],
  });

type TSingUpType = z.infer<typeof signUpSchemaValidation>;

export { signUpSchemaValidation as signUpSchema, type TSingUpType };
