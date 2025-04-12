"use client";

import type React from "react";
import { useEffect, useState } from "react";

interface IntersectionObserverArgs {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
}

/**
/**
 * Custom hook to observe the intersection of a target element with an ancestor element or with a top-level document's viewport.
 *
 * @param {React.RefObject<HTMLElement>} elementRef - The reference to the target element to be observed.
 * @param {IntersectionObserverArgs} args - The arguments for configuring the IntersectionObserver.
 * @returns {{ isIntersecting: boolean; loaded: boolean }} - An object containing the intersection state and a loaded state.
 *
 * @example
 * // Usage of useIntersectionObserver hook
 * const elementRef = useRef(null);
 * const { isIntersecting, loaded } = useIntersectionObserver(elementRef, { threshold: 0.5 });
 */
const useIntersectionObserver = (
  elementRef: React.RefObject<HTMLElement | null>,
  { threshold = 0.1, root = null, rootMargin = "0%" }: IntersectionObserverArgs,
): { isIntersecting: boolean; loaded: boolean } => {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);
  const [loaded, setLoaded] = useState(false);

  // Set the loaded state to true when the element is intersecting
  useEffect(() => {
    isIntersecting && setLoaded(true);
  }, [isIntersecting]);

  useEffect(() => {
    // Create a new IntersectionObserver
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold,
        root,
        rootMargin,
      },
    );

    // Observe the target element
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    // Cleanup the observer
    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [elementRef, threshold, root, rootMargin]);

  return { isIntersecting, loaded };
};

export default useIntersectionObserver;
