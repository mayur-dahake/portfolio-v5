import { z } from "zod";

export const createProfileSchema = z.object({
  fullName: z.string().trim().min(1).max(100),
  headline: z.string().trim().min(1).max(200),
  bio: z.string().trim().max(2000).optional(),
  location: z.string().trim().max(100).optional(),
  email: z.string().email().max(254).optional(),
  phone: z
    .string()
    .regex(/^\+?[\d\s\-().]{7,20}$/, "Invalid phone number")
    .optional(),
  website: z.string().url().optional(),
  github: z.string().url().optional(),
  linkedin: z.string().url().optional(),
  twitterUrl: z.string().url().optional().or(z.literal("")),
  resumeUrl: z.string().url().optional().or(z.literal("")),
  yearsExperience: z.number().int().min(0).max(60).optional(),
  order: z.number().int().default(1)
});

export const updateProfileSchema = createProfileSchema.partial();
