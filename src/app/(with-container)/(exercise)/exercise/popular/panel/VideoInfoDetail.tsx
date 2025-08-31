import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import React from "react";

const VideoInfoDetail = () => {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "3.5rem",
      }}
    >
      <Accordion
        sx={{
          borderRadius: "0.75rem !important",

          backgroundColor: "background.default",
          boxShadow: "none",
          "&:before": { display: "none" },
          "&.Mui-expanded": { margin: 0, borderRadius: "0.75rem" },
          "& .MuiButtonBase-root": {
            borderRadius: "0.75rem",
          },
          "&:first-of-type": {
            borderRadius: "0.75rem !important",
          },
          "&:last-of-type": {
            borderRadius: "0.75rem !important",
          },
          border: "2px solid",
          borderColor: "borderVariants.normal",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMore sx={{ color: "primary.main" }} />}
          sx={{
            backgroundColor: "background.default",
            height: "3.5rem",
            "& .MuiAccordionSummary-content": {
              width: "fit-content",
              flexGrow: 0,
              justifyContent: "center",
              "&.Mui-expanded": { margin: "12px 0" },
            },
            borderRadius: "0.75rem 0.75rem",
            "&.Mui-expanded": {
              borderRadius: "0.75rem 0.75rem",
              borderBottom: "2px solid",
              borderColor: "borderVariants.normal",
            },
          }}
        >
          <Typography
            sx={{ color: "primary.main" }}
            variant={"Headline1"}
            component={"span"}
          >
            {"운동 자세히 보기"}
          </Typography>
        </AccordionSummary>

        <AccordionDetails
          sx={{
            backgroundColor: "background.default",
            borderRadius: "0 0 0.75rem 0.75rem",
          }}
        >
          <Typography variant={"body2"} color={"text.secondary"}>
            {"운동 상세 내용..."}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default VideoInfoDetail;
