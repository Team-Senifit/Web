import { Box, Divider, Typography } from "@mui/material";
import ReturnButton from "@/components/ReturnButton";
import AboutRecording from "../../panel/AboutRecording";
import { getRecordServer } from "../../_server/getRecords";
import SurveyIcon from "@/components/icons/SurveyIcon";
import SurveySection from "../../panel/SurveySection";

export default async function RecordUpdatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 해당 recordId에 해당하는 레코드 데이터 가져오기
  const { id } = await params;
  const currentRecord = await getRecordServer(parseInt(id));

  return (
    <Box sx={{ display: "grid", gap: 3 }}>
      <ReturnButton href={"/record"} />

      <AboutRecording record={currentRecord} title={"수정 중인 수업"} />

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

        <SurveySection recordId={Number(id)} mode={"update"} />
      </Box>
    </Box>
  );
}
