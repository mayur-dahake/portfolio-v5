import "dotenv/config";

import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  PORT: z
    .string()
    .default("5000")
    .transform((value) => Number(value))
    .pipe(z.number().int().positive()),
  ALLOWED_ORIGINS: z
    .string()
    .default("http://localhost:5173,http://localhost:3000")
    .transform((value) => value.split(",").map((s) => s.trim())),
  GITHUB_CLIENT_ID: z.string().default(""),
  GITHUB_CLIENT_SECRET: z.string().default(""),
  GITHUB_CALLBACK_URL: z
    .string()
    .default("http://localhost:4000/api/auth/github/callback"),
  ALLOWED_GITHUB_USERNAME: z.string().default(""),
  JWT_SECRET: z.string().default("super_secret_dev_key"),
  SMTP_HOST: z.string().default("smtp.gmail.com"),
  SMTP_PORT: z.string().default("465"),
  SMTP_USER: z.string().default(""),
  SMTP_PASS: z.string().default(""),
  EMAIL_FROM: z.string().default("dahakemayur13@gmail.com"),
  CONTACT_EMAIL_TO: z.string().default("dahakemayur13@gmail.com")
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  throw new Error(`Invalid environment variables: ${parsed.error.message}`);
}

export const env = parsed.data;
