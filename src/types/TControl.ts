import type {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";

export type Rules<T extends FieldValues> = Omit<
  RegisterOptions<T>,
  "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
>;

export type TControl<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  rules?: Rules<T>;
};
