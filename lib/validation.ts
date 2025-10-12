// lib/validation.ts
import { z } from "zod";

export const step1Schema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email"),
});

export const step2Schema = z.object({
  age: z.number().min(18, "Must be 18+"),
});

export const step3Schema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
});
