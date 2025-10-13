import RecentRecord from "./RecentRecord";
import { getRecordsServer } from "./server/getRecords";

export default async function RecentRecordSection() {
  const records = await getRecordsServer();
  const latest = records[0] ?? null;
  return <RecentRecord latest={latest} />;
}
