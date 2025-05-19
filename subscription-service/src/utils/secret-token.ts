import { randomBytes } from "crypto";

export const TOKEN_LENGTH = 128;

export function generateSecretToken() {
  const tokenBytesLength = 64;
  const token = randomBytes(tokenBytesLength).toString("hex");

  return token;
}
