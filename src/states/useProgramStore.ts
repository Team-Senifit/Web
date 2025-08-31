import { IMember } from "@/types/IMember";
import { IRoutineDetail } from "@/types/IRoutineDetail";
import { create } from "zustand";

interface IProgramStore {
  selectedProgram: IRoutineDetail | null;
  selectedMembers: IMember[] | null;
  setSelectedProgram: (program: IRoutineDetail | null) => void;
  setSelectedMembers: (members: IMember[] | null) => void;
}

const useProgramStore = create<IProgramStore>((set) => ({
  selectedProgram: null,
  selectedMembers: null,
  setSelectedProgram: (program) => set({ selectedProgram: program }),
  setSelectedMembers: (members) => set({ selectedMembers: members }),
}));

export default useProgramStore;
