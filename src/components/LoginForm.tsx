"use client";

import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
} from "@mui/material";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const [userIdError, setUserIdError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [showDialog, setShowDialog] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleLogin = () => {
    const isUserIdEmpty = userId.trim() === "";
    const isPasswordEmpty = password.trim() === "";

    setUserIdError(isUserIdEmpty);
    setPasswordError(isPasswordEmpty);

    if (isUserIdEmpty || isPasswordEmpty) return;

    if (userId === "test" && password === "1234") {
      setShowSnackbar(true);
      setTimeout(() => {
        router.push("/exercise");
      }, 1500);
    } else {
      setShowDialog(true);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#fff"
    >
      <Box sx={{ padding: 4, width: 600 }}>
        {/* 로고 및 안내 문구 */}
        <Box display="flex" flexDirection="column" alignItems="center" mb={ 10 }>
          <Avatar
            sx={{ width: 80, height: 80, bgcolor: "grey.300", mb: 2 }}
            variant="rounded"
          >
            <Typography variant="caption">시니핏 로고</Typography>
          </Avatar>
          <Typography variant="h6">
            누구든 쉽게하는 노인단체운동, 시니핏
          </Typography>
        </Box>

        {/* 입력창 & 버튼 */}
        <Box
          component="form"
          noValidate
          autoComplete="off"
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={2}
        >
          <Typography variant="h5" mb={2} fontWeight="bold">
            로그인
          </Typography>
          <TextField
            label="아이디"
            value={userId}
            onChange={(e) => {
              setUserId(e.target.value);
              setUserIdError(false);
            }}
            error={userIdError}
            helperText={userIdError ? "아이디를 입력해주세요." : ""}
            sx={{ width: 350, height: 55 }}
            InputProps={{ sx: { height: 55 } }}
          />
          <TextField
            label="비밀번호"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError(false);
            }}
            error={passwordError}
            helperText={passwordError ? "비밀번호를 입력해주세요." : ""}
            sx={{ width: 350, height: 55, mt: 2 }}
            InputProps={{ sx: { height: 55 } }}
          />

          <Button
            variant="contained"
            color="primary"
            sx={{ width: 150, height: 60, mt: 2 }}
            onClick={handleLogin}
          >
            로그인
          </Button>
        </Box>
      </Box>

      {/* 로그인 정보 불일치 팝업 */}
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
            onClick={() => window.open("https://your-inquiry-site.com", "_blank")}
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

      {/* 로그인 성공 알림 */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={1500}
        message="로그인 성공! 오늘도 즐거운 시니핏 하세요!"
      />
    </Box>
  );
}
