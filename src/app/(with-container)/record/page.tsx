import { Stack } from "@mui/material";
import RecentRecordSection from "./panel/RecentRecordSection";
import PastRecordsSection from "./panel/PastRecordsSection";
import { redirect } from "next/navigation";
import { isAuthError } from "@/apis/errors";
import { createAxiosServer } from "@/apis/createAxiosServer";

export default async function Record() {
  try {
    const api = await createAxiosServer();
    await api.get("/records");
  } catch (e) {
    if (isAuthError(e)) {
      const next = encodeURIComponent("/record");
      redirect(`/login?next=${next}`);
    }
    throw e;
  }

  return (
    <Stack spacing={3}>
      <RecentRecordSection />
      <PastRecordsSection />
    </Stack>
  );
}
