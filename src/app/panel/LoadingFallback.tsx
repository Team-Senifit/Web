import { Stack } from "@mui/material";
import React from "react";
import { SyncLoader } from "react-spinners";

const LoadingFallback = () => {
  return (
    <Stack
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ height: "100vh" }}
    >
      <SyncLoader speedMultiplier={0.5} color={"#FB5F04"} />
    </Stack>
  );
};

export default LoadingFallback;
