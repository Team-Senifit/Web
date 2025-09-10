import MessageCircleMoreIcon from "@/components/icons/MessageCircleMoreIcon";
import PhoneCallIcon from "@/components/icons/PhoneCallIcon";
import { kakaoChannelLink } from "@/constants/kakaoCh";
import { Button, Container, Paper, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const Inquiry = ({
  title,
  icon,
  href,
  buttonTextColor,
  buttonBgColor,
  buttonText,
  footnote,
}: {
  title: React.ReactNode;
  icon: React.ReactNode;
  href: string;
  buttonTextColor: string;
  buttonBgColor: string;
  buttonText: React.ReactNode;
  footnote: React.ReactNode;
}) => {
  return (
    <Stack direction={"column"} spacing={2} width={[1, "fit-content"]}>
      <Stack
        direction={"row"}
        justifyContent={"flex-start"}
        alignItems={"center"}
        spacing={1}
      >
        {icon}
        <Typography variant={"Title1"} sx={{ color: "label.normal" }}>
          {title}
        </Typography>
      </Stack>
      <Stack spacing={1.5}>
        <Button
          component={Link}
          href={href}
          target={"_blank"}
          rel={"noopener noreferrer"}
          variant={"contained"}
          sx={{
            py: 2,
            width: { phone: "100%", tablet: "18.5rem" },
            borderRadius: "0.75rem",
            bgcolor: buttonBgColor,
          }}
        >
          <Typography variant={"Heading1"} sx={{ color: buttonTextColor }}>
            {buttonText}
          </Typography>
        </Button>
        <Typography
          variant={"Headline1"}
          sx={{
            whiteSpace: "pre-line",
            color: "label.neutral",
          }}
        >
          {footnote}
        </Typography>
      </Stack>
    </Stack>
  );
};

const Footer = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        mt: [7, 10],
        pt: [6],
        px: [3, 9],
        pb: 14,
      }}
    >
      <Container maxWidth={"desktop"}>
        <Typography variant={"Heading1"} sx={{ color: "label.neutral", mb: 3 }}>
          {"사용 중 도움이 필요하신가요?"}
        </Typography>
        <Stack direction={{ phone: "column", desktop: "row" }} spacing={6}>
          <Stack
            direction={{ phone: "column", tablet: "row" }}
            flexWrap={{ phone: "wrap", desktop: "nowrap" }}
            rowGap={8}
            columnGap={3}
          >
            <Inquiry
              title={"유선 전화 문의"}
              icon={
                <PhoneCallIcon
                  strokeWidth={4}
                  sx={{ width: 40, height: 40, color: "primary.main" }}
                />
              }
              href={"tel:+827080657080"}
              buttonTextColor={"staticVariants.white"}
              buttonBgColor={"primary.main"}
              buttonText={"070-8065-7080"}
              footnote={`평일 00:00~00:00\n주말 및 공휴일 휴무`}
            />
            <Inquiry
              title={"카카오톡 문의"}
              icon={
                <MessageCircleMoreIcon
                  strokeWidth={3.3}
                  sx={{ width: 40, height: 40, color: "primary.main" }}
                />
              }
              href={kakaoChannelLink}
              buttonTextColor={"label.normal"}
              buttonBgColor={"#FEE500"}
              buttonText={"카카오톡 채널 바로가기"}
              footnote={`카카오톡 상단 돋보기 아이콘을 누르고\nSGEE를 검색해 보세요.`}
            />
          </Stack>
          <Stack
            spacing={2}
            direction={"column"}
            justifyContent={"flex-start"}
            alignItems={"flex-end"}
            width={"100%"}
            mt={8}
          >
            <Typography
              component={"p"}
              variant={"Caption1"}
              sx={{
                textAlign: "right",
                whiteSpace: "pre-line",
                color: "label.neutral",
              }}
            >
              {`㈜튼튼한거북이\n대표 : 최진석\n본점 : 경기도 안산시 단원구 원포공원1로 59, 신명트윈타워 A동 5층 창업 5호\n서울지점 : 서울특별시 광진구 능동로 120 건국대학교 중장비실험동 3층 303호\n사업자번호 : 327-86-03115\nTEL : 070-8065-7080\nE-MAIL : teunteun.turtle@gmail.com`}
            </Typography>
            <Button
              component={"a"}
              variant={"text"}
              sx={{
                width: "fit-content",
                color: "label.normal",
                textDecoration: "underline",
                "&:hover": {
                  backgroundColor: "fillVariants.alternative",
                  textDecoration: "underline",
                },
              }}
            >
              {"개인정보처리방침"}
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Paper>
  );
};

export default Footer;
