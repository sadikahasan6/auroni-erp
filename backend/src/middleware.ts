import { Elysia } from "elysia";

export const authMiddleware = new Elysia()
  .derive(async ({ bearer, jwt, set }) => {
    if (!bearer) {
      set.status = 401;
      throw new Error("Authorization token required");
    }

    const payload = await jwt.verify(bearer);
    if (!payload) {
      set.status = 401;
      throw new Error("Invalid or expired token");
    }

    return { user: payload };
  });