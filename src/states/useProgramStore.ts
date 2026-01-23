import { IMember } from "@/types/IMember";
import { WorkoutKind } from "@/types/IRoutine";
import { ICustomizedRoutineField } from "@/types/ICustomizedRoutine";
import { IExerciseNewPayload, IRoutineDetail } from "@/types/IRoutineDetail";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface IProgramStore {
  hasHydrated: boolean;
  selectedProgram: IRoutineDetail | null;
  selectedMembers: IMember[];
  type: "customized" | "popular" | ["thematic", WorkoutKind] | null;
  selectedRoutineRecord: Partial<IExerciseNewPayload> | null;
  /**
   * 주제별(/exercise/thematic) 페이지의 마지막 선택값.
   * - 기존 selectedRoutineRecord로도 일부 역추론 가능하지만, UI 복원 목적이라 별도 저장.
   */
  thematicWorkoutKind: WorkoutKind | null;
  /**
   * 맞춤형(/exercise/customized) 페이지의 마지막 선택값(폼 복원용).
   */
  customizedForm: Partial<ICustomizedRoutineField> | null;
  setSelectedProgram: (program: IRoutineDetail | null) => void;
  setSelectedMembers: (members: IMember[]) => void;
  setType: (
    type: "customized" | "popular" | ["thematic", WorkoutKind] | null,
  ) => void;
  setSelectedRoutineRecord: (
    record: Partial<IExerciseNewPayload> | null,
  ) => void;
  setThematicWorkoutKind: (kind: WorkoutKind | null) => void;
  setCustomizedForm: (form: Partial<ICustomizedRoutineField> | null) => void;
  setHasHydrated: (v: boolean) => void;
  clearStore: () => void;
}

const useProgramStore = create<IProgramStore>()(
  persist(
    (set) => ({
      hasHydrated: false,
      selectedProgram: null,
      selectedMembers: [],
      type: null,
      selectedRoutineRecord: null,
      thematicWorkoutKind: null,
      customizedForm: null,
      setHasHydrated: (v) => set({ hasHydrated: v }),
      setSelectedRoutineRecord: (record) =>
        set({ selectedRoutineRecord: record }),
      setSelectedProgram: (program) => set({ selectedProgram: program }),
      setSelectedMembers: (members) => set({ selectedMembers: members }),
      setType: (type) => set({ type }),
      setThematicWorkoutKind: (kind) => set({ thematicWorkoutKind: kind }),
      setCustomizedForm: (form) => set({ customizedForm: form }),
      clearStore: () =>
        set({
          hasHydrated: true, // clear 시에도 UI 입력 차단은 하지 않음
          selectedProgram: null,
          selectedMembers: [],
          type: null,
          selectedRoutineRecord: null,
          thematicWorkoutKind: null,
          customizedForm: null,
        }),
    }),
    {
      name: "program-store",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);

export default useProgramStore;
