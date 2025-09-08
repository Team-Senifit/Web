"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CardContent,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import type { RecordItem } from "../utils/recordUtils";
import RecordBrief from "./RecordBrief";
import Image from "next/image";
import recordLogo from "@/assets/logo/record-logo.png";
import GradientCard from "./GradientCard";
import SurveyIcon from "@/components/icons/SurveyIcon";

export default function RecentRecord({
  latest,
}: {
  latest: RecordItem | null;
}) {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);

  const handleClickCard = () => {
    if (latest?.surveyExist) {
      setOpenDialog(true);
      return;
    }
    router.push(`/record/write/${latest?.recordId}`);
  };

  return (
    <>
      <GradientCard>
        <Button
          onClick={handleClickCard}
          sx={{ position: "relative", flex: 1, cursor: "pointer" }}
        >
          <CardContent
            sx={{
              p: 0,
              flex: 1,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography variant={"Title1"}>{"최근 수업 기록하기"}</Typography>
              <SurveyIcon active={1} />
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
      </GradientCard>

      {/* 이미 작성된 경우 팝업 */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        max-Width={"xs"}
        fullWidth
      >
        <DialogTitle sx={{ pb: 1.5 }}>
          {"이미 기록을 작성했습니다."}
        </DialogTitle>
        <DialogContent sx={{ pt: 0 }}>
          <Typography variant={"Body2"} color={"text.secondary"}>
            {"최근 수업이 이미 등록되어 있습니다."}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant={"outlined"} onClick={() => setOpenDialog(false)}>
            {"취소"}
          </Button>
          <Button
            variant={"contained"}
            component={Link}
            href={latest ? `/record/detail/${latest.recordId}` : "/record"}
          >
            {"작성한 기록 보기"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
