import {
  CALISTHENIC_TARGET_CODES,
  COGNITIVE_WORKOUT_CODES,
  SINGING_WORKOUT_CODES,
  WORKOUT_DURATIONS,
} from "./IRoutine";

// 인터페이스
export interface ICustomizedRoutineField {
  duration: WORKOUT_DURATIONS;
  cognitive_workout_code: COGNITIVE_WORKOUT_CODES;
  primary_target_code: CALISTHENIC_TARGET_CODES;
  singing_workout_code: SINGING_WORKOUT_CODES;
}
