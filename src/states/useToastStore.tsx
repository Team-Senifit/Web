import { create } from "zustand";

interface IToast {
  message: string;
  open: boolean;
  setToastOpen: ({ message }: { message: string }) => void;
  setToastClose: () => void;
}

export const useToastStore = create<IToast>((set) => ({
  message: "",
  open: false,
  setToastOpen: (toast) => set({ ...toast, open: true }),
  setToastClose: () => set({ open: false }),
}));
