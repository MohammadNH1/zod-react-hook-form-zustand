"use client";
import React, { useEffect, useState } from "react";
import { getTodos } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import TodoCard from "@/components/TodoCard";
import { todoType } from "@/types/todoTypes";
import { useTodoStore } from "@/store/useTodoStore";
import PaginationController from "@/components/PaginationController";
import AddTodoModal from "@/components/modals/AddTodoModals";

const page = () => {
  const { setTodos, page,openModal } = useTodoStore();
  const { data, isLoading, isError } = useQuery({
    queryFn: () => getTodos(page),
    queryKey: ["todos", page]
  });


  useEffect(()=>{
    if (data?.todos) {
      setTodos(data.todos, data.total);
    }
  },[data,setTodos])

  if (isLoading) return <div>Loading....</div>;
  if (isError) return <div>Error fetching todos...</div>;


  return (
    <div className="max-w-6xl mx-auto p-6">
       <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">📝 Todos (Page {page})</h1>
        <button
          onClick={openModal}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          ➕ Add Todo
        </button>
      </div>

     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.todos?.map((todo: todoType) => (
          <TodoCard key={todo.id} todo={todo} />
        ))}
      </div>

      {/* Pagination controls */}
      <PaginationController/>
      <AddTodoModal/>
    </div>
  );
};

export default page;
