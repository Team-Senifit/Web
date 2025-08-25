import React from "react";
import {
  FormControl,
  FormHelperText,
  InputBase,
  type InputBaseProps,
  type FormControlProps,
  Typography,
} from "@mui/material";
import { FieldValues, useController } from "react-hook-form";
import type { TControl } from "@/types/TControl";

type TProps<T extends FieldValues> =
  // value/defaultValue/name은 RHF가 관리하므로 제외
  Omit<InputBaseProps, "name" | "value" | "defaultValue"> &
    TControl<T> & {
      /** 에러가 없을 때 보여줄 힌트 텍스트 */
      hintText?: React.ReactNode;
      /** 바깥 FormControl에 전달할 props */
      formControlProps?: FormControlProps;
      /** HelperText 비활성화 */
      disableHelperText?: boolean;
    };

const SenifitTextField = <T extends FieldValues>(props: TProps<T>) => {
  const {
    name,
    control,
    rules,
    hintText,
    formControlProps,
    onChange,
    onBlur,
    disableHelperText = false, // default는 false
    sx,
    ...inputBaseProps
  } = props;

  const {
    field,
    fieldState: { error },
  } = useController({ name, control, rules });

  // Prefer an explicit error message; if it's empty/null/undefined, fall back to hintText
  const helper = error?.message || hintText;
  const helperId = helper ? `${String(name)}-hint` : undefined;

  return (
    <FormControl
      error={!!error}
      {...formControlProps}
      sx={{ gap: 0.5, ...(formControlProps?.sx || {}) }}
    >
      <InputBase
        id={String(name)}
        inputRef={field.ref}
        value={field.value ?? ""}
        onChange={(e) => {
          field.onChange(e);
          onChange?.(e);
        }}
        onBlur={(e) => {
          field.onBlur();
          onBlur?.(e);
        }}
        aria-describedby={helperId}
        slotProps={{
          input: {
            sx: (t) => ({ ...t.typography["Body1"] }),
          },
        }}
        sx={{
          width: "100%",
          height: "3.5rem",
          borderRadius: 1,
          backgroundColor: "fillVariants.normal",
          p: 2,
          "&:hover": {
            outline: "none",
          },
          "&.Mui-focused": {
            outline: "none",
          },
          ...sx,
        }}
        {...inputBaseProps}
      />
      {helper && (
        <FormHelperText id={helperId}>
          <Typography
            variant={"Body1"}
            sx={{
              color: "statusVariants.negative",
            }}
          >
            {helper}
          </Typography>
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default SenifitTextField;
