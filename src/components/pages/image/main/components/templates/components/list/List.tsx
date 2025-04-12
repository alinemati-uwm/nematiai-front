import React, { useState } from "react";

import Image from "next/image";

import AppTypo from "@/components/ui/AppTypo";

import TemplateListModal from "./Modal";

function ImageTemplates() {
  const [modal, setModal] = useState(false); // State to handle the modal visibility

  // Array containing image data (caption and image URL)
  const items = [
    {
      caption: "Neuer The Last of Us Staffel", // Image caption
      image:
        "https://www.gameswirtschaft.de/wp-content/uploads/2020/06/TheLastOfUsPart2-TLOU2-Tipps-Tricks.jpg", // Image URL
    },
    // Other items here ...
  ];

  return (
    <div className="relative w-full">
      {/* Heading that appears at the top, with "Coming soon" message */}
      <AppTypo
        className="absolute left-0 top-14 right-0 text-center italic"
        color="secondary"
        variant="headingM"
      >
        Coming soon
      </AppTypo>

      {/* Image grid layout */}
      <div className="columns-2 gap-2 md:columns-4 md:gap-4 lg:columns-5 lg:gap-5 opacity-10 pb-5 pointer-events-none">
        {/* Loop through each item in the items array */}
        {items.map((el, key) => (
          <div
            key={key} // Unique key for each item
            className="mb-5 rounded overflow-hidden relative cursor-pointer"
            onClick={() => setModal(true)} // Open the modal when clicked
          >
            {/* Image overlay with caption */}
            <div className="flex items-end p-5 opacity-0 hover:opacity-100 absolute left-0 top-0 right-0 bottom-0">
              {/* Dark gradient overlay */}
              <div className="bg-gradient-to-t from-black opacity-70 to-transparent absolute left-0 top-[10%] right-0 bottom-0"></div>
              {/* Display caption on top of the image */}
              <AppTypo className="text-white relative">{el.caption}</AppTypo>
            </div>

            {/* Image rendering */}
            <Image
              src={el.image} // Image source
              alt="" // Alt text for accessibility
              onError={
                e =>
                  (e.currentTarget.src =
                    "/images/image/image-not-found-scaled.jpg") // Fallback image on error
              }
              unoptimized // Disable image optimization (useful for external images)
              loading="lazy" // Lazy loading for images
              width={500} // Image width
              height={500} // Image height
              className="h-auto" // Automatically adjust height
            />
          </div>
        ))}
      </div>

      {/* Template list modal, controlled by `modal` state */}
      <TemplateListModal closeModal={() => setModal(false)} open={modal} />
    </div>
  );
}

export default ImageTemplates;
