import { Box, Dialog, DialogContent, Typography, Button } from "@mui/material";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
// import { useTheme } from "@mui/material/styles";

interface ICustomFailDialogProps {
  open: boolean;
  onClose: () => void;
  main?: boolean;
}

export default function CustomFailDialog({
  open,
  onClose,
  main,
}: ICustomFailDialogProps) {
  // const theme = useTheme();
  const mainText = main
    ? "아이디 혹은 비밀번호가\n일치하지 않습니다."
    : "로그인이 되지 않나요?";
  const subText =
    "로그인 정보에 대한 자세한 문의는\nSGEE 협회로 문의해주시기 바랍니다.";

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "312px",
          padding: "0",
        }}
      >
        <Box
          width={"100%"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          padding={3}
          gap={2}
        >
          <WarningAmberRoundedIcon
            sx={{ color: "primaryVariants.default", fontSize: 48 }}
          />

          <Typography
            variant={"Headline1"}
            align={"center"}
            fontWeight={600}
            color={"text.primary"}
            whiteSpace={"pre-line"}
          >
            {mainText}
          </Typography>

          <Typography
            variant={"Body1"}
            align={"center"}
            color={"text.primary"}
            whiteSpace={"pre-line"}
          >
            {subText}
          </Typography>
        </Box>

        <Box
          width={"100%"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          padding={1.5}
          gap={1.5}
        >
          {/* 다시 시도하기 버튼 */}
          <Button
            onClick={onClose}
            fullWidth
            sx={{
              bgcolor: "primaryVariants.default",
              borderRadius: 2,
              height: 60,
            }}
          >
            <Typography variant={"Heading1"} color={"static.white"}>
              {"다시 시도하기"}
            </Typography>
          </Button>

          {/* 문의하기 버튼 */}
          <Button
            onClick={() => window.open("http://pf.kakao.com/_rXiVn", "_blank")}
            fullWidth
            sx={{
              bgcolor: "fillVariants.colored",
              borderRadius: 2,
              height: 60,
            }}
          >
            <Typography variant={"Heading1"} color={"primaryVariants.default"}>
              {"문의하기"}
            </Typography>
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
