import { z } from "zod";

export const createExperienceSchema = z.object({
  company: z.string().trim().min(1).max(200),
  title: z.string().trim().min(1).max(200),
  description: z.string().trim().min(1).max(2000),
  techStack: z.array(z.string().trim()).default([]),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  isCurrent: z.boolean().default(false),
  order: z.number().int().default(0)
});

export const updateExperienceSchema = createExperienceSchema.partial();

export const experienceListQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().optional(),
  order: z.enum(["asc", "desc"]).optional(),
  company: z.string().optional(),
  title: z.string().optional(),
  isCurrent: z
    .enum(["true", "false"])
    .transform((value) => value === "true")
    .optional(),
  tech: z.string().optional()
});
