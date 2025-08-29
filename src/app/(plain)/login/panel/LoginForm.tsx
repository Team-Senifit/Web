"use client";

import { Box, Button, Typography, Snackbar, Stack } from "@mui/material";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { login } from "@/apis/auth";
import SenifitTextField from "../../../../components/SenifitTextField";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import useMedia from "@/hooks/useMedia";
import CustomFailDialog from "./CustomFailDialog";
import Logo from "@/assets/logo/senifit-logo.svg";

type LoginFormValues = { id: string; password: string };

export default function LoginForm() {
  const { isPhone } = useMedia();

  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/";

  const methods = useForm<LoginFormValues>({ mode: "onSubmit" });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const router = useRouter();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [failDialogOpen, setFailDialogOpen] = useState(false);
  const [inquiryDialogOpen, setInquiryDialogOpen] = useState(false);

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data);
      setShowSnackbar(true);
      setTimeout(() => router.push(next), 1000);
    } catch {
      setFailDialogOpen(true);
    }
  };

  const errorText = errors.id
    ? "아이디를 입력하세요."
    : errors.password
      ? "비밀번호를 입력하세요."
      : undefined;

  const LoginContent = () => (
    <Box
      width={{ phone: "100%", tablet: 552, desktop: 552 }}
      px={{ phone: 2.5, tablet: 5, desktop: 5 }}
      py={{ phone: 4, tablet: 5, desktop: 5 }}
      borderRadius={1.5}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      bgcolor={"static.white"}
    >
      <Box mb={2}>
        <Image src={Logo} alt={"시니핏 로고"} />
      </Box>

      <Typography
        variant={isPhone ? "Headline1" : "Heading1"}
        color={"text.primary"}
        mb={5}
        textAlign={"center"}
      >
        {"누구나 진행할 수 있는, "}
        <br />
        {"검증된 노인 운동 콘텐츠"}{" "}
        <span style={{ color: "primaryVariants.default" }}>{"시니핏"}</span>
      </Typography>

      {/* 입력폼 */}
      <Stack direction={"column"} mb={3} width={"100%"} maxWidth={472}>
        <SenifitTextField
          placeholder={"아이디를 입력하세요."}
          name={"id"}
          rules={{ required: true }}
          control={control}
          fullWidth
          sx={{ height: 55, mb: 1 }}
        />
        <SenifitTextField
          placeholder={"비밀번호를 입력하세요."}
          name={"password"}
          type={"password"}
          rules={{ required: true }}
          control={control}
          fullWidth
          sx={{ height: 55, mt: 1.25 }}
        />
        {errorText !== undefined && (
          <Typography
            variant={"Body1"}
            sx={{
              color: (t) => t.palette.statusVariants.negative,
              width: "100%",
              mt: 1,
              textAlign: "left",
            }}
          >
            {errorText}
          </Typography>
        )}
      </Stack>

      <Button
        type={"submit"}
        variant={"contained"}
        sx={{
          width: 1,
          maxWidth: 472,
          height: 56,
          bgcolor: "primaryVariants.default",
          borderRadius: 2,
          boxShadow: "none",
          mb: 1.5,
          mt: 3,
        }}
      >
        <Typography variant={"Heading1"} color={"static.white"}>
          {"로그인"}
        </Typography>
      </Button>

      <Button
        onClick={() => setInquiryDialogOpen(true)}
        disableElevation
        sx={{
          mt: 0,
          width: 166,
          height: 32,
          p: "4px 8px",
          bgcolor: "fillVariants.colored",
          borderRadius: 2,
          mx: "auto",
        }}
      >
        <Typography variant={"Headline2"} color={"primaryVariants.default"}>
          {"로그인이 되지 않나요?"}
        </Typography>
      </Button>
    </Box>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        minHeight={"100vh"}
        bgcolor={isPhone ? "transparent" : "static.black"}
      >
        <LoginContent />
      </Box>

      {/* 로그인 실패 다이얼로그 */}
      <CustomFailDialog
        open={failDialogOpen}
        onClose={() => setFailDialogOpen(false)}
        main={true}
      />

      {/* 도움말 다이얼로그 */}
      <CustomFailDialog
        open={inquiryDialogOpen}
        onClose={() => setInquiryDialogOpen(false)}
        main={false}
      />

      {/* 성공 알림 */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={1500}
        message={"로그인 성공! 오늘도 즐거운 시니핏 하세요!"}
      />
    </form>
  );
}
