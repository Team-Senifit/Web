import { useEffect, useRef } from "react";
import dayjs, { Dayjs } from "dayjs";

type DeadlineInput = Dayjs | Date | number | string;

export interface IDeadlineOpts {
  /** 실행할 시각 (Dayjs/Date/ms/string 모두 OK) */
  at: DeadlineInput;
  /** 트리거 콜백 */
  onFire: () => void;
  /** 비활성화 플래그 */
  enabled?: boolean;
}

export const useDeadlineTrigger = ({
  at,
  onFire,
  enabled = true,
}: IDeadlineOpts) => {
  const firedRef = useRef(false);

  // 의존성 키: 입력이 Dayjs/Date/number/string 무엇이든 ms 타임스탬프로 통일
  const depKey = dayjs.isDayjs(at) ? at.valueOf() : dayjs(at).valueOf();

  useEffect(() => {
    if (!enabled) return;
    if (firedRef.current) return;

    const target = dayjs.isDayjs(at) ? at : dayjs(at);
    if (!target.isValid()) return; // 잘못된 입력 보호

    const delay = Math.max(0, target.valueOf() - Date.now());
    const t = window.setTimeout(() => {
      if (!firedRef.current) {
        firedRef.current = true;
        onFire();
      }
    }, delay);

    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, onFire, depKey]);
};
