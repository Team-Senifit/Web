"use client";

import * as React from "react";
import { Select, MenuItem, type SelectChangeEvent } from "@mui/material";
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
      : theme.palette.background.paper,
    "& .MuiOutlinedInput-notchedOutline": {
      borderWidth: 2,
      borderColor: active ? theme.palette.primary.main : theme.palette.divider,
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.main,
    },
    "& .MuiMenuItem-root": {
      "& .Mui-selected": {
        bgcolor: "background.paper",
      },
    },
    "& .MuiSelect-select": {
      display: "flex",
      alignItems: "center",
      fontWeight: 700,
      paddingTop: 12,
      paddingBottom: 12,
      paddingLeft: 16,
      paddingRight: 40, // 아이콘 공간
      color: active ? theme.palette.primary.main : theme.palette.text.primary,
    },
    "& .MuiSelect-icon": {
      right: 12,
      color: theme.palette.primary.main,
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

  const renderValue = (val: any) => {
    if (multiple) {
      const arr: T[] = Array.isArray(val) ? val : [];
      if (!arr.length)
        return (
          placeholder ?? (
            <span style={{ color: "var(--mui-palette-text-secondary)" }}>
              선택
            </span>
          )
        );
      return (
        <span style={{ display: "inline-flex", gap: 8, flexWrap: "wrap" }}>
          {arr.map((v) => (
            <span key={String(v)}>{labelMap.get(v)}</span>
          ))}
        </span>
      );
    }
    if (val === "" || val === undefined || val === null)
      return (
        placeholder ?? (
          <span style={{ color: "var(--mui-palette-text-secondary)" }}>
            선택
          </span>
        )
      );
    return <>{labelMap.get(val as T)}</>;
  };

  return (
    <SenifitSelectRoot
      $open={open}
      $filled={filled}
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
              color: "text.secondary",
              "&:not(:last-of-type)": {
                borderBottom: "1px solid",
                borderColor: "divider",
              },
              "&.Mui-selected": {
                bgcolor: "background.paper",
                color: "text.primary",
              },
              "&.Mui-selected:hover": {
                bgcolor: "action.hover",
                color: "text.primary",
              },
            },
            ...(rest as any)?.menuListSx,
          },
        },
      }}
      sx={{
        "&:hover": {
          bgcolor: "fillVariants.colored",
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
