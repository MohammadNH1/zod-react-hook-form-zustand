// store/useFormStore.ts
import { create } from "zustand";

interface FormData {
  name: string;
  email: string;
  age: number | null;
  password: string;
}

interface FormState {
  step: number;
  data: FormData;
  setStep: (step: number) => void;
  updateData: (values: Partial<FormData>) => void;
  reset: () => void;
}

export const useFormStore = create<FormState>((set) => ({
  step: 1,
  data: {
    name: "",
    email: "",
    age: null,
    password: "",
  },
  setStep: (step) => set({ step }),
  updateData: (values) =>
    set((state) => ({ data: { ...state.data, ...values } })),
  reset: () =>
    set({
      step: 1,
      data: { name: "", email: "", age: null, password: "" },
    }),
}));
