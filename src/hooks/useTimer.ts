import { useEffect, useState } from "react";

export const useTimer = () => {
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);
    return () => clearInterval(interval as NodeJS.Timeout);
  }, []);

  return { seconds };
};
