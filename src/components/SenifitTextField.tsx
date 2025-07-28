import { TextField, TextFieldProps } from "@mui/material";
import { FieldValues, useController } from "react-hook-form";
import type { TControl } from "@/types/TControl";

type TProps<T extends FieldValues> = TextFieldProps & TControl<T>;

const SenifitTextField = <T extends FieldValues>(props: TProps<T>) => {
  const { name, control, rules, onChange, onBlur, ...textFieldProps } = props;

  const { field } = useController({
    name,
    control,
    rules,
  });

  return (
    <TextField
      autoComplete="off"
      variant="outlined"
      {...field}
      {...textFieldProps}
      onChange={(e) => {
        field.onChange(e);
        onChange?.(e);
      }}
      onBlur={(e) => {
        field.onBlur();
        onBlur?.(e);
      }}
    />
  );
};

export default SenifitTextField;
