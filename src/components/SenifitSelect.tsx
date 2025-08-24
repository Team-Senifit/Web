"use client";

import * as React from "react";
import {
  Select,
  MenuItem,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import KeyboardArrowDownRounded from "@mui/icons-material/KeyboardArrowDownRounded";
import { Controller, type FieldValues } from "react-hook-form";

import type {
  TOptionValue,
  ISelectOption,
  TSenifitSelectProps,
  ISenifitSelectFieldProps,
} from "@/types/ISelect";

/** ───────── Styled ───────── */

interface ISelectStateProps {
  $open?: boolean;
  $filled?: boolean;
}

const SenifitSelectRoot = styled(Select, {
  shouldForwardProp: (prop) => prop !== "$open" && prop !== "$filled",
})<ISelectStateProps>(({ theme, $open, $filled }) => {
  const active = $open || $filled;
  return {
    borderRadius: "0.75rem",
    minWidth: 224,
    backgroundColor: active
      ? theme.palette.fillVariants.colored
      : theme.palette.fillVariants.alternative,
    "& .MuiOutlinedInput-notchedOutline": {
      borderWidth: 2,
      borderColor: active
        ? theme.palette.primary.main
        : theme.palette.borderVariants.normal,
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.main,
    },
    "& .MuiMenuItem-root": {
      ...theme.typography.Headline1,
      "& .Mui-selected": {
        bgcolor: "background.paper",
      },
    },
    "& .MuiSelect-select": {
      display: "flex",
      alignItems: "center",
      ...theme.typography.Headline1,
      paddingTop: 16,
      paddingBottom: 16,
      paddingLeft: 16,
      paddingRight: 40, // 아이콘 공간
      color: active
        ? theme.palette.primary.main
        : theme.palette.interaction.inactive,
    },
    "& .MuiSelect-icon": {
      right: 16,
      color: active
        ? theme.palette.primary.main
        : theme.palette.interaction.inactive,
    },
  };
});

/** ───────── Pure Select ───────── */

export function SenifitSelect<T extends TOptionValue>(
  props: TSenifitSelectProps<T>
) {
  const {
    options,
    placeholder,
    menuPaperSx,
    menuListSx,
    multiple,
    value,
    onChange,
    fullWidth,
    sx,
    ...rest
  } = props;

  const [open, setOpen] = React.useState(false);

  const labelMap = React.useMemo(() => {
    const m = new Map<T, React.ReactNode>();
    options.forEach((o) => m.set(o.value, o.label));
    return m;
  }, [options]);

  const filled = multiple
    ? Array.isArray(value) && (value as T[]).length > 0
    : value !== "" && value !== undefined && value !== null;

  const handleChange = (e: SelectChangeEvent<any>) => {
    if (multiple) onChange((e.target.value as T[]) ?? []);
    else onChange((e.target.value as T) ?? "");
  };
  const renderPlaceholder = () => {
    // 문자열이면 연하게, 이미 ReactNode면 그대로
    if (typeof placeholder === "string") {
      return (
        <Typography
          variant={"Headline1"}
          sx={{
            color: "interaction.inactive",
          }}
        >
          {placeholder}
        </Typography>
      );
    }
    return (
      placeholder ?? (
        <Typography
          variant={"Headline1"}
          sx={{
            color: "interaction.inactive",
          }}
        >
          선택
        </Typography>
      )
    );
  };

  const renderValue = (val: any) => {
    if (multiple) {
      const arr: T[] = Array.isArray(val) ? val : [];
      if (!arr.length) return renderPlaceholder();

      return (
        <span style={{ display: "inline-flex", gap: 8, flexWrap: "wrap" }}>
          {arr.map((v) => (
            <span key={String(v)}>{labelMap.get(v) ?? String(v)}</span>
          ))}
        </span>
      );
    }

    // ⬇️ 단일 선택 처리
    const isEmpty = val === "" || val === undefined || val === null;
    if (isEmpty) return renderPlaceholder();

    return <>{labelMap.get(val as T) ?? String(val)}</>;
  };

  return (
    <SenifitSelectRoot
      $open={open}
      $filled={filled}
      displayEmpty
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      multiple={!!multiple}
      value={value as any}
      onChange={handleChange}
      IconComponent={KeyboardArrowDownRounded}
      variant="outlined"
      renderValue={renderValue}
      fullWidth={fullWidth}
      MenuProps={{
        PaperProps: {
          elevation: 1,
          sx: {
            mt: 0,
            borderRadius: 1.5,
            overflow: "hidden",
            ...(rest as any)?.menuPaperSx,
            width: "fit-content",
          },
        },
        MenuListProps: {
          disablePadding: true,
          sx: {
            "& .MuiMenuItem-root": {
              py: 1.5,
              px: 2,
              color: "interaction.inactive",
              "&:not(:last-of-type)": {
                borderBottom: "1px solid",
                borderColor: "divider",
              },
              "&.Mui-selected": {
                bgcolor: "background.paper",
                color: "interaction.inactive",
              },
              "&.Mui-selected:hover": {
                bgcolor: "action.hover",
                color: "interaction.inactive",
              },
            },
            ...(rest as any)?.menuListSx,
          },
        },
      }}
      sx={{
        "&:hover": {
          bgcolor: "fillVariants.colored",
          color: "primary.main",
        },
        ...sx,
      }}
      {...rest}
    >
      {options.map((o: ISelectOption<T>) => (
        <MenuItem
          key={String(o.value)}
          value={o.value as any}
          disabled={o.disabled}
        >
          {o.label}
        </MenuItem>
      ))}
    </SenifitSelectRoot>
  );
}

/** ───────── RHF Field Wrapper ───────── */

export function SenifitSelectField<
  TFieldValues extends FieldValues,
  T extends TOptionValue,
>(props: ISenifitSelectFieldProps<TFieldValues, T>) {
  const { name, control, rules, multiple, defaultValue, ...rest } = props;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={
        defaultValue ?? (multiple ? ([] as unknown as T[]) : ("" as any))
      }
      render={({ field }) => (
        <SenifitSelect<T>
          multiple={!!multiple as any}
          value={(field.value ?? (multiple ? [] : "")) as any}
          onChange={(v: any) => field.onChange(v)}
          onBlur={field.onBlur}
          {...(rest as any)}
        />
      )}
    />
  );
}

export default SenifitSelect;
