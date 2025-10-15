import { FieldError, UseFormRegister } from "react-hook-form";
import { z } from "zod";

export const TodoSchema = z.object({
  userId: z.number({ error: "user id is required!" }),
  todo: z
    .string()
    .min(1, { message: "todo is too short!" })
    .max(50, { message: "todo is too long!" }),
  completed: z.boolean(),
});

export type FormDataForTodo = z.infer<typeof TodoSchema>;

export type FormFieldForTodoProps = {
  type: string;
  placeholder: string;
  name: validFieldnamesForTodo;
  register: UseFormRegister<FormDataForTodo>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
};

export type validFieldnamesForTodo = "userId" | "todo" | "completed";

export type todoType = {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
};
