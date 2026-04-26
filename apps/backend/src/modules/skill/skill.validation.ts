import { z } from "zod";

export const createSkillSchema = z.object({
  name: z.string().trim().min(1).max(100),
  category: z.string().trim().max(100).optional(),
  proficiency: z.number().int().min(0).max(100).optional(),
  order: z.number().int().default(0)
});

export const updateSkillSchema = createSkillSchema.partial();

export const skillListQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().optional(),
  order: z.enum(["asc", "desc"]).optional(),
  name: z.string().optional(),
  category: z.string().optional()
});
