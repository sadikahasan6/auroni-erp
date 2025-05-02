import { Elysia, t } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

export const authRoutes = new Elysia()
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET || "secret",
    })
  )
  .post(
    "/auth/register",
    async ({ body, jwt, set }) => {
      const { email, password, name, employeeCount, businessType } = body;

      // Check if user exists
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        set.status = 400;
        return { error: "User already exists" };
      }

      // Hash password using Bun.password
      const hashedPassword = await Bun.password.hash(password, {
        algorithm: "bcrypt",
      });
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          employeeCount: employeeCount || null,
          businessType: businessType || null,
        },
      });

      // Generate JWT
      const token = await jwt.sign({ email, name, employeeCount, businessType });
      return { token, user: { email, name, employeeCount, businessType } };
    },
    {
      body: t.Object({
        email: t.String({ format: "email" }),
        password: t.String({ minLength: 6 }),
        name: t.Optional(t.String()),
        employeeCount: t.Optional(t.Enum({ "1-10": "1-10", "11-50": "11-50", "51-200": "51-200", "200+": "200+" })),
        businessType: t.Optional(t.Enum({ retail: "retail", tech: "tech", manufacturing: "manufacturing", services: "services", other: "other" })),
      }),
    }
  )
  .post(
    "/auth/login",
    async ({ body, jwt, set }) => {
      const { email, password } = body;

      // Find user
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user || !(await Bun.password.verify(password, user.password))) {
        set.status = 401;
        return { error: "Invalid credentials" };
      }

      // Generate JWT
      const token = await jwt.sign({
        email: user.email,
        name: user.name,
        employeeCount: user.employeeCount,
        businessType: user.businessType,
      });
      return {
        token,
        user: {
          email: user.email,
          name: user.name,
          employeeCount: user.employeeCount,
          businessType: user.businessType,
        },
      };
    },
    {
      body: t.Object({
        email: t.String({ format: "email" }),
        password: t.String({ minLength: 6 }),
      }),
    }
  );