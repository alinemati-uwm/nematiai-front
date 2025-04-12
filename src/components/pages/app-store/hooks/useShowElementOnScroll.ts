"use client";

import { useEffect, useRef } from "react";

import { checkWindowValidity } from "@/lib/auth/auth-storage";

/**
 * get an element id and show and hide target element by pass ref when match target scroll height
 * @param scrollableId id of element that scroll
 * @param scrollHeight on what scroll top show element
 */
function useShowElementOnScroll(
  scrollableId: string,
  scrollHeight: number = 100,
) {
  const elementRef = useRef<HTMLDivElement>(null); //will be passed to target element

  useEffect(() => {
    const main = document.getElementById(scrollableId);

    //show element when scroll top is grater that scrollHeight passed
    //and hide it again when is smaller
    const handleScroll = () => {
      if (main!.scrollTop > scrollHeight) {
        //use opacity instead of hidden class for transition animation
        elementRef.current?.classList.remove("opacity-0");
        elementRef.current?.classList.add("opacity-100");
      } else {
        elementRef.current?.classList.remove("opacity-100");
        elementRef.current?.classList.add("opacity-0");
      }
    };

    if (checkWindowValidity()) {
      main!.addEventListener("scroll", handleScroll);
    }

    return () => {
      main!.removeEventListener("scroll", handleScroll);
    };
  }, [scrollHeight, scrollableId]);

  return elementRef;
}

export default useShowElementOnScroll;
