const CHANNEL = "class-status";
const STORAGE_KEY = "__bc_class-status";

export type ClassDonePayload = {
  type: "CLASS_DONE";
  id: string;
  programId?: string | number;
  seconds?: number;
  at?: number;
};

export function createBroadcastListener(onMessage: (data: unknown) => void) {
  const bc = new BroadcastChannel(CHANNEL);
  const onBc = (e: MessageEvent) => {
    onMessage((e as MessageEvent).data);
  };
  bc.addEventListener("message", onBc);

  const onStorage = (e: StorageEvent) => {
    if (e.key !== STORAGE_KEY || !e.newValue) return;
    try {
      const parsed = JSON.parse(e.newValue);
      onMessage(parsed);
    } catch {
      // ignore parse errors
    }
  };
  window.addEventListener("storage", onStorage);

  return () => {
    bc.removeEventListener("message", onBc);
    bc.close();
    window.removeEventListener("storage", onStorage);
  };
}

export function notifyClassDone(payload: {
  programId?: string | number;
  seconds?: number;
  id?: string;
}) {
  const globalCrypto =
    typeof crypto !== "undefined"
      ? (crypto as unknown as { randomUUID?: () => string })
      : undefined;
  const id =
    payload.id ??
    (globalCrypto?.randomUUID ? globalCrypto.randomUUID() : String(Date.now()));

  const data: ClassDonePayload = {
    type: "CLASS_DONE",
    id,
    programId: payload.programId,
    seconds: payload.seconds,
    at: Date.now(),
  };

  try {
    const bc = new BroadcastChannel(CHANNEL);
    bc.postMessage(data);
    bc.close();
  } catch {
    // ignore
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }

  return data;
}

export function notifyLogout() {
  try {
    const bc = new BroadcastChannel(CHANNEL);
    bc.postMessage({ type: "LOGOUT" });
    bc.close();
  } catch {
    // ignore
  }

  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ type: "LOGOUT", at: Date.now() }),
    );
  } catch {
    // ignore
  }
}
