"use client";
import React from "react";
import { todoType } from "@/types/todoTypes";
export interface todoCardProps {
  todo: todoType
}

const TodoCard = ({todo}:todoCardProps) => {
  return (
    <div
      className={`rounded-2xl p-5 shadow-md border transition-all duration-300 hover:shadow-xl 
      ${
        todo?.completed
          ? "bg-green-50 border-green-200"
          : "bg-red-50 border-red-200"
      }`}
    >
      <h2 className="text-lg font-semibold mb-2 text-gray-800">{todo?.todo}</h2>

      <div className="flex items-center justify-between mt-4">
        <span
          className={`px-3 py-1 text-sm font-medium rounded-full 
          ${
            todo?.completed
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {todo?.completed ? "✅ Completed" : "⏳ Pending"}
        </span>

        <span className="text-sm text-gray-500">👤 User ID: {todo?.userId}</span>
      </div>
    </div>
  );
};

export default TodoCard;
