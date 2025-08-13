import { useState, useEffect } from 'react';

// This hook debounces a value by a specified delay
export function useDebounce<T>(value: T, delay: number): T {
  // State to store the "debounced" value
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set up a timer to update the value after the 'delay'
    const handler = setTimeout(() => {
      setDebouncedValue(value); 
    }, delay);

    // Clear the timer if the value changes (e.g., the user keeps typing)
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Only re-run if the value or delay changes

  return debouncedValue;
}