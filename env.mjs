import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    // This is optional because it's only used in development.
    // See https://next-auth.js.org/deployment.
    NEXTAUTH_URL: z.string().url().optional(),
  },
  client: {
    NEXT_PUBLIC_PROJECT_ID: z.string().min(1),
    NEXT_PUBLIC_ENV_ID: z.string().min(1),
    NEXT_PUBLIC_POST_ID: z.string().min(1),
    NEXT_PUBLIC_CONTEXT_ID: z.string().min(1),
  },
  runtimeEnv: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXT_PUBLIC_POST_ID: process.env.NEXT_PUBLIC_POST_ID,
    NEXT_PUBLIC_CONTEXT_ID: process.env.NEXT_PUBLIC_CONTEXT_ID,
    NEXT_PUBLIC_PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID,
    NEXT_PUBLIC_ENV_ID: process.env.NEXT_PUBLIC_ENV_ID,
  },
});
