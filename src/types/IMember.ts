export interface IMember {
  id: number;
  name: string;
  age: number;
  grade:
    | "1등급"
    | "2등급"
    | "3등급"
    | "4등급"
    | "5등급"
    | "인지지원등급"
    | "등급외";
  gender: "여성" | "남성";
}
