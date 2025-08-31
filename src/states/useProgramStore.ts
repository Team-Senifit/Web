import { IRoutineDetail } from "@/types/IRoutineDetail";
import { create } from "zustand";

interface IProgramStore {
  id: number | null;
  selectedProgram: IRoutineDetail | null;
  selectedMembers: number[] | null;
  type: "customized" | "popular" | "thematic" | null;
  setId: (id: number | null) => void;
  setSelectedProgram: (program: IRoutineDetail | null) => void;
  setSelectedMembers: (members: number[] | null) => void;
  setType: (type: "customized" | "popular" | "thematic" | null) => void;
}

const useProgramStore = create<IProgramStore>((set) => ({
  id: null,
  selectedProgram: null,
  selectedMembers: null,
  type: null,
  setId: (id) => set({ id }),
  setSelectedProgram: (program) => set({ selectedProgram: program }),
  setSelectedMembers: (members) => set({ selectedMembers: members }),
  setType: (type) => set({ type }),
}));

export default useProgramStore;
