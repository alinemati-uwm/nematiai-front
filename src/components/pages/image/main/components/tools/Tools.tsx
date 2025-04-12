import React from "react";

import Link from "next/link";

import AppTypo from "@/components/ui/AppTypo";
import { useGetDictionary } from "@/hooks";

import styles from "./style.module.css";

function MainImageTools() {
  // Fetch dictionary values for the various tools and labels related to image processing
  const {
    page: {
      image: {
        image_tools, // The title for the image tools section
        image_creation, // Label for image creation tool
        image_editor, // Label for image editor tool
        image_to_image_tab_label, // Label for image-to-image tool
        resizing, // Label for resizing tool
      },
    },
  } = useGetDictionary();

  // Define items for the image tools, each with a caption, image, and a URL for navigation
  const items = [
    {
      caption: image_editor,
      image: "712e362f395585f8443541e9448da68b.jpg",
      url: "image/editor",
    },
    {
      caption: image_creation,
      image: "a454e53c561db448ad97a84557e5595f.jpg",
      url: "image/text-to-image",
    },
    {
      caption: image_to_image_tab_label,
      image: "f9a8917b4b4cb196327466a4374f9d08.jpg",
      url: "image/image-to-image",
    },
    {
      caption: resizing,
      image: "c108a00adb7cb8fea970f18ab5f6ed6e.jpg",
      url: "image/image-upscale",
    },
  ];

  return (
    <div className="flex flex-col gap-y-5">
      {/* Section heading for the image tools */}
      <AppTypo variant="headingS">{image_tools}</AppTypo>

      {/* Grid layout for image tools */}
      <div className="grid grid-cols-2 gap-1 md:grid-cols-4 md:gap-4 min-h-[150px] h-[8vw]">
        {/* Loop through each tool item and display it */}
        {items.map((el, key) => {
          // Define background style for each tool item
          const style = {
            background: `url("/images/image/${el.image}") center no-repeat`, // Image as background
            backgroundSize: "cover", // Make sure the background image covers the container
          };

          return (
            <Link
              href={el.url} // Navigate to the URL when clicked
              key={key}
              className={`rounded flex items-end p-3 relative overflow-hidden ${styles.box}`} // Styling for the box
              style={style} // Apply background style
            >
              {/* Overlay effect */}
              <div
                className={`absolute left-0 top-0 right-0 bottom-0 transform scale-[1.3] transition-all opacity-0 ${styles.image}`}
                style={style}
              ></div>

              {/* Gradient overlay on top of the image */}
              <div className="bg-gradient-to-t from-black to-transparent opacity-70 absolute left-0 top-0 right-0 bottom-0"></div>

              {/* Caption displayed on the image */}
              <AppTypo variant="headingS" className="text-white relative">
                {el.caption} {/* Caption text */}
              </AppTypo>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default MainImageTools;
