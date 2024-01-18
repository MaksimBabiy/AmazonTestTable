import { useEffect, useRef, useState } from "react";

export const useDecounce = <T>(value: T, delay: number) => {
  const [debounceValue, setDebounceValue] = useState<T>();

  const timeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    timeout.current = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(timeout.current);
    };
  }, [value, delay]);

  return debounceValue;
};
