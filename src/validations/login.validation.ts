import { z } from "zod";

const loginSchema = z.object({
  email: z.string().min(2, { message: "Email address is required" }).email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters longs" })
    .regex(/.*[!@#$%^&*()_+{}|[\]\\:";'<>?,./].*/, {
      message: "Password should contain at least 1 special characters",
    }),
});

type TLoginType = z.infer<typeof loginSchema>;

export { loginSchema, type TLoginType };
