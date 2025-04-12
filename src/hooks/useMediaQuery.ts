import { useEffect, useState } from "react";

/**
 * A custom hook that checks if a media query matches the current viewport width.
 *
 * @param {string} query - The media query string.
 * @returns boolean - Returns true if the media query matches the current viewport width, false otherwise.
 *
 * @example
 * // Check if the viewport width is less than or equal to 1024px
 * const isMobile = useMediaQuery("(max-width:1024px)");
 *
 * @example
 * // Check if the viewport width is greater than or equal to 768px
 * const isDesktop = useMediaQuery("(min-width:768px)");
 */
function useMediaQuery(query: string) {
  const [isMatch, setIsMatch] = useState(false);

  useEffect(() => {
    const checkMatch = () => {
      setIsMatch(window.matchMedia(query).matches);
    };

    // Check on mount
    checkMatch();

    // Check on resize
    window.addEventListener("resize", checkMatch);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", checkMatch);
    };
  }, [query]);

  return isMatch;
}

export default useMediaQuery;
