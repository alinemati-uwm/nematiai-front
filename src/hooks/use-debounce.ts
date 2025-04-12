import * as React from "react";

/**
 * Hook to debounce a value.
 *
 * @template T - The type of the value.
 * @param {T} value - The value to debounce.
 * @param {number} [delay=500] - The delay in milliseconds.
 * @returns {T} The debounced value.
 */
export const useDebounce = <T>(value: T, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler: NodeJS.Timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cancel the timeout if value changes (also on delay change or unmount)
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
