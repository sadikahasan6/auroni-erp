import { Elysia, t } from "elysia";
import { prisma } from "./index";
import { registerSchema, loginSchema } from "./validation";
import bcrypt from "bcryptjs";

export const authRoutes = new Elysia({ prefix: "/auth" })
  .post(
    "/register",
    async ({ body, set }) => {
      const { email, password, name } = registerSchema.parse(body);
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        set.status = 400;
        throw new Error("Email already in use");
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: { email, password: hashedPassword, name },
      });
      return {
        success: true,
        message: "User registered successfully",
        user: { id: user.id, email: user.email, name: user.name },
      };
    },
    {
      body: t.Object({
        email: t.String({ format: "email" }),
        password: t.String({ minLength: 6 }),
        name: t.Optional(t.String()),
      }),
    }
  )
  .post(
    "/login",
    async ({ body, set, jwt }) => {
      const { email, password } = loginSchema.parse(body);
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        set.status = 401;
        throw new Error("Invalid email or password");
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        set.status = 401;
        throw new Error("Invalid email or password");
      }
      const token = await jwt.sign({ id: user.id, email: user.email });
      return {
        success: true,
        message: "Login successful",
        token,
        user: { id: user.id, email: user.email, name: user.name },
      };
    },
    {
      body: t.Object({
        email: t.String({ format: "email" }),
        password: t.String({ minLength: 6 }),
      }),
    }
  );