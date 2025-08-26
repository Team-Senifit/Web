import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");

/* API 타입들 */
export type RecordItem = {
  recordId: number;
  programId: number;
  centerId: number;
  startTime: string;
  endTime: string;
  participantCount: number;
  routineKind: string;
  cognitiveKind: string;
  singingKind: string;
  durationKind: string;
  surveysExist: boolean;
};
type RecordAPI = { status: number; message: string; data: RecordItem[] };

/* /record api 호출 (axios) */
export async function getRecords(): Promise<RecordItem[]> {
  const { data } = await axios.get<RecordAPI>(`/api/record`, {
    withCredentials: true,
  });
  return data?.data ?? [];
}

/* 운동 시간 범위 설정 (예: 2025년 07월 07일 13:00~14:01) */
export function dateString(startISO?: string, endISO?: string) {
  if (!startISO || !endISO) return "";
  const s = dayjs(startISO);
  const e = dayjs(endISO);
  return `${s.format("YYYY년 MM월 DD일")} ${s.format("HH:mm")}~${e.format("HH:mm")}`;
}

/* participantCount */
export function participantString(r: Pick<RecordItem, "participantCount">) {
  return r.participantCount;
}

/* routine / cognitive / singing / duration */
export function exerciseString(
  r: Pick<
    RecordItem,
    "routineKind" | "cognitiveKind" | "singingKind" | "durationKind"
  >
) {
  return [r.routineKind, r.cognitiveKind, r.singingKind, r.durationKind].join(
    " / "
  );
}
