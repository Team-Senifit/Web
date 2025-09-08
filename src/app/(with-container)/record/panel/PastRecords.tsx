"use client";

import RecordsList from "@/app/(with-container)/record/panel/RecordsList";
import type { RecordItem } from "../utils/recordUtils";

export default function PastRecords({ all }: { all: RecordItem[] }) {
  return <RecordsList variant={"top3"} all={all} />;
}
