import { useState, useEffect } from "react";

const useDebounce = <T>(value: T, delay?: number): T => {
  // State to store the debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set up a timer to update the debounced value after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function to clear the timeout if value or delay changes
    // This prevents memory leaks and ensures only the latest timeout runs
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Re-run effect when value or delay changes

  return debouncedValue;
};

export default useDebounce;
