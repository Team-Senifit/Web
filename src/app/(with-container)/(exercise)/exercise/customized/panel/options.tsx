import {
  cognitiveWorkoutCodesLabel,
  workoutDurationsLabel,
  calisthenicTargetCodesLabel,
  singingWorkoutCodesLabel,
  type COGNITIVE_WORKOUT_CODES,
  type WORKOUT_DURATIONS,
  type CALISTHENIC_TARGET_CODES,
  type SINGING_WORKOUT_CODES,
} from "@/types/ICustomizedRoutine";
import type { ISenifitToggleOption } from "@/types/IToggleButton";
import { Typography } from "@mui/material";

export const durationOptions = [
  {
    value: "workout_duration_30minutes",
    label: (
      <Typography variant={"Headline1"}>
        {workoutDurationsLabel["workout_duration_30minutes"]}
      </Typography>
    ),
  },
  {
    value: "workout_duration_60minutes",
    label: (
      <Typography variant={"Headline1"}>
        {workoutDurationsLabel["workout_duration_60minutes"]}
      </Typography>
    ),
  },
] as const satisfies ISenifitToggleOption<WORKOUT_DURATIONS>[];

export const cognitiveOptions = [
  {
    value: "workout_kinds_cognitive_kinds_taekwondo",
    label: (
      <Typography variant={"Headline1"}>
        {cognitiveWorkoutCodesLabel["workout_kinds_cognitive_kinds_taekwondo"]}
      </Typography>
    ),
  },
  {
    value: "workout_kinds_cognitive_kinds_dualtasking",
    label: (
      <Typography variant={"Headline1"}>
        {
          cognitiveWorkoutCodesLabel[
            "workout_kinds_cognitive_kinds_dualtasking"
          ]
        }
      </Typography>
    ),
  },
  {
    value: "workout_kinds_cognitive_kinds_dualtasking",
    label: (
      <Typography variant={"Headline1"}>
        {
          cognitiveWorkoutCodesLabel[
            "workout_kinds_cognitive_kinds_dualtasking"
          ]
        }
      </Typography>
    ),
  },
  {
    value: "workout_notSelected",
    label: (
      <Typography variant={"Headline1"}>
        {cognitiveWorkoutCodesLabel["workout_notSelected"]}
      </Typography>
    ),
  },
] as const satisfies ISenifitToggleOption<COGNITIVE_WORKOUT_CODES>[];

export const primaryTargetOptions = [
  {
    value: "workout_kinds_calisthenic_targets_armsAndShoulders",
    label: (
      <Typography variant={"Headline1"}>
        {
          calisthenicTargetCodesLabel[
            "workout_kinds_calisthenic_targets_armsAndShoulders"
          ]
        }
      </Typography>
    ),
  },
  {
    value: "workout_kinds_calisthenic_targets_back",
    label: (
      <Typography variant={"Headline1"}>
        {calisthenicTargetCodesLabel["workout_kinds_calisthenic_targets_back"]}
      </Typography>
    ),
  },
  {
    value: "workout_kinds_calisthenic_targets_abs",
    label: (
      <Typography variant={"Headline1"}>
        {calisthenicTargetCodesLabel["workout_kinds_calisthenic_targets_abs"]}
      </Typography>
    ),
  },
  {
    value: "workout_kinds_calisthenic_targets_legs",
    label: (
      <Typography variant={"Headline1"}>
        {calisthenicTargetCodesLabel["workout_kinds_calisthenic_targets_legs"]}
      </Typography>
    ),
  },
] as const satisfies ISenifitToggleOption<CALISTHENIC_TARGET_CODES>[];

export const singingOptions = [
  {
    value: "workout_kinds_singing",
    label: (
      <Typography variant={"Headline1"}>
        {singingWorkoutCodesLabel["workout_kinds_singing"]}
      </Typography>
    ),
  },
  {
    value: "workout_notSelected",
    label: (
      <Typography variant={"Headline1"}>
        {singingWorkoutCodesLabel["workout_notSelected"]}
      </Typography>
    ),
  },
] as const satisfies ISenifitToggleOption<SINGING_WORKOUT_CODES>[];
