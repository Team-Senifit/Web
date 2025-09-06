"use client";

import * as React from "react";
import {
  useController,
  type FieldPath,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import SenifitToggleButtonGroup from "./SenifitToggleButtonGroup";
import type { ISenifitToggleButtonGroupProps } from "@/types/IToggleButton";

export interface ISenifitToggleButtonGroupFieldProps<
  T extends string | number | boolean,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<ISenifitToggleButtonGroupProps<T>, "value" | "onChange">,
    Pick<
      UseControllerProps<TFieldValues, TName>,
      "name" | "control" | "rules"
    > {}

function SenifitToggleButtonGroupField<
  T extends string | number | boolean,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: ISenifitToggleButtonGroupFieldProps<T, TFieldValues, TName>) {
  const { name, control, rules, ...toggleProps } = props;

  const {
    field: { onChange, value },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <SenifitToggleButtonGroup
      {...toggleProps}
      value={value}
      onChange={onChange}
    />
  );
}

export default SenifitToggleButtonGroupField;
