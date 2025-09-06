"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  Typography,
  Button,
  Stack,
  ButtonProps,
} from "@mui/material";
import {
  CircleCheckBigIcon,
  CircleQuestionMarkIcon,
  TriangleAlertIcon,
} from "./icons";

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
  primaryButtonProps?: ButtonProps;
  secondaryButtonProps?: ButtonProps;
}

const iconByType: Record<
  ISenifitDialogProps["dialogType"],
  { node: React.ReactNode }
> = {
  info: {
    node: (
      <CircleQuestionMarkIcon
        strokeWidth={3}
        sx={{
          color: (t) => t.palette.statusVariants.positive,
          width: "2.5rem",
          height: "2.5rem",
        }}
      />
    ),
  },
  success: {
    node: (
      <CircleCheckBigIcon
        strokeWidth={3}
        sx={{
          color: (t) => t.palette.statusVariants.positive,
          width: "2.5rem",
          height: "2.5rem",
        }}
      />
    ),
  },
  error: {
    node: (
      <TriangleAlertIcon
        strokeWidth={3}
        sx={{
          color: (t) => t.palette.statusVariants.negative,
          width: "2.5rem",
          height: "2.5rem",
        }}
      />
    ),
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
  primaryButtonProps,
  secondaryButtonProps,
}: ISenifitDialogProps) {
  const { node: IconNode } = iconByType[dialogType];
  const titleId = React.useId();
  const descId = React.useId();

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby={titleId}
      aria-describedby={descId}
      slotProps={{
        paper: {
          sx: {
            borderRadius: "0.75rem",
          },
        },
      }}
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
            {IconNode}

            <Typography
              id={titleId}
              variant={"Headline1"}
              align={"center"}
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
            {primaryText && (
              <Button
                fullWidth
                onClick={onPrimaryClick}
                {...primaryButtonProps}
                sx={{
                  bgcolor: "primaryVariants.default",
                  borderRadius: 2,
                  height: 60,
                  "&:hover": { bgcolor: "primaryVariants.default" },
                  ...primaryButtonProps?.sx,
                }}
              >
                <Typography variant={"Heading1"} color={"static.white"}>
                  {primaryText}
                </Typography>
              </Button>
            )}

            {secondaryText && (
              <Button
                fullWidth
                onClick={onSecondaryClick}
                {...secondaryButtonProps}
                sx={{
                  bgcolor: "fillVariants.colored",
                  borderRadius: 2,
                  height: 60,
                  "&:hover": { bgcolor: "fillVariants.colored" },
                  ...secondaryButtonProps?.sx,
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
