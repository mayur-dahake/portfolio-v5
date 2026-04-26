import { z } from "zod";

export const createProjectSchema = z.object({
  title: z.string().trim().min(1).max(200),
  description: z.string().trim().min(1).max(2000),
  techStack: z.array(z.string().trim()).default([]),
  tags: z.array(z.string().trim()).default([]),
  repoUrl: z.string().url().optional(),
  liveUrl: z.string().url().optional(),
  order: z.number().int().default(0)
});

export const updateProjectSchema = createProjectSchema.partial();

export const projectListQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().optional(),
  order: z.enum(["asc", "desc"]).optional(),
  title: z.string().optional(),
  tag: z.string().optional(),
  tech: z.string().optional()
});
