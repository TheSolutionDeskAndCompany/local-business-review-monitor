import { z } from "zod";

export const env = z.object({
  DATABASE_URL: z.string().url(),
  NEXTAUTH_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(20),
  RESEND_API_KEY: z.string(),
  EMAIL_FROM: z.string().min(3),
  ENCRYPTION_KEY: z.string().length(32),
  GBP_CLIENT_ID: z.string().optional(),
  GBP_CLIENT_SECRET: z.string().optional(),
  FB_APP_ID: z.string().optional(),
  FB_APP_SECRET: z.string().optional(),
  USE_MOCK: z.string().optional(),
}).parse(process.env);
