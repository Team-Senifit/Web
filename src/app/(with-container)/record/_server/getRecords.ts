import { createAxiosServer } from "@/apis/createAxiosServer";
import { mockRecords } from "../utils/record.mock";

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

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true";

export async function getRecordsServer(): Promise<RecordItem[]> {
  if (USE_MOCK) return mockRecords;

  try {
    const api = await createAxiosServer();
    const { data } = await api.get<RecordAPI>("/record");
    return data?.data ?? [];
  } catch {
    return mockRecords;
  }
}

export async function getRecordServer(id: number): Promise<RecordItem | null> {
  if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
    return null;
  }
  const api = await createAxiosServer(); // 서버에서만 실행됨
  const { data } = await api.get<RecordAPI>("/record");
  return data?.data?.find((r) => r.recordId === id) ?? null;
}
