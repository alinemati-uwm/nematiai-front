import React, { useContext } from "react";

import { GalleryAiImageContext } from "../../../context";
import GalleryIcon from "../container/GalleryIcon";

function DownloadGallery() {
  // Access the current 'mainImage' from the galleryAiImageContext
  const { mainImage } = useContext(GalleryAiImageContext);

  // Handle the image opening when the download button is clicked
  const handleOpenImage = () => {
    // Get the URL of the main image
    const imageUrl = mainImage;
    // Open the image in a new browser tab
    window.open(imageUrl, "_blank");
  };

  return (
    // Render the GalleryIcon component with title "Download", an icon, and the onClick handler
    <GalleryIcon
      title="Download"
      icon="lucide:download"
      onClick={handleOpenImage} // Call handleOpenImage when clicked
    />
  );
}

export default DownloadGallery;
