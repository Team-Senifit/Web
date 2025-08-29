import type { ReactNode } from "react";
import type { SelectProps } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import type {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";

export type TOptionValue = string | number;

/** 옵션 모델 */
export interface ISelectOption<T extends TOptionValue> {
  value: T;
  label: ReactNode;
  disabled?: boolean;
}

/** 공용 Select 베이스 props */
export interface IBaseSelectProps<T extends TOptionValue>
  extends Omit<
    SelectProps<T>,
    "multiple" | "value" | "onChange" | "renderValue" | "native"
  > {
  options: ISelectOption<T>[];
  placeholder?: ReactNode;
  /** 메뉴 Paper / List 개별 커스텀 */
  menuPaperSx?: SxProps<Theme>;
  menuListSx?: SxProps<Theme>;
}

/** 단일 선택 */
export interface ISingleSelectProps<T extends TOptionValue>
  extends IBaseSelectProps<T> {
  multiple?: false;
  value: T | "";
  onChange: (v: T) => void;
}

/** 다중 선택 */
export interface IMultiSelectProps<T extends TOptionValue>
  extends IBaseSelectProps<T> {
  multiple: true;
  value: T[];
  onChange: (v: T[]) => void;
}

export type TSenifitSelectProps<T extends TOptionValue> =
  | ISingleSelectProps<T>
  | IMultiSelectProps<T>;

/** RHF 래퍼용 */
/** RHF는 useForm의 defaultValues 권장, 필요 시 명시 가능 */
export interface ISenifitSelectFieldProps<
  TFieldValues extends FieldValues,
  T extends TOptionValue,
> extends Omit<TSenifitSelectProps<T>, "value" | "onChange"> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  rules?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValue?: any;
}
