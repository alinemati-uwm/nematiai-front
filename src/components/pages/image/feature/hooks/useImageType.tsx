import { useEffect, useState } from "react";

const useImageType = (
  src: string, // Image source URL as a parameter
): { width: number; height: number } | null => {
  // Initialize state to store the image dimensions or null if not available
  const [imageType, setImageType] = useState<{
    width: number;
    height: number;
  } | null>(null);

  // useEffect to load the image and extract its dimensions
  useEffect(() => {
    // Create a new image element
    const img = new Image();
    img.src = src; // Set the image source

    // Once the image is loaded, set the dimensions in the state
    img.onload = () => {
      setImageType({ width: img.width, height: img.height });
    };
  }, [src]); // Re-run the effect whenever the image source changes

  // Return the image dimensions or null if the image hasn't loaded yet
  return imageType;
};

export default useImageType;
