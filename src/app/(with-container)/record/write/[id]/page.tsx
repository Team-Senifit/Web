import { Box, Divider, Typography } from "@mui/material";
import ReturnButton from "@/app/(with-footer)/my-center/members/panel/ReturnButton";
import NowRecording from "./panel/NowRecording";
import { getRecordServer } from "../../_server/getRecords";
import SurveyIcon from "@/components/icons/SurveyIcon";
import SurveySection from "./panel/SurveySection";

export default async function RecordWritePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // 해당 recordId에 해당하는 레코드 데이터 가져오기
  const currentRecord = await getRecordServer(parseInt(id));

  return (
    <Box sx={{ display: "grid", gap: 3 }}>
      <ReturnButton href={"/record"} />

      <NowRecording record={currentRecord} />

      <Box
        sx={{
          p: 6,
          borderRadius: 2,
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
          mb: 8,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <SurveyIcon active={3} />
          <Typography variant={"Heading1"}>{"수업 기록 작성하기"}</Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <SurveySection recordId={Number(id)} />
      </Box>
    </Box>
  );
}
