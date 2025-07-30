import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
} from "@mui/material";
import { FieldValues, useController } from "react-hook-form";
import type { TControl } from "@/types/TControl";

export type Option = {
  label: React.ReactNode;
  value: string;
};

type SenifitRadioButtonGroupProps<T extends FieldValues> = TControl<T> & {
  /** 그룹 레이블 텍스트 */
  label: string;
  /** 선택지 배열 */
  options: Option[];
  /** 가로 배치 여부 (기본 false) */
  row?: boolean;
};

const SenifitRadioButtonGroup = <T extends FieldValues>({
  name,
  control,
  rules,
  label,
  options,
  row = false,
}: SenifitRadioButtonGroupProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, rules });

  const labelId = `${field.name}-label`;

  return (
    <FormControl component="fieldset" error={!!error} fullWidth>
      <FormLabel id={labelId} component="legend">
        {label}
      </FormLabel>

      <RadioGroup
        aria-labelledby={labelId}
        name={field.name}
        value={field.value ?? ""}
        onChange={(e) => field.onChange(e.target.value)}
        onBlur={field.onBlur}
        row={row}
      >
        {options.map(({ value, label: optLabel }) => (
          <FormControlLabel
            key={value}
            value={value}
            control={<Radio />}
            label={optLabel}
          />
        ))}
      </RadioGroup>

      {error && <FormHelperText>{error.message}</FormHelperText>}
    </FormControl>
  );
};

export default SenifitRadioButtonGroup;
