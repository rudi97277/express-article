import { z } from "zod";

export const CreateUserBody = z.object({
  name: z.string(),
  username: z.string().min(8),
  password: z.string().min(8),
});

export type TCreateUserBody = z.infer<typeof CreateUserBody>;

export const UserParam = z.object({
  userId: z.string().length(24),
});

export type TUserParam = z.infer<typeof UserParam>;
