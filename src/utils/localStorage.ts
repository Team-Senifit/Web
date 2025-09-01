/**
 * 데이터를 localStorage에 저장
 * @param key - 저장할 키
 * @param value - 저장할 값 (객체, 배열, 문자열, 숫자 등)
 * @returns 성공 여부
 */
export function setLocalStorage<T>(key: string, value: T): boolean {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
    return true;
  } catch (error) {
    console.error("localStorage 저장 실패:", error);
    return false;
  }
}

/**
 * localStorage에서 데이터를 가져옴
 * @param key - 가져올 키
 * @param defaultValue - 키가 없을 때 반환할 기본값
 * @returns 저장된 값 또는 기본값
 */
export function getLocalStorage<T>(key: string, defaultValue: T): T;
export function getLocalStorage<T>(key: string): T | null;
export function getLocalStorage<T>(key: string, defaultValue?: T): T | null {
  try {
    const item = localStorage.getItem(key);
    if (item === null) {
      return defaultValue ?? null;
    }
    return JSON.parse(item) as T;
  } catch (error) {
    console.error("localStorage 읽기 실패:", error);
    return defaultValue ?? null;
  }
}

/**
 * localStorage에서 특정 키를 삭제
 * @param key - 삭제할 키
 * @returns 성공 여부
 */
export function removeLocalStorage(key: string): boolean {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error("localStorage 삭제 실패:", error);
    return false;
  }
}

/**
 * localStorage 전체를 비움
 * @returns 성공 여부
 */
export function clearLocalStorage(): boolean {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error("localStorage 전체 삭제 실패:", error);
    return false;
  }
}

/**
 * localStorage에 특정 키가 존재하는지 확인
 * @param key - 확인할 키
 * @returns 존재 여부
 */
export function hasLocalStorage(key: string): boolean {
  return localStorage.getItem(key) !== null;
}

/**
 * localStorage의 모든 키를 가져옴
 * @returns 모든 키의 배열
 */
export function getLocalStorageKeys(): string[] {
  const keys: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key) {
      keys.push(key);
    }
  }
  return keys;
}

/**
 * localStorage의 크기(항목 개수)를 반환
 * @returns 저장된 항목의 개수
 */
export function getLocalStorageSize(): number {
  return localStorage.length;
}
