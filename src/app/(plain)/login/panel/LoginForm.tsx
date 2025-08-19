"use client";

import { Box, Button, Typography, Avatar, Snackbar } from "@mui/material";
import { useForm } from "react-hook-form";
import { login } from "@/apis/auth";
import SenifitTextField from "../../../../components/SenifitTextField";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import { useTheme } from "@mui/material/styles";
import useMedia from "@/hooks/useMedia";
import CustomFailDialog from "./CustomFailDialog";

type LoginFormValues = { id: string; password: string };

export default function LoginForm() {
  // const theme = useTheme();
  const { isPhone } = useMedia();

  const methods = useForm<LoginFormValues>({ mode: "onSubmit" });
  const { handleSubmit, control } = methods;

  const router = useRouter();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [failDialogOpen, setFailDialogOpen] = useState(false);
  const [inquiryDialogOpen, setInquiryDialogOpen] = useState(false);

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data);
      setShowSnackbar(true);
      setTimeout(() => router.push("/"), 1000);
    } catch {
      setFailDialogOpen(true);
    }
  };

  const LoginContent = (
    <Box
      width={{ phone: "100%", tablet: 552, desktop: 552 }}
      px={{ phone: 2.5, tablet: 5, desktop: 5 }}
      py={{ phone: 4, tablet: 5, desktop: 5 }}
      borderRadius={1.5}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bgcolor="static.white"
    >
      {/* 로고 자리 (추후에 이미지 삽입) */}
      <Avatar
        sx={{ width: 96, height: 96, bgcolor: "grey.300", mb: 2 }}
        variant="rounded"
      >
        <Typography variant="Caption1" color="grey.700">
          senifit
        </Typography>
      </Avatar>

      <Typography
        variant={isPhone ? "Headline1" : "Heading1"}
        color="text.primary"
        mb={5}
        textAlign="center"
      >
        누구나 진행할 수 있는, <br />
        검증된 노인 운동 콘텐츠{" "}
        <span style={{ color: "primaryVariants.default" }}>시니핏</span>
      </Typography>

      {/* 입력폼 */}
      <Box mb={3} width="100%" maxWidth={472}>
        <SenifitTextField
          name="id"
          rules={{ required: "아이디를 입력해주세요." }}
          control={control}
          sx={{ width: 1, height: 55, mb: 1 }}
        />
        <SenifitTextField
          name="password"
          type="password"
          rules={{ required: "비밀번호를 입력해주세요." }}
          control={control}
          sx={{ width: 1, height: 55 }}
        />
      </Box>

      <Button
        type="submit"
        variant="contained"
        sx={{
          width: { phone: "calc(100% - 40px)", tablet: 1, desktop: 1 },
          maxWidth: 472,
          height: 56,
          bgcolor: "primaryVariants.default",
          borderRadius: 2,
          boxShadow: "none",
          mb: 1.5,
          mx: { phone: "20px", tablet: "auto", desktop: "auto" },
        }}
      >
        <Typography variant="Heading1" color="static.white">
          로그인
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
        <Typography variant="Headline2" color="primaryVariants.default">
          로그인이 되지 않나요?
        </Typography>
      </Button>
    </Box>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor={isPhone ? "transparent" : "static.black"}
      >
        {LoginContent}
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
        message="로그인 성공! 오늘도 즐거운 시니핏 하세요!"
      />
    </form>
  );
}
