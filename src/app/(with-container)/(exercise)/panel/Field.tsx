import { Stack, Typography } from "@mui/material";

const Field = ({
  label,
  id,
  children,
  isPhone,
  required = false,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
  tabletDirection?: "column" | "row";
  isPhone?: boolean;
  required?: boolean;
}) => {
  return (
    <Stack direction={"column"} spacing={1} width={"100%"}>
      <Stack direction={"row"} spacing={0.5} pt={[0, 2]}>
        <Typography
          component={"label"}
          htmlFor={id}
          variant={isPhone ? "Headline1" : "Title3"}
          sx={{ color: "label.normal", wordBreak: "keep-all" }}
        >
          {label}
        </Typography>
        {required && (
          <Typography component={"span"} sx={{ color: "primary.main" }}>
            {" *"}
          </Typography>
        )}
      </Stack>

      {children}
    </Stack>
  );
};

export default Field;
