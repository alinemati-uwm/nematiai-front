"use client";

import { useEffect, type RefObject } from "react";

/**
 * This is a custom hook for handle outside click
 *
 * */
export default function useOutsideClick<T extends HTMLElement>(
  ref: RefObject<T | undefined | null>,
  isMobile: boolean = false,
  callback: (val: boolean) => void,
): void {
  // This hook is used to handle outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (isMobile) {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          callback(false);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback, isMobile]);
}
