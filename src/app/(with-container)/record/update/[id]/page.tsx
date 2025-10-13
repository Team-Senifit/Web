import { Box, Divider } from "@mui/material";
import AboutRecording from "../../panel/AboutRecording";
import { getRecordServer } from "../../panel/server/getRecords";
import SurveySection from "../../panel/SurveySection";
import BackActionButton from "../../panel/BackActionButton";
import SurveyIntro from "../../panel/SurveyIntro";
import RoutineImage from "../../panel/RoutineImage";

export default async function RecordUpdatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const currentRecord = await getRecordServer(parseInt(id));

  return (
    <Box sx={{ display: "grid", gap: 3 }}>
      <BackActionButton href={"/record"} />

      <AboutRecording record={currentRecord} title={"수정 중인 수업"} />

      <RoutineImage routines={currentRecord?.routines ?? []} />

      <Box
        sx={{
          p: 6,
          borderRadius: 2,
          bgcolor: "background.paper",
          boxShadow: "0 0 8px 0 rgba(12, 13, 13, 0.05)",
          mb: 8,
        }}
      >
        <SurveyIntro title={"수업 기록 수정하기"} />

        <Divider sx={{ my: 3 }} />

        <SurveySection recordId={Number(id)} mode={"update"} />
      </Box>
    </Box>
  );
}
