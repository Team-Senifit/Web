import {
  COGNITIVE_WORKOUT_CODES,
  CALISTHENIC_TARGET_CODES,
  SINGING_WORKOUT_CODES,
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
