import PastRecords from "./PastRecords";
import { getRecordsServer } from "../_server/getRecords";

export default async function PastRecordsSection() {
  const all = await getRecordsServer();
  return <PastRecords all={all} />;
}
