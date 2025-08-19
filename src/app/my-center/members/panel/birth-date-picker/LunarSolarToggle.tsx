import React from "react";
import SenifitToggleButtonGroup from "../../../../../components/SenifitToggleButtonGroup";
import { Box, Typography } from "@mui/material";
import useMedia from "@/hooks/useMedia";
import { ISenifitToggleOption } from "@/types/IToggleButton";

type CalendarType = "lunar" | "solar";

const LunarSolarLabel = ({
  text,
  variant,
}: {
  text: string;
  variant: "Headline1" | "Heading2";
}) => <Typography variant={variant}>{text}</Typography>;

const LunarSolarToggle = ({
  calendarType,
  setCalendarType,
}: {
  calendarType: CalendarType;
  setCalendarType: (value: CalendarType) => void;
}) => {
  const { isPhone } = useMedia();

  const textVariant = isPhone ? "Headline1" : "Heading2";

  const options = [
    {
      value: "lunar",
      label: <LunarSolarLabel text="음력" variant={textVariant} />,
    },
    {
      value: "solar",
      label: <LunarSolarLabel text="양력" variant={textVariant} />,
    },
  ] as ISenifitToggleOption<CalendarType>[];

  return (
    <Box
      sx={{
        p: [1.5],
      }}
    >
      <SenifitToggleButtonGroup<CalendarType>
        fullWidth
        value={calendarType}
        onChange={setCalendarType}
        exclusive
        options={options}
      />
    </Box>
  );
};

export default LunarSolarToggle;
