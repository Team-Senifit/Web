"use client";

import {
  Box,
  Button,
  Typography,
  Stack,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { login } from "@/apis/auth";
import SenifitTextField from "../../../../components/SenifitTextField";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useMedia from "@/hooks/useMedia";
import Logo from "@/assets/logo/senifit-logo.svg";
import SenifitDialog from "@/components/SenifitDialog";
import Link from "next/link";
import { kakaoChannelLink } from "@/constants/kakaoCh";
import { useToastStore } from "@/states/useToastStore";
import EyeIcon from "@/components/icons/EyeIcon";
import EyeOffIcon from "@/components/icons/EyeOffIcon";
import BackgroundImage from "@/assets/images/login-background.png";

type LoginFormValues = { id: string; password: string };

export default function LoginForm() {
  const { isPhone } = useMedia();

  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/";

  const { setToastOpen } = useToastStore();

  useEffect(() => {
    if (next !== "/") {
      setToastOpen({ message: "로그인이 필요한 서비스입니다." });
    }
  }, [next, setToastOpen]);

  const methods = useForm<LoginFormValues>({ mode: "onSubmit" });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const router = useRouter();
  const [failDialogOpen, setFailDialogOpen] = useState(false);
  const [inquiryDialogOpen, setInquiryDialogOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data);
      setToastOpen({
        message: "로그인 성공! 오늘도 즐거운 시니핏 하세요!",
      });
      setTimeout(() => router.push(next), 500);
    } catch {
      setFailDialogOpen(true);
    }
  };

  const errorText = errors.id
    ? "아이디를 입력하세요."
    : errors.password
      ? "비밀번호를 입력하세요."
      : undefined;

  const eyeIconStyle = {
    width: "1.5rem",
    height: "1.5rem",
    color: "label.normal",
  };

  const LoginContent = () => (
    <Stack
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        bgcolor: "background.paper",
        borderRadius: [0, "0.75rem"],
        px: [2.5, 5],
        py: [4, 5],
        width: ["100%", 552],
        height: ["100vh", "fit-content"],
      }}
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
        {"검증된 노인 운동 콘텐츠"}
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
          autoComplete={"username"}
        />
        <SenifitTextField
          placeholder={"비밀번호를 입력하세요."}
          name={"password"}
          type={showPassword ? "text" : "password"}
          rules={{ required: true }}
          control={control}
          fullWidth
          sx={{ height: 55, mt: 1.25 }}
          autoComplete={"password"}
          endAdornment={
            <InputAdornment position={"end"}>
              <IconButton
                aria-label={
                  showPassword ? "hide the password" : "display the password"
                }
                onClick={() => setShowPassword((prev) => !prev)}
                edge={"end"}
              >
                {showPassword ? (
                  <EyeIcon sx={eyeIconStyle} />
                ) : (
                  <EyeOffIcon sx={eyeIconStyle} />
                )}
              </IconButton>
            </InputAdornment>
          }
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
    </Stack>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          position: "relative",
          width: "100vw",
          height: "100vh",
        }}
      >
        <Box
          component={Image}
          src={BackgroundImage}
          alt={"배경 이미지"}
          sizes={"100vw"}
          priority
          fill
          sx={{
            zIndex: -1,
            pointerEvents: "none",
            filter: "blur(6px)",
            transform: "scale(1.05)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "linear-gradient(180deg, rgba(12, 13, 13, 0.90) 0%, rgba(12, 13, 13, 0.50) 100%)",
          }}
        />
        <LoginContent />
      </Box>
      <SenifitDialog
        isOpen={failDialogOpen}
        onClose={() => setFailDialogOpen(false)}
        dialogType={"error"}
        title={"아이디 혹은 비밀번호가\n일치하지 않습니다."}
        body={
          "로그인 정보에 대한 자세한 문의는\nSGEE 협회로 문의해주시기 바랍니다."
        }
        primaryText={"다시 시도하기"}
        onPrimaryClick={() => setFailDialogOpen(false)}
        secondaryText={"문의하기"}
        secondaryButtonProps={{
          component: Link,
          href: kakaoChannelLink,
          rel: "noopener noreferrer",
        }}
      />

      <SenifitDialog
        isOpen={inquiryDialogOpen}
        onClose={() => setInquiryDialogOpen(false)}
        dialogType={"info"}
        title={"로그인이 되지 않나요?"}
        body={
          "로그인 정보에 대한 자세한 문의는\nSGEE 협회로 문의해주시기 바랍니다."
        }
        primaryText={"다시 시도하기"}
        onPrimaryClick={() => setInquiryDialogOpen(false)}
        secondaryText={"문의하기"}
        secondaryButtonProps={{
          component: Link,
          href: kakaoChannelLink,
          rel: "noopener noreferrer",
        }}
      />
    </form>
  );
}
