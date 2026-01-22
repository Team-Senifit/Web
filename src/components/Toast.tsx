"use client";

import useMedia from "@/hooks/useMedia";
import { useToastStore } from "@/states/useToastStore";
import { autoHideDurationMap } from "@/types/IToast";
import { Alert, Snackbar, Typography } from "@mui/material";
import React from "react";

const Toast = () => {
  const { message, open, autoHide, setToastClose } = useToastStore();
  const { isPhone } = useMedia();

  React.useEffect(() => {
    if (!open) return;

    const duration =
      autoHideDurationMap[autoHide] || autoHideDurationMap.normal;
    const timer = setTimeout(() => {
      setToastClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [open, autoHide, setToastClose]);

  return (
    <Snackbar
      open={open}
      onClose={setToastClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      // autoHideDuration={autoHideDurationMap["normal"]}
      sx={{
        maxWidth: "1200px",
        mx: "auto",
      }}
    >
      <Alert
        icon={false}
        sx={{
          bgcolor: "material.dimmer",
          maxWidth: "1200px",
          width: "100%",
          p: 3,
          borderRadius: "0.75rem",
        }}
      >
        <Typography
          variant={isPhone ? "Headline1" : "Title3"}
          sx={{ color: "white" }}
        >
          {message}
        </Typography>
      </Alert>
    </Snackbar>
  );
};

export default Toast;
