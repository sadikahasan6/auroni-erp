import { Context, Elysia } from "elysia";
import { PrismaClient } from "../generated/prisma";
import { jwt } from "@elysiajs/jwt";
import { bearer } from "@elysiajs/bearer";
import { cors } from "@elysiajs/cors";
import { authRoutes } from "./auth";
import { authMiddleware } from "./middleware";


export const prisma = new PrismaClient();

interface User {
  id: number; // Int maps to number in TypeScript
  email: string; // String maps to string
  password: string; // String maps to string
  name?: string; // String? indicates optional field
  createdAt: Date; // DateTime maps to Date
  employeeCount: string; // String for ranges like "1-10", "11-50", etc.
  businessType: string; // String for categories like "retail", "tech", etc.
  updatedAt: Date; // DateTime maps to Date
}

interface CustomContext extends Context {
  user?: User; // Make user optional since it may not exist for unauthenticated routes
}

const app = new Elysia()
  .use(cors({ origin: "http://localhost:5173" })) // Add CORS middleware first
  .use(jwt({ name: "jwt", secret: process.env.JWT_SECRET!, exp: "7d" }))
  .use(bearer())
  .use(authRoutes) // Mount auth routes
  .group("/protected", (app) =>
    app.use(authMiddleware).get("/profile", ({ user }: CustomContext) => {
      return {
        success: true,
        message: "Protected route accessed",
        user,
      };
    })
  )
  .onError(({ code, error }) => {
    const errorMessage = 'message' in error ? error.message : 'An unknown error occurred';
    return { success: false, error: errorMessage };
  });

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});