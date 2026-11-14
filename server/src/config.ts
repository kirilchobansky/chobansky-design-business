import { randomBytes } from "crypto";

let secret = process.env.JWT_SECRET;

if (!secret) {
  if (process.env.NODE_ENV === "production") {
    throw new Error("JWT_SECRET environment variable is required in production");
  }

  // Development fallback: a random per-process secret. Tokens stop working on restart.
  secret = randomBytes(32).toString("hex");
  console.warn(
    "JWT_SECRET is not set - using a temporary random secret. Logins are invalidated on every restart."
  );
}

export const JWT_SECRET: string = secret;
