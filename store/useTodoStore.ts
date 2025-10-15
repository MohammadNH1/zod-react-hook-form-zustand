import { todoType } from '@/types/todoTypes';
import {create} from 'zustand';

type TodoStore = {
  todos: todoType[];
  page: number;
  total: number;
  setTodos: (todos: todoType[], total: number) => void;
  setPage: (page: number) => void;
  isModalOpen:boolean;
  openModal:()=>void;
  closeModal:()=>void;
};

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  page: 1,
  total: 0,
  setTodos: (todos, total) => set({ todos, total }),
  setPage: (page) => set({ page }),
  isModalOpen: false,
  openModal:()=>set({isModalOpen:true}),
  closeModal:()=>set({isModalOpen:false})
}));