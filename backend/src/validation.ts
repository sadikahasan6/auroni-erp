import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().optional(),
  employeeCount: z
    .enum(["1-10", "11-50", "51-200", "200+"], {
      errorMap: () => ({ message: "Please select employee count" }),
    })
    .optional(),
  businessType: z
    .enum(["retail", "tech", "manufacturing", "services", "other"], {
      errorMap: () => ({ message: "Please select business type" }),
    })
    .optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});