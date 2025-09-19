"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CardContent, Typography, ButtonBase, Box } from "@mui/material";
import type { RecordItem } from "../utils/recordUtils";
import RecordBrief from "./RecordBrief";
import Image from "next/image";
import recordLogo from "@/assets/logo/record-logo.png";
import GradientCard from "./GradientCard";
import SurveyIcon from "@/components/icons/SurveyIcon";
import useMedia from "@/hooks/useMedia";
import SenifitDialog from "@/components/SenifitDialog";
import GradationPageInfoCard from "../../../../components/GradationPageInfoCard";

export default function RecentRecord({
  latest,
}: {
  latest: RecordItem | null;
}) {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState<
    null | "alreadyWritten" | "noSurvey"
  >(null);
  const { isTablet, isPhone } = useMedia();

  const handleClickCard = () => {
    const hasParticipants = (latest?.participantCount ?? 0) > 0;

    if (!hasParticipants) {
      setOpenDialog("alreadyWritten");
      return;
    }

    if (latest?.surveyExist) {
      setOpenDialog("alreadyWritten");
    } else {
      setOpenDialog("noSurvey");
    }
  };

  // 공통 콘텐츠 (ButtonBase + CardContent)
  const content = (
    <ButtonBase
      onClick={handleClickCard}
      sx={{
        position: "relative",
        flex: 1,
        width: "100%",
        cursor: "pointer",
        p: 0,
        justifyContent: "flex-start",
        alignItems: "stretch",
        textAlign: "left",
        color: "inherit",
      }}
    >
      <CardContent
        sx={{
          p: isPhone ? 3 : 0,
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
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
            variant={isPhone ? "Headline1" : "Heading1"}
            sx={{ color: (t) => t.palette.label.neutral }}
          >
            {"아직 진행한 수업이 없어요"}
          </Typography>
        )}
      </CardContent>

      {/* 데스크탑 전용 로고 */}
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
    </ButtonBase>
  );

  return (
    <>
      {isPhone ? (
        <>
          <GradationPageInfoCard
            title={"기록"}
            description={"수업 별로 기록하고\n열람할 수 있어요"}
          />

          {/* 모바일: 흰 박스 (gradient 없는 대신에 padding 24px) */}
          <Box sx={{ bgcolor: (t) => t.palette.static.white }}>{content}</Box>
        </>
      ) : (
        // 태블릿/데스크탑: GradientCard 사용
        <GradientCard>{content}</GradientCard>
      )}

      <SenifitDialog
        isOpen={openDialog === "alreadyWritten"}
        onClose={() => setOpenDialog(null)}
        dialogType={"success"}
        title={"이미 기록을 작성했습니다."}
        primaryText={"작성한 기록 보기"}
        secondaryText={"돌아가기"}
        onPrimaryClick={() => {
          setOpenDialog(null);
          router.push(latest ? `/record/detail/${latest.recordId}` : "/record");
        }}
        onSecondaryClick={() => setOpenDialog(null)}
      />

      <SenifitDialog
        isOpen={openDialog === "noSurvey"}
        onClose={() => setOpenDialog(null)}
        dialogType={"question"}
        title={"작성된 기록이 없습니다.\n작성하시겠습니까?"}
        primaryText={"작성하기"}
        secondaryText={"돌아가기"}
        onPrimaryClick={() => {
          setOpenDialog(null);
          router.push(latest ? `/record/write/${latest.recordId}` : "/record");
        }}
        onSecondaryClick={() => setOpenDialog(null)}
      />
    </>
  );
}
