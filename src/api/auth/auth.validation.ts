import { z } from "zod";

export const LoginUserBody = z.object({
  username: z.string(),
  password: z.string().min(8),
});

export type TLoginUserBody = z.infer<typeof LoginUserBody>;
