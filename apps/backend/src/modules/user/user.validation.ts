import { z } from "zod";

export const createUserSchema = z.object({
  email: z.string().email().max(254),
  name: z.string().trim().min(1).max(100),
  role: z.enum(["admin", "user"]).default("admin"),
  order: z.number().int().default(0)
});

export const updateUserSchema = createUserSchema.partial();

export const userListQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().optional(),
  order: z.enum(["asc", "desc"]).optional(),
  email: z.string().optional(),
  role: z.enum(["admin", "user"]).optional()
});
