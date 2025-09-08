import { createAxiosServer } from "@/apis/createAxiosServer";
import { mockRecords } from "../../utils/record.mock";
import type { RecordItem } from "../../utils/recordUtils";

type RecordAPI = { status: number; message: string; data: RecordItem[] };

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true";

export async function getRecordsServer(): Promise<RecordItem[]> {
  if (USE_MOCK) return mockRecords;

  try {
    const api = await createAxiosServer();
    const { data } = await api.get<RecordAPI>("/records");
    return data?.data ?? [];
  } catch {
    console.log("getRecords 실패");
    return mockRecords;
  }
}

export async function getRecordServer(id: number): Promise<RecordItem | null> {
  if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
    console.log("getRecords null 반환");
    return null;
  }
  const api = await createAxiosServer(); // 서버에서만 실행됨
  const { data } = await api.get<RecordAPI>("/records");
  return data?.data?.find((r) => r.recordId === id) ?? null;
}
