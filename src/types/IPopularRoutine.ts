export interface IPopularRoutine {
  id: number;
  name: string;
  description: string;
  duration: number; // e.g., minutes
  warmup_workout_code: string;
  cooldown_workout_code: string;
  cognitive_workout_code: string;
  singing_workout_code: string;
  primary_target_code: string;
  specialized_workout_code: string;
  thumbnail_path: string;
}
