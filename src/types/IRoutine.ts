export type WORKOUT_DURATIONS =
  | "workout_duration_30minutes"
  | "workout_duration_60minutes";

export const workoutDurationsLabel: Record<WORKOUT_DURATIONS, string> = {
  workout_duration_30minutes: "30분",
  workout_duration_60minutes: "60분",
};

export type COGNITIVE_WORKOUT_CODES =
  | "workout_kinds_cognitive_kinds_taekwondo"
  | "workout_kinds_cognitive_kinds_dualtasking"
  | "workout_kinds_cognitive_kinds_continuous"
  | "workout_notSelected";

export const cognitiveWorkoutCodesLabel: Record<
  COGNITIVE_WORKOUT_CODES,
  string
> = {
  workout_kinds_cognitive_kinds_taekwondo: "태권도",
  workout_kinds_cognitive_kinds_dualtasking: "듀얼태스킹",
  workout_kinds_cognitive_kinds_continuous: "연속동작",
  workout_notSelected: "미포함",
};

export type CALISTHENIC_TARGET_CODES =
  | "workout_kinds_calisthenic_targets_arms"
  | "workout_kinds_calisthenic_targets_shoulders"
  | "workout_kinds_calisthenic_targets_abs"
  | "workout_kinds_calisthenic_targets_legs"
  | "workout_kinds_calisthenic_targets_back"
  | "workout_kinds_calisthenic_targets_armsAndShoulders"
  | "workout_notSelected";

export const calisthenicTargetCodesLabel: Record<
  CALISTHENIC_TARGET_CODES,
  string
> = {
  workout_kinds_calisthenic_targets_arms: "팔",
  workout_kinds_calisthenic_targets_shoulders: "어깨",
  workout_kinds_calisthenic_targets_abs: "복부",
  workout_kinds_calisthenic_targets_legs: "다리",
  workout_kinds_calisthenic_targets_back: "등",
  workout_kinds_calisthenic_targets_armsAndShoulders: "팔/어깨",
  workout_notSelected: "미포함",
};

export type SINGING_WORKOUT_CODES =
  | "workout_kinds_singing"
  | "workout_notSelected";

export const singingWorkoutCodesLabel: Record<SINGING_WORKOUT_CODES, string> = {
  workout_kinds_singing: "포함",
  workout_notSelected: "미포함",
};

export type WorkoutKind =
  | COGNITIVE_WORKOUT_CODES
  | CALISTHENIC_TARGET_CODES
  | SINGING_WORKOUT_CODES;

export const thematicWorkoutCodesLabel: Record<WorkoutKind, string> = {
  workout_kinds_cognitive_kinds_taekwondo: "태권도 인지운동",
  workout_kinds_cognitive_kinds_dualtasking: "듀얼태스킹 인지운동",
  workout_kinds_cognitive_kinds_continuous: "연속동작 인지운동",
  workout_kinds_calisthenic_targets_arms: "팔 집중 운동",
  workout_kinds_calisthenic_targets_shoulders: "어깨 집중 운동",
  workout_kinds_calisthenic_targets_abs: "복부 집중 운동",
  workout_kinds_calisthenic_targets_legs: "다리 집중 운동",
  workout_kinds_calisthenic_targets_back: "등 집중 운동",
  workout_kinds_calisthenic_targets_armsAndShoulders: "팔/어깨 집중 운동",
  workout_kinds_singing: "노래 체조",
  workout_notSelected: "미포함",
};
