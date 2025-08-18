export type Gender = 0 | 1;
export type MemberRank = 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0: 등급 외, 6: 인지지원등급
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
