import type { ReactNode } from "react";
import type {
  ToggleButtonProps as MuiToggleButtonProps,
  ToggleButtonGroupProps as MuiToggleButtonGroupProps,
} from "@mui/material";

/** 버튼 높이 프리셋 사이즈 */
export type SizeVariant = "sm" | "md" | "lg";

/** 개별 토글 버튼 공용 props */
export interface ISenifitToggleButtonProps extends MuiToggleButtonProps {
  /** 버튼 높이 프리셋 */
  sizeVariant?: SizeVariant;
  /** 그룹 내에서 각 버튼을 가변 폭(flex:1)으로 확장할지 여부 */
  fullWidth?: boolean;
}

/** 토글 버튼 그룹 루트 컴포넌트 공용 props */
export interface ISenifitToggleButtonGroupRootProps
  extends MuiToggleButtonGroupProps {
  /** 버튼 간 간격(theme.spacing 배수) */
  gap?: number;
}

/** 렌더링할 각 토글 버튼 옵션 모델 */
export interface ISenifitToggleOption<T extends string | number> {
  /** 해당 옵션의 값 */
  value: T;
  /** 버튼 라벨(텍스트/아이콘 등) */
  label: ReactNode;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 개별 버튼 단위의 추가 props(전체 버튼 공용 props를 덮어쓸 수 있음) */
  buttonProps?: Omit<ISenifitToggleButtonProps, "value">;
}

/** 단일/멀티 공용 기본 props */
export interface IBaseProps<T extends string | number> {
  /** 버튼 옵션 목록 */
  options: ISenifitToggleOption<T>[];
  /** 버튼 높이 프리셋 */
  sizeVariant?: SizeVariant;
  /** 버튼을 동일 가변 폭으로 채울지 여부 */
  fullWidth?: boolean;
  /** 그룹 루트에 전달할 추가 props(제어 관련 키는 제외) */
  groupProps?: Omit<
    ISenifitToggleButtonGroupRootProps,
    "value" | "onChange" | "exclusive"
  >;
  /** 모든 버튼에 공통으로 적용할 props(개별 buttonProps로 덮어쓰기 가능) */
  buttonProps?: Omit<ISenifitToggleButtonProps, "value">;
}

/** 단일 선택(Exclusive) 모드용 props */
export interface IExclusiveProps<T extends string | number>
  extends IBaseProps<T> {
  /** true 또는 생략 시 단일 선택 모드 */
  exclusive?: true;
  /** 현재 선택 값 */
  value: T | null;
  /** 값 변경 콜백(항상 단일 값) */
  onChange: (v: T) => void;
}

/** 다중 선택(Multi) 모드용 props */
export interface IMultiProps<T extends string | number> extends IBaseProps<T> {
  /** false일 때만 다중 선택 모드로 동작 */
  exclusive: false;
  /** 현재 선택 값 배열 */
  value: T[];
  /** 값 변경 콜백(배열) */
  onChange: (v: T[]) => void;
}

/** 컴포넌트 공개 props 유니온(제네릭 진입점) */
export type ISenifitToggleButtonGroupProps<T extends string | number> =
  | IExclusiveProps<T>
  | IMultiProps<T>;

/** 편의상 MUI 원본 타입 재노출(필요 시 import 없이 사용 가능) */
export type { MuiToggleButtonProps, MuiToggleButtonGroupProps };
