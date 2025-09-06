import {
  COGNITIVE_WORKOUT_CODES,
  CALISTHENIC_TARGET_CODES,
  SINGING_WORKOUT_CODES,
  ROUTINE_TYPES,
  WORKOUT_DURATIONS,
} from "./IRoutine";

export interface IWorkoutVideo {
  id: number;
  kind_code: string;
  name: string;
  description: string;
  script: string;
  duration: number;
  video_path: string;
  thumbnail_path: string;
}

export interface IRoutineDetail {
  id: number;
  name: string;
  description: string;
  duration: number;
  warmup_workout_code: string;
  cooldown_workout_code: string;
  cognitive_workout_code: COGNITIVE_WORKOUT_CODES;
  singing_workout_code: SINGING_WORKOUT_CODES;
  primary_target_code: CALISTHENIC_TARGET_CODES;
  specialized_workout_code:
    | COGNITIVE_WORKOUT_CODES
    | CALISTHENIC_TARGET_CODES
    | SINGING_WORKOUT_CODES
    | "workout_notSelected";
  thumbnail_path: string;
  videos: IWorkoutVideo[];
}

export interface IExerciseNewPayload {
  programId: number;
  participants: number[];
  routineKind: ROUTINE_TYPES;
  cognitiveKind: COGNITIVE_WORKOUT_CODES;
  singingKind: SINGING_WORKOUT_CODES;
  durationKind: WORKOUT_DURATIONS;
  targetKind: CALISTHENIC_TARGET_CODES;
}
