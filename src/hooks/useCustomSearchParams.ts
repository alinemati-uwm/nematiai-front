"use client";

import { useCallback, useEffect, useMemo } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

/**
 * Custom hook to manage URL search parameters.
 *
 * This hook provides functionality to get and set URL search parameters,
 * with optional initial key and value settings.
 *
 * @param {string} [initialKey] - The initial key to set in the search parameters.
 * @param {string} [initialValue] - The initial value to set for the initial key.
 * @returns [URLSearchParams, function] - An array containing the current search parameters and a function to set search parameters.
 *
 * @example
 * const [searchParams, setSearchParams] = useCustomSearchParams('key', 'value');
 * setSearchParams('newKey', 'newValue');
 */
export function useCustomSearchParams(
  initialKey?: string,
  initialValue?: string,
) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  const current = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams],
  );

  const setSearchParams = useCallback(
    (key: string, value?: string, replace: boolean = true) => {
      const currentValue = current.get(key);

      if (currentValue === value) {
        return;
      }

      if (!value) {
        current.delete(key);
      } else {
        current.set(key, value);
      }

      const search = current.toString();
      const query = search ? `?${search}` : "";

      if (replace) {
        router.replace(`${pathname}${query}`);
      } else {
        router.push(`${pathname}${query}`);
      }
    },
    [current, pathname, router],
  );

  useEffect(() => {
    if (!initialKey) return;
    if (!initialValue) {
      setSearchParams(initialKey);
    } else {
      setSearchParams(initialKey, initialValue);
    }
  }, [initialValue, initialKey, setSearchParams]);

  return [searchParams, setSearchParams] as const;
}
