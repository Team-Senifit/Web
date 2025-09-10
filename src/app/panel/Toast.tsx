"use client";

import useMedia from "@/hooks/useMedia";
import { useToastStore } from "@/states/useToastStore";
import { Alert, Snackbar, Typography } from "@mui/material";
import React from "react";

const Toast = () => {
  const { message, open, setToastClose } = useToastStore();
  const { isPhone } = useMedia();

  return (
    <Snackbar
      open={open}
      onClose={setToastClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      autoHideDuration={6000}
      sx={{
        px: "1.5rem",
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
