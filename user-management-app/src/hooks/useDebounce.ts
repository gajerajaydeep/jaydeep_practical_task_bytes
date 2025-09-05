import { useEffect, useState } from "react";

function useDebounce<T>(searchTerms: T, delay: number): T {

    // STATES
  const [debouncedValue, setDebouncedValue] = useState(searchTerms);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchTerms);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerms, delay]);

  return debouncedValue;
}

export default useDebounce;