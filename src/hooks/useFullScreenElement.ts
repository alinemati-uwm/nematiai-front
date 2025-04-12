"use client";

import type React from "react";
import { useEffect, useState } from "react";

/**
 * Custom hook to manage fullscreen mode for a given HTML element.
 *
 * This hook provides functions to enter, exit, and toggle fullscreen mode for a specified element,
 * and keeps track of whether the element is currently in fullscreen mode.
 *
 * @param {React.MutableRefObject<HTMLElement | null>} el - The reference to the target element to be made fullscreen.
 * @returns Object - An object containing the handleFullscreen function and the isActive state.
 *
 * @example
 * // Usage of useFullScreenElement hook
 * const elementRef = useRef(null);
 * const { handleFullscreen, isActive } = useFullScreenElement(elementRef);
 *
 * // Toggle fullscreen mode
 * handleFullscreen();
 */
export function useFullScreenElement(
  el: React.MutableRefObject<HTMLElement | null>,
) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    function handleIsActive() {
      if (document.fullscreenElement != null) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    }
    document.addEventListener("fullscreenchange", handleIsActive);

    return () => {
      document.removeEventListener("fullscreenchange", handleIsActive);
    };
  }, []);

  async function enterFullscreen() {
    const elem = el.current;
    if (!elem) return;

    if (elem.requestFullscreen) {
      await elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      // Firefox
      await elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      // Chrome, Safari, and Opera
      await elem.webkitRequestFullscreen();
    }
  }

  async function exitFullscreen() {
    if (document.exitFullscreen) {
      await document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      // Firefox
      await document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      // Chrome, Safari, and Opera
      await document.webkitExitFullscreen();
    }
  }

  // Toggle fullscreen mode
  async function handleFullscreen() {
    if (!document.fullscreenElement) {
      await enterFullscreen();
    } else {
      await exitFullscreen();
    }
  }

  return { handleFullscreen, isActive };
}
