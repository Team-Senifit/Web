"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  Typography,
  Button,
  Stack,
  Box,
  type SxProps,
  type Theme,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

export interface ISenifitDialogProps {
  isOpen: boolean;
  onClose: () => void;
  dialogType: "info" | "success" | "error";
  title: string;
  body: string;
  primaryText?: string;
  secondaryText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

const iconByType: Record<
  ISenifitDialogProps["dialogType"],
  { node: React.ReactNode; sx: SxProps<Theme> }
> = {
  info: {
    node: <InfoOutlinedIcon fontSize={"inherit"} />,
    sx: { color: "primaryVariants.default", fontSize: 48 },
  },
  success: {
    node: <CheckCircleOutlineRoundedIcon fontSize={"inherit"} />,
    sx: { color: "success.main", fontSize: 48 },
  },
  error: {
    node: <WarningAmberRoundedIcon fontSize={"inherit"} />,
    sx: { color: "error.main", fontSize: 48 },
  },
};

export default function SenifitDialog({
  isOpen,
  onClose,
  dialogType,
  title,
  body,
  primaryText,
  secondaryText,
  onPrimaryClick,
  onSecondaryClick,
}: ISenifitDialogProps) {
  const { node: IconNode, sx: iconSx } = iconByType[dialogType];
  const titleId = React.useId();
  const descId = React.useId();

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby={titleId}
      aria-describedby={descId}
    >
      <DialogContent
        sx={{
          width: "19.5rem",
          height: "fit-content",
          pt: 3,
          px: 1.5,
          pb: 1.5,
        }}
      >
        <Stack
          width={"100%"}
          direction={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          spacing={3}
        >
          <Stack
            component={"section"}
            direction={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            spacing={2}
          >
            <Box sx={iconSx} aria-hidden>
              {IconNode}
            </Box>

            <Typography
              id={titleId}
              variant={"Headline1"}
              align={"center"}
              fontWeight={600}
              color={"text.primary"}
              sx={{ whiteSpace: "pre-line" }}
            >
              {title}
            </Typography>

            <Typography
              id={descId}
              variant={"Body1"}
              align={"center"}
              color={"text.primary"}
              sx={{ whiteSpace: "pre-line" }}
            >
              {body}
            </Typography>
          </Stack>

          {/* 액션 영역 */}
          <Stack
            component={"footer"}
            width={"100%"}
            p={1.5}
            direction={"column"}
            spacing={1.5}
          >
            {primaryText && onPrimaryClick && (
              <Button
                fullWidth
                onClick={onPrimaryClick}
                sx={{
                  bgcolor: "primaryVariants.default",
                  borderRadius: 2,
                  height: 60,
                  "&:hover": { bgcolor: "primaryVariants.default" },
                }}
              >
                <Typography variant={"Heading1"} color={"static.white"}>
                  {primaryText}
                </Typography>
              </Button>
            )}

            {secondaryText && onSecondaryClick && (
              <Button
                fullWidth
                onClick={onSecondaryClick}
                sx={{
                  bgcolor: "fillVariants.colored",
                  borderRadius: 2,
                  height: 60,
                  "&:hover": { bgcolor: "fillVariants.colored" },
                }}
              >
                <Typography
                  variant={"Heading1"}
                  color={"primaryVariants.default"}
                >
                  {secondaryText}
                </Typography>
              </Button>
            )}
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
