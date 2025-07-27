import { Stack, Typography } from "@mui/material";
import React from "react";

const Member = ({ name, age, grade, gender }: IMember) => {
  return (
    <Stack direction={"row"} spacing={3}>
      <Typography>{name}</Typography>
      <Stack direction={"row"} spacing={1}>
        <Typography>{age}세</Typography>
        <Typography>{grade}</Typography>
        <Typography>{gender}</Typography>
      </Stack>
    </Stack>
  );
};

const MemberList = ({ members }: { members: Array<IMember> }) => {
  return (
    <Stack spacing={2} direction={"column"}>
      {members.map((member) => (
        <Member key={member.id} {...member} />
      ))}
    </Stack>
  );
};
export default MemberList;
