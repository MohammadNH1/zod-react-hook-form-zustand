import { FieldError, UseFormRegister } from "react-hook-form";
import { z } from "zod";

export const UserSchema = z
  .object({
    email: z.email({ message: "Invalid email address!" }),
    githubUrl: z
      .string()
      .includes("github.com", { message: "Invalid github url!" }),
    yearsOfExperience: z
      .number({error:"Year of experience is required!"})
      .min(1)
      .max(20),
    password: z
      .string()
      .min(8, { message: "Password is too short!" })
      .max(20, { message: "Password is too long!" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match!",
    path: ["confirmPassword"],
  });

export type FormData = z.Infer<typeof UserSchema>;

export type FormFieldProps = {
  type: string;
  placeholder: string;
  name: validFieldnames;
  register: UseFormRegister<FormData>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
};

export type validFieldnames =
  | "email"
  | "githubUrl"
  | "yearsOfExperience"
  | "password"
  | "confirmPassword";
