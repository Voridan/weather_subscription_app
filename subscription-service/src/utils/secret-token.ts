import { randomBytes } from "crypto";

export function generateSecretToken() {
  const tokenLength = 64;
  const token = randomBytes(tokenLength).toString("hex");

  return token;
}
