"use client";

import RecordsList from "@/app/(with-container)/record/panel/RecordsList";
import type { RecordItem } from "@/app/(with-container)/record/utils/recordUtils";

export default function PastRecordsAll({ all }: { all: RecordItem[] }) {
  return <RecordsList variant={"all"} all={all} />;
}
