"use client";
import React, { useState } from "react";
import { useTodoStore } from "@/store/useTodoStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo } from "@/utils/api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormDataForTodo, TodoSchema } from "@/types/todoTypes";
import FormFieldForTodo from "../FormFieldForTodo";

const AddTodoModal = () => {
  const { closeModal, isModalOpen } = useTodoStore();
  const queryClient = useQueryClient();

  const [errorMessage, setErrorMessage] = useState("");

  const {
    handleSubmit,
    formState: { errors },
    // setError,
    register,
    reset,
  } = useForm({ resolver: zodResolver(TodoSchema) });

  // ✅ React Query Mutation
  const { mutateAsync, isError, isSuccess, isPending } = useMutation({
    mutationFn: createTodo,
    onSuccess: (newTodo) => {
      // Update cache without full refetch
      queryClient.setQueryData(["todos", 1], (oldData: any) => {
        if (!oldData) return { todos: [newTodo], total: 1 };
        return {
          ...oldData,
          todos: [newTodo, ...oldData.todos],
        };
      });

      // Reset form & close modal
      reset();
      closeModal();
    },
    onError: (error, variables, onMutateResult, context) => {
      setErrorMessage(error.message);
    },
  });

  const submit = (data: FormDataForTodo) => {
    const { todo, userId, completed } = data;
    mutateAsync({ todo, userId, completed });
  };

  const handleCancel = () => {
    closeModal();
    setErrorMessage("");
    reset();
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md md:max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Todo</h2>

        <form onSubmit={handleSubmit(submit)} className="space-y-5">
          <label className="block text-base font-medium mb-1">Todo</label>
          <FormFieldForTodo
            register={register}
            error={errors.todo}
            placeholder="Todo"
            name="todo"
            type="text"
          />

          <div>
            <label className="block text-sm font-medium mb-1">User ID</label>
            <FormFieldForTodo
              register={register}
              error={errors.userId}
              placeholder="UserId"
              name="userId"
              type="number"
              valueAsNumber
            />
          </div>

          <div className="flex items-center gap-2">
            <FormFieldForTodo
              register={register}
              error={errors.completed}
              placeholder="completed"
              name="completed"
              type="checkbox"
            />
            <label htmlFor="completed" className="text-sm font-medium">
              Completed
            </label>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isPending ? "Adding..." : "Add Todo"}
            </button>
          </div>
        </form>
        {isError && <span className="text-red-400">{errorMessage}</span>}
      </div>
    </div>
  );
};

export default AddTodoModal;
