import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");

/* 타입 */
export type RecordItem = {
  recordId: number;
  programId: number;
  centerId: number;
  startedAt: string;
  finishedAt: string;
  participantCount: number;
  routineKind: string;
  cognitiveKind: string;
  singingKind: string;
  durationKind: string;
  surveyExist: boolean;
};

// 날짜를 반환
export function dateString(startISO?: string, endISO?: string) {
  if (!startISO || !endISO) return "";
  const s = dayjs(startISO);
  return `${s.format("YYYY년 M월 D일")}`;
}

// 시간을 반환
export function timeString(startISO?: string, endISO?: string) {
  if (!startISO || !endISO) return "";
  const s = dayjs(startISO);
  const e = dayjs(endISO);
  return `${s.format("HH:mm")}~${e.format("HH:mm")}`;
}

// 참여인원을 숫자로 반환 (문자열로)
export function participantString(
  record: Pick<RecordItem, "participantCount">,
) {
  return String(record.participantCount ?? 0);
}

// 운동 루틴 반환
export function translateRoutineKind(value?: string): string {
  switch (value) {
    case "workout_programs_selections_byPopular":
      return "인기 운동 프로그램";
    case "workout_programs_selections_byPersonal":
      return "맞춤형 운동 프로그램";
    case "workout_programs_selections_byTarget":
      return "주제별 운동 프로그램";
    default:
      return "운동 프로그램";
  }
}

// 운동 시간 반환
export function translateDurationKind(value?: string): string {
  switch (value) {
    case "workout_duration_60minutes":
      return "60분";
    case "workout_duration_30minutes":
      return "30분";
    default:
      return "";
  }
}

// 인지운동 종류 반환
export function translateCognitiveKind(value?: string): string {
  switch (value) {
    case "workout_kinds_cognitive_kinds_taekwondo":
      return "태권도";
    case "workout_kinds_cognitive_kinds_dualtasking":
      return "듀얼태스킹";
    case "workout_kinds_cognitive_kinds_continuous":
      return "연속동작";
    case "workout_notSelected":
      return "인지운동 미포함";
    default:
      return "";
  }
}

// 노래체조 여부 반환
export function translateSingingKind(value?: string): string {
  switch (value) {
    case "workout_kinds_singing":
      return "노래체조 포함";
    case "workout_notSelected":
      return "노래체조 미포함";
    default:
      return "";
  }
}
