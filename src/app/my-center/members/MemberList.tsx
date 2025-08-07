import { Button, Grid, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const Member = ({ id, name, age, grade, gender }: IMember) => {
  return (
    <>
      <Grid size={2}>
        <Typography>{name}</Typography>
      </Grid>
      <Grid container size={6}>
        <Grid size={2}>
          <Typography>{age}세</Typography>
        </Grid>
        <Grid size={2}>
          <Typography>{gender} </Typography>
        </Grid>
        <Grid size={2}>
          <Typography>{grade}</Typography>
        </Grid>
      </Grid>
      <Grid size={2}>
        <Button
          variant="contained"
          component={Link}
          href={`/my-center/members/edit/${id}`}
        >
          {"수정"}
        </Button>
      </Grid>
      <Grid size={2}>
        <Button variant="contained">{"삭제"}</Button>
      </Grid>
    </>
  );
};

const MemberList = ({ members }: { members: Array<IMember> }) => {
  return (
    <Grid container spacing={2}>
      {members.map((member) => (
        <Member key={member.id} {...member} />
      ))}
    </Grid>
  );
};

export default MemberList;
