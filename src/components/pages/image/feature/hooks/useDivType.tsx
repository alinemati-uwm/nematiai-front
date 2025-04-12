import { useEffect, useRef, useState } from "react";

const useDivType = (): [
  React.RefObject<HTMLDivElement | null>, // The reference to the div element
  { width: number; height: number } | null, // The current size of the div, or null if the size is not yet determined
] => {
  // State to store the current width and height of the div, initially set to null
  const [sizeDiv, setSizeDiv] = useState<{
    width: number;
    height: number;
  } | null>(null);

  // Create a reference to the div element using useRef
  const ref = useRef<HTMLDivElement>(null);

  // useEffect hook that updates the size of the div when the component is mounted or resized
  useEffect(() => {
    // Function to update the size of the div element
    const updateDivType = () => {
      // Check if the div reference is valid and accessible
      if (ref.current) {
        // Get the offsetWidth and offsetHeight of the div element
        const { offsetWidth: width, offsetHeight: height } = ref.current;
        // Update the state with the current width and height of the div
        setSizeDiv({ width, height });
      }
    };

    // Initial call to update the size when the component is first rendered
    updateDivType();

    // Add event listener to update the size whenever the window is resized
    window.addEventListener("resize", updateDivType);

    // Cleanup function to remove the resize event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", updateDivType);
    };
  }, []); // The effect runs only once, after the initial render (empty dependency array)

  // Return the ref to the div and the size of the div
  return [ref, sizeDiv];
};

export default useDivType;
