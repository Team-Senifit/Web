import type {
  IMemberEditFormPayload,
  IMemberEditFormValue,
} from "@/types/IMember";
import dayjs from "dayjs";

export const transformPayloadToValue = (
  payload: IMemberEditFormPayload,
): IMemberEditFormValue => {
  return {
    ...payload,
    year: dayjs(payload.birthDate).year(),
    month: dayjs(payload.birthDate).month() + 1,
    day: dayjs(payload.birthDate).date(),
  };
};

export const transformValueToPayload = (
  value: IMemberEditFormValue,
): IMemberEditFormPayload => {
  return {
    name: value.name,
    memberRank: value.memberRank,
    gender: value.gender,
    isSolar: value.isSolar,
    birthDate: dayjs()
      .year(value?.year ? value.year : 2000)
      .month(value?.month ? value.month - 1 : 0)
      .date(value?.day ? value.day : 1)
      .format("YYYY-MM-DD"),
  };
};
