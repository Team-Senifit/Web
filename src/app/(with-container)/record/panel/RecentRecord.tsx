"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CardContent, Typography, Button, Box, Card } from "@mui/material";
import type { RecordItem } from "../utils/recordUtils";
import RecordBrief from "./RecordBrief";
import Image from "next/image";
import recordLogo from "@/assets/logo/record-logo.png";
import GradientCard from "./GradientCard";
import SurveyIcon from "@/components/icons/SurveyIcon";
import useMedia from "@/hooks/useMedia";
import SenifitDialog from "@/components/SenifitDialog";

export default function RecentRecord({
  latest,
}: {
  latest: RecordItem | null;
}) {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);
  const { isTablet, isPhone } = useMedia();

  const handleClickCard = () => {
    if (latest?.surveyExist) {
      setOpenDialog(true);
      return;
    }
    router.push(`/record/write/${latest?.recordId}`);
  };

  // 모바일: 일반 Card/Box, 태블릿/데스크탑: GradientCard
  // 저 모바일에서 사용하는 Card 태그에 패딩값 24px, gap 16px 필요함.
  const Wrapper: React.ElementType = isPhone ? Card : GradientCard;

  return (
    <>
      <Wrapper>
        <Button
          onClick={handleClickCard}
          sx={{ position: "relative", flex: 1, cursor: "pointer", p: 0 }}
        >
          <CardContent
            sx={{
              p: isPhone ? 2 : 0,
              flex: 1,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              gap: isPhone ? 2 : "24px",
            }}
          >
            <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}>
              <Typography
                variant={isPhone ? "Title3" : isTablet ? "Title2" : "Title1"}
              >
                {"최근 수업 기록하기"}
              </Typography>
              <SurveyIcon
                sx={{
                  color: (t) => t.palette.primary.main,
                  fontSize: isPhone ? 32 : 40, // 모바일 32px, 태블릿/데스크탑 40px
                }}
              />
            </Box>

            {latest ? (
              <RecordBrief record={latest} />
            ) : (
              <Typography
                variant={"Heading1"}
                sx={{ color: (t) => t.palette.label.neutral }}
              >
                {"아직 진행한 수업이 없어요"}
              </Typography>
            )}
          </CardContent>

          {/* 데스크탑에만 */}
          <Box
            sx={{
              position: "absolute",
              right: 36,
              top: "50%",
              transform: "translateY(-50%)",
              width: { phone: 0, tablet: 0, desktop: 350 },
              height: { phone: 0, tablet: 0, desktop: 350 },
              pointerEvents: "none",
              borderRadius: 2,
              overflow: "hidden",
            }}
            aria-hidden
          >
            <Image
              src={recordLogo}
              alt={"기록 아이콘"}
              fill
              style={{ objectFit: "contain" }}
              priority
              draggable={false}
            />
          </Box>
        </Button>
      </Wrapper>

      {/* 이미 작성된 경우 팝업 */}
      <SenifitDialog
        isOpen={openDialog}
        onClose={() => setOpenDialog(false)}
        dialogType={"info"}
        title={"이미 기록을 작성했습니다."}
        body={"최근 수업이 이미 등록되어 있습니다."}
        primaryText={"작성한 기록 보기"}
        secondaryText={"취소"}
        onPrimaryClick={() => {
          setOpenDialog(false);
          router.push(latest ? `/record/detail/${latest.recordId}` : "/record");
        }}
        onSecondaryClick={() => setOpenDialog(false)}
      />
    </>
  );
}
