import { IMember } from "@/types/IMember";
import { WorkoutKind } from "@/types/IRoutine";
import { IExerciseNewPayload, IRoutineDetail } from "@/types/IRoutineDetail";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface IProgramStore {
  id: number | null;
  selectedProgram: IRoutineDetail | null;
  selectedMembers: IMember[] | null;
  type: "customized" | "popular" | ["thematic", WorkoutKind] | null;
  selectedRoutineRecord: Partial<IExerciseNewPayload> | null;
  setId: (id: number | null) => void;
  setSelectedProgram: (program: IRoutineDetail | null) => void;
  setSelectedMembers: (members: IMember[] | null) => void;
  setType: (
    type: "customized" | "popular" | ["thematic", WorkoutKind] | null,
  ) => void;
  setSelectedRoutineRecord: (
    record: Partial<IExerciseNewPayload> | null,
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
      selectedRoutineRecord: null,
      setSelectedRoutineRecord: (record) =>
        set({ selectedRoutineRecord: record }),
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
