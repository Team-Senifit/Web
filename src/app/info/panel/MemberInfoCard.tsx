import { Button, Divider, Grid, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const Member = ({ name, age, grade, gender }: IMember) => {
  return (
    <>
      <Grid>
        <Typography>{name}</Typography>
      </Grid>
      <Grid>
        <Typography>{age}세</Typography>
      </Grid>
      <Grid>
        <Typography>{grade}</Typography>
      </Grid>
      <Grid>
        <Typography>{gender} </Typography>
      </Grid>
    </>
  );
};

const MemberInfoCard = ({
  count,
  members,
}: {
  count: number;
  members: Array<IMember>;
}) => {
  return (
    <Stack
      component={"section"}
      sx={{
        bgcolor: "lightgray",
        borderRadius: 1,
        padding: 2,
        width: 1,
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="start"
        spacing={1}
      >
        <Stack direction={"column"} spacing={1}>
          <Typography>{"센터 인원"}</Typography>
          <Typography>{"현재 등록된 어르신은"}</Typography>
          <Typography>
            <Typography component="span">{`${count}명`}</Typography>
            {"입니다."}
          </Typography>
        </Stack>
        <Button variant="contained" component={Link} href="/info/members">
          <Typography>{"관리하기"}</Typography>
        </Button>
      </Stack>
      <Divider sx={{ width: "50%" }} />
      <Grid container spacing={2}>
        {members.map((member) => (
          <Member key={member.id} {...member} />
        ))}
      </Grid>
    </Stack>
  );
};

export default MemberInfoCard;
