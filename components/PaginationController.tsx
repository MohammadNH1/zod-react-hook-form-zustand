'use client'
import React from "react";
import { useTodoStore } from "@/store/useTodoStore";
const PaginationController = () => {
const {setPage,todos,page} = useTodoStore()
  return (
    <div className="flex justify-between mt-6">
      <button
        disabled={page === 1}
        onClick={() => setPage(page-1)}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        Prev
      </button>
      <button
        disabled={!todos?.length || todos?.length < 10}
        onClick={() => setPage(page+1)}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default PaginationController;
