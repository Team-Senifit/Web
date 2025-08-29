// utils/getManAge.ts
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

interface IManAgeOptions {
  /** 기준일. 기본값: dayjs() */
  now?: Dayjs;
  /** 문자열 입력일 때 포맷 (예: 'YYYY-MM-DD') */
  format?: string;
  /**
   * 윤년이 아닌 해의 2/29 처리 방식.
   * false(기본): 3/1을 생일로 간주
   * true: 2/28을 생일로 간주
   */
  leapDayAsFeb28?: boolean;
}

/** 만나이(국제 나이) 계산 */
export function calculateAge(birth: Dayjs, opts: IManAgeOptions = {}): number {
  const { now = dayjs(), format, leapDayAsFeb28 = false } = opts;

  const b = dayjs.isDayjs(birth)
    ? birth
    : typeof birth === "string" && format
      ? dayjs(birth, format, true)
      : dayjs(birth);

  if (!b.isValid()) throw new Error("Invalid birth date");

  // 기준 연도의 "올해 생일"을 계산하기 위한 월/일
  let m = b.month(); // 0~11 (0=1월)
  let d = b.date();

  // 2/29의 비윤년 처리
  if (m === 1 && d === 29) {
    const leapThisYear = dayjs(
      `${now.year()}-02-29`,
      "YYYY-MM-DD",
      true,
    ).isValid();
    if (!leapThisYear) {
      if (leapDayAsFeb28) {
        m = 1;
        d = 28; // 2/28
      } else {
        m = 2;
        d = 1; // 3/1
      }
    }
  }

  let age = now.year() - b.year();
  const birthdayPassed =
    now.month() > m || (now.month() === m && now.date() >= d);

  if (!birthdayPassed) age -= 1;

  if (age < 0) {
    throw new Error("잘못된 값입니다.");
  }
  return age;
}

/** 특정 기준일에서 만나이 계산하는 헬퍼 */
export const getManAgeAt = (
  birth: Dayjs,
  at: Dayjs,
  opts?: Omit<IManAgeOptions, "now">,
) => calculateAge(birth, { ...opts, now: at });
