import {
  COGNITIVE_WORKOUT_CODES,
  CALISTHENIC_TARGET_CODES,
  SINGING_WORKOUT_CODES,
} from "./IRoutine";

export interface IThematicRoutineField {
  workout_kind:
    | COGNITIVE_WORKOUT_CODES
    | CALISTHENIC_TARGET_CODES
    | SINGING_WORKOUT_CODES;
}
