export type GTM_EVENT_TYPE =
  | "click_classStart"
  | "click_Start"
  | "click_Progress"
  | "click_classStop"
  | "click_Finish"
  | "record_Finish"
  | "login_Success"
  | "customized_optionError";

interface GtmPayload {
  event: GTM_EVENT_TYPE;
  classType?: string;
}

declare global {
  interface Window {
    dataLayer: GtmPayload[];
  }
}

/**
 * GTM dataLayer에 이벤트를 전송합니다.
 * @param event 이벤트 명칭
 * @param classType 클래스 유형 ("맞춤형", "인기", "주제별")
 */
export const pushGtmEvent = (event: GTM_EVENT_TYPE, classType?: string) => {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];

  const payload: GtmPayload = { event };
  if (classType) {
    payload.classType = classType;
  }

  window.dataLayer.push(payload);
};
