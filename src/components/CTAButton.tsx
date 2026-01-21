import { Button, ButtonProps, Typography } from "@mui/material";
import React from "react";
import Link from "next/link";

// 이 컴포넌트에 종속되는 타입이므로 이 파일에 정의
export interface ICTAButtonProps extends ButtonProps {
  href?: string;
  text: string;
}

const CTAButton = (props: ICTAButtonProps) => {
  const { href, text, ...rest } = props;
  return (
    <Button
      variant={"text"}
      {...rest}
      {...(href
        ? {
            component: Link,
            href,
          }
        : {})}
      sx={{
        py: 2,
        px: 8,
        borderRadius: "0.75rem",
        ...props.sx,
      }}
    >
      <Typography variant={"Heading1"}>{text}</Typography>
    </Button>
  );
};

export default CTAButton;
