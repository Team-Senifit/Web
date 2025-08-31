export type Gender = 0 | 1 | 2; // 0: other, 1: male, 2: female
export type MemberRank = 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0: 등급 외, 6: 인지지원등급

export const genderLabel: Array<string> = ["기타", "남성", "여성"];

export const gradeLabel: Array<string> = [
  "등급외",
  "1등급",
  "2등급",
  "3등급",
  "4등급",
  "5등급",
  "인지지원등급",
];
export interface IMemberEditFormValue {
  name: string;
  year: number | null;
  month: number | null;
  day: number | null;
  gender: Gender;
  memberRank: MemberRank;
  isSolar: boolean;
}

export interface IMemberEditFormPayload {
  name: string;
  gender: Gender;
  birthDate: string; // YYYY-MM-DD
  memberRank: MemberRank;
  isSolar: boolean;
}

export interface IMember extends IMemberEditFormPayload {
  memberId: number;
}
