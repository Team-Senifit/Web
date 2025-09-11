import { createAxiosServer } from "@/apis/createAxiosServer";
import type { RecordItem } from "../../utils/recordUtils";
import { isAuthError, AuthError } from "@/apis/errors";
import type { AxiosError } from "axios";

type RecordAPI = { status: number; message: string; data: RecordItem[] };

export async function getRecordsServer(): Promise<RecordItem[]> {
  try {
    const api = await createAxiosServer();
    const { data } = await api.get<RecordAPI>("/records");
    return data?.data ?? [];
  } catch (e: unknown) {
    // 1) 인터셉터에서 AuthError로 던진 경우
    if (isAuthError(e)) throw e;

    // 2) AxiosError 타입으로 단언 후 status 꺼내기
    const axiosErr = e as AxiosError;
    const status = axiosErr.response?.status;
    if (status === 401 || status === 403) throw new AuthError("/login");

    // 3) 그 외 에러는 그대로 던짐
    console.error("getRecords 실패", e);
    throw e;
  }
}

export async function getRecordServer(id: number): Promise<RecordItem | null> {
  const api = await createAxiosServer(); // 서버에서만 실행됨
  const { data } = await api.get<RecordAPI>("/records");
  return data?.data?.find((r) => r.recordId === id) ?? null;
}
