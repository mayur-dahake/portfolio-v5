import { z } from "zod";

// Empty string → undefined so optional format validators never fire on blank fields
const optStr = (max = 500) =>
  z.preprocess(
    (v) => (v === "" || v === null || v === undefined ? undefined : v),
    z.string().trim().max(max).optional()
  );

const optEmail = z.preprocess(
  (v) => (v === "" || v === null || v === undefined ? undefined : v),
  z.string().email().max(254).optional()
);

const optPhone = z.preprocess(
  (v) => (v === "" || v === null || v === undefined ? undefined : v),
  z
    .string()
    .regex(/^\+?[\d\s\-().]{7,20}$/, "Invalid phone number")
    .optional()
);

const optUrl = z.preprocess(
  (v) => (v === "" || v === null || v === undefined ? undefined : v),
  z.string().url().optional()
);

const optInt = z.preprocess(
  (v) => (v === "" || v === null || v === undefined ? undefined : Number(v)),
  z.number().int().min(0).max(60).optional()
);

export const createProfileSchema = z.object({
  fullName: optStr(100),
  headline: optStr(200),
  bio: optStr(2000),
  location: optStr(100),
  email: optEmail,
  phone: optPhone,
  website: optUrl,
  github: optUrl,
  linkedin: optUrl,
  twitterUrl: optUrl,
  resumeUrl: optUrl,
  yearsExperience: optInt,
  order: z.number().int().default(1).optional()
});

export const updateProfileSchema = createProfileSchema.partial();
