import React, { useContext } from "react";

import Image from "next/image";

import { GalleryAiImageContext } from "../context";

type props = {
  onClick(image: string): void;
  images: string[];
};

function SidebarGallery({ onClick, images }: props) {
  // Access the main image from the galleryAiImageContext to apply the opacity effect for the selected image
  const { mainImage } = useContext(GalleryAiImageContext);

  return (
    <>
      {/* Check if there are images and if the array is not empty */}
      {images &&
        images.length > 0 &&
        images.map((el, key) => (
          // Render each image in a div with specific width, height, and rounded corners
          <div key={key} className="w-18 h-18 min-w-18 min-h-18 rounded">
            {/* Image component */}
            <Image
              // When the image is clicked, trigger the onClick function and pass the image URL
              onClick={() => onClick(el)}
              className="rounded object-cover"
              unoptimized
              src={el}
              alt={`Thumbnail ${key}`}
              width={72}
              height={72}
              style={{ opacity: mainImage === el ? 1 : 0.5 }}
            />
          </div>
        ))}
    </>
  );
}

export default SidebarGallery;
