import { Stack } from "@mui/material";
import RecentRecordSection from "./panel/RecentRecordSection";
import PastRecordsSection from "./panel/PastRecordsSection";
import { createAxiosServer } from "@/apis/createAxiosServer";

export default async function Record() {
  const api = await createAxiosServer();
  await api.get("/records");

  return (
    <Stack spacing={3}>
      <RecentRecordSection />
      <PastRecordsSection />
    </Stack>
  );
}
