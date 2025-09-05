import { IMember } from "@/types/IMember";
import { WorkoutKind } from "@/types/IRoutine";
import { IRoutineDetail } from "@/types/IRoutineDetail";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface IProgramStore {
  id: number | null;
  selectedProgram: IRoutineDetail | null;
  selectedMembers: IMember[] | null;
  type: "customized" | "popular" | ["thematic", WorkoutKind] | null;
  setId: (id: number | null) => void;
  setSelectedProgram: (program: IRoutineDetail | null) => void;
  setSelectedMembers: (members: IMember[] | null) => void;
  setType: (
    type: "customized" | "popular" | ["thematic", WorkoutKind] | null,
  ) => void;
  clearStore: () => void;
}

const useProgramStore = create<IProgramStore>()(
  persist(
    (set) => ({
      id: null,
      selectedProgram: null,
      selectedMembers: null,
      type: null,
      setId: (id) => set({ id }),
      setSelectedProgram: (program) => set({ selectedProgram: program }),
      setSelectedMembers: (members) => set({ selectedMembers: members }),
      setType: (type) => set({ type }),
      clearStore: () =>
        set({
          id: null,
          selectedProgram: null,
          selectedMembers: null,
          type: null,
        }),
    }),
    {
      name: "program-store",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useProgramStore;
