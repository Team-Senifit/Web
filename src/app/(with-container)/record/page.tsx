import { Stack } from "@mui/material";
import RecentRecordSection from "./panel/RecentRecordSection";
import PastRecordsSection from "./panel/PastRecordsSection";

export default function Record() {
  return (
    <Stack spacing={3}>
      <RecentRecordSection />
      <PastRecordsSection />
    </Stack>
  );
}
