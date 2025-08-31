import { IMember } from "@/types/IMember";
import { IRoutineDetail } from "@/types/IRoutineDetail";
import { create } from "zustand";

interface IProgramStore {
  selectedProgram: IRoutineDetail | null;
  selectedMembers: IMember[] | null;
  type: "customized" | "popular" | "thematic" | null;
  setSelectedProgram: (program: IRoutineDetail | null) => void;
  setSelectedMembers: (members: IMember[] | null) => void;
  setType: (type: "customized" | "popular" | "thematic" | null) => void;
}

const useProgramStore = create<IProgramStore>((set) => ({
  selectedProgram: null,
  selectedMembers: null,
  type: null,
  setSelectedProgram: (program) => set({ selectedProgram: program }),
  setSelectedMembers: (members) => set({ selectedMembers: members }),
  setType: (type) => set({ type }),
}));

export default useProgramStore;
