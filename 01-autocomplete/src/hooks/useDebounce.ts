import { useEffect, useState } from "react";

export default function useDebounce(inputValue, delay: number = 300) {
  const [debouncedValue, setDebouncedValue] = useState(inputValue);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(inputValue), delay);

    return () => {
      clearTimeout(timer);
    };
  }, [inputValue, delay]);

  return debouncedValue;
}
