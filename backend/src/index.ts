import { Elysia } from "elysia";
import { PrismaClient } from "../generated/prisma";
import { jwt } from "@elysiajs/jwt";
import { bearer } from "@elysiajs/bearer";
import { cors } from "@elysiajs/cors";
import { authRoutes } from "./auth";
import { authMiddleware } from "./middleware";

export const prisma = new PrismaClient();

const app = new Elysia()
  .use(cors({ origin: "http://localhost:5173" })) // Add CORS middleware first
  .use(jwt({ name: "jwt", secret: process.env.JWT_SECRET!, exp: "7d" }))
  .use(bearer())
  .use(authRoutes) // Mount auth routes
  .group("/protected", (app) =>
    app.use(authMiddleware).get("/profile", ({ user }) => {
      return {
        success: true,
        message: "Protected route accessed",
        user,
      };
    })
  )
  .onError(({ code, error }) => {
    return { success: false, error: error.message };
  });

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});