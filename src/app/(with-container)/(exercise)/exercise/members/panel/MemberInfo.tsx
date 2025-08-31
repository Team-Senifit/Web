import { genderLabel, gradeLabel, IMember } from "@/types/IMember";
import { calculateAge } from "@/utils/calculateAge";
import { Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import React from "react";

const MemberInfo = ({ name, birthDate, gender, memberRank }: IMember) => {
  return (
    <Stack
      direction={["column", "row"]}
      justifyContent={["flex-start", "space-between"]}
      columnGap={1}
      width={"100%"}
    >
      <Typography
        variant={"Headline1"}
        sx={{
          color: "label.normal",
        }}
      >
        {name}
      </Typography>
      <Stack direction={"row"} spacing={2}>
        <Typography variant={"Headline1"} sx={{ color: "label.neutral" }}>
          {`${calculateAge(dayjs(birthDate))}세`}
        </Typography>
        <Typography variant={"Headline1"} sx={{ color: "label.neutral" }}>
          {genderLabel[gender]}
        </Typography>
        <Typography
          variant={"Headline1"}
          sx={{ color: "label.neutral", width: "6rem" }}
        >
          {gradeLabel[memberRank]}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default MemberInfo;
