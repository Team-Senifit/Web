export type GTM_EVENT_TYPE =
  | "click_classStart"
  | "class_Start"
  | "class_Progress"
  | "click_classStop"
  | "class_Finish"
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

export const getGtmClassType = (type: unknown) => {
  if (type === "customized") return "맞춤형";
  if (type === "popular") return "인기";
  if (Array.isArray(type) && type[0] === "thematic") return "주제별";
  return undefined;
};

export const getGtmClassTypeFromRoutineKind = (routineKind?: string) => {
  switch (routineKind) {
    case "workout_programs_selections_byPopular":
      return "인기";
    case "workout_programs_selections_byPersonal":
      return "맞춤형";
    case "workout_programs_selections_byTarget":
      return "주제별";
    default:
      return undefined;
  }
};
