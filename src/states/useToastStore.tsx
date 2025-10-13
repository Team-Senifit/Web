import { AutoHide, IToast } from "@/types/IToast";
import { create } from "zustand";

export const useToastStore = create<IToast>((set) => ({
  message: "",
  open: false,
  autoHide: "normal",
  setToastOpen: (toast, autoHide = "normal" as AutoHide) =>
    set({ ...toast, open: true, autoHide }),
  setToastClose: () => set({ open: false }),
}));
