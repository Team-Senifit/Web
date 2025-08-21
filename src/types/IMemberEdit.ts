export interface IMemberEditFormValue {
  name: string;
  year: number | null;
  month: number | null;
  day: number | null;
  gender: number;
  memberRank: number;
  isSolar: boolean;
}

export interface IMemberEditFormPayload {
  name: string;
  gender: number;
  birthDate: string; // YYYY-MM-DD
  memberRank: number;
  isSolar: boolean;
}
