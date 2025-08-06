"use client";

import {
  Box,
  Button,
  Typography,
  Avatar,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
} from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { login } from "@/apis/auth";
import SenifitTextField from "../../components/SenifitTextField";
import { useRouter } from "next/navigation";
import { useState } from "react";

type LoginFormValues = {
  id: string;
  password: string;
};

export default function LoginForm() {
  const methods = useForm<LoginFormValues>({ mode: "onBlur" });
  const { handleSubmit, control, formState: { errors } } = methods;

  const router = useRouter();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data);
      setShowSnackbar(true);
      setTimeout(() => {
        router.push("/exercise");
      }, 1000);
    } catch (error) {
      setShowDialog(true);
    }
  };

  return (
    <FormProvider {...methods}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="#fff"
      >
        <Box sx={{ padding: 4, width: 600 }}>
          {/* 로고 + 안내문구 */}
          <Box display="flex" flexDirection="column" alignItems="center" mb={10}>
            <Avatar
              sx={{ width: 80, height: 80, bgcolor: "grey.300", mb: 2 }}
              variant="rounded"
            >
              <Typography variant="Caption1">시니핏 로고</Typography>
            </Avatar>
            <Typography variant="Heading2">
              어르신들을 위한 노인 맞춤 운동, 시니핏
            </Typography>
          </Box>

          {/* 로그인 폼 */}
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            autoComplete="off"
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
          >
            <Typography variant="Title2" mb={2}>
              로그인
            </Typography>

            <SenifitTextField
              name="id"
              label="아이디"
              rules={{ required: "아이디를 입력해주세요." }}
              control={control}
              sx={{ width: 350, height: 55 }}
              InputProps={{ sx: { height: 55 } }}
            />

            <SenifitTextField
              name="password"
              type="password"
              label="비밀번호"
              rules={{ required: "비밀번호를 입력해주세요." }}
              control={control}
              sx={{ width: 350, height: 55, mt: 2 }}
              InputProps={{ sx: { height: 55 } }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                width: 150,
                height: 60,
                mt: 3,
                fontSize: "1.5rem",
                fontWeight: 700,
              }}
            >
              로그인
            </Button>
          </Box>
        </Box>

        {/* 실패 팝업 */}
        <Dialog
          open={showDialog}
          onClose={() => setShowDialog(false)}
          PaperProps={{
            sx: {
              border: "1px solid #ccc",
              borderRadius: "12px",
            },
          }}
        >
          <DialogContent sx={{ p: 4 }}>
            <DialogContentText>
              아이디 혹은 비밀번호가 일치하지 않습니다.
              <br />
              <br />
              로그인 정보에 대한 자세한 문의는
              <br />
              SGEE 협회로 문의해주시기 바랍니다.
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button
              variant="outlined"
              onClick={() => window.open("http://pf.kakao.com/_rXiVn", "_blank")}
            >
              문의하기
            </Button>
            <Button
              variant="contained"
              onClick={() => setShowDialog(false)}
              sx={{ bgcolor: "#666", color: "#fff", "&:hover": { bgcolor: "#555" } }}
            >
              닫기
            </Button>
          </DialogActions>
        </Dialog>

        {/* 성공 알림 */}
        <Snackbar
          open={showSnackbar}
          autoHideDuration={1500}
          message="로그인 성공! 오늘도 즐거운 시니핏 하세요!"
        />
      </Box>
    </FormProvider>
  );
}
