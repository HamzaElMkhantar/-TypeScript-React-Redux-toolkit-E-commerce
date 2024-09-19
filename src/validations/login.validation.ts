import { z } from "zod";

const loginSchema = z.object({
  email: z.string().min(2, { message: "Email address is required" }).email(),
  password: z
    .string()
    .min(6, { message: "Password is required" }),
});

type TLoginType = z.infer<typeof loginSchema>;

export { loginSchema, type TLoginType };
