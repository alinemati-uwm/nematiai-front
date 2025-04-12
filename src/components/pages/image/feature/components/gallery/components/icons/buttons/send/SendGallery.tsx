import React, { useContext, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { GalleryAiImageContext } from "../../../../context";
import GalleryIcon from "../../container/GalleryIcon";

function SendGallery() {
  // State to manage loading state (currently unused but can be extended for future enhancements)
  const [States, setStates] = useState({
    loading: "",
  });

  // Router and language from the URL parameters
  const router = useRouter();
  const { lang } = useParams();

  // Access the current 'mainImage' from the galleryAiImageContext
  const { mainImage } = useContext(GalleryAiImageContext);

  // Handle the click event and navigate to the appropriate feature page with the mainImage as a query parameter
  const clickHandle = async ({ feature }: { feature: string }) => {
    // Use the router to navigate to a dynamic URL based on the feature and mainImage
    router.push(`/${lang}/image/${feature}?to=${mainImage}`);
  };

  // List of available features with captions and icons
  const list = [
    {
      caption: "To Image", // Caption for the first feature
      icon: "fluent:image-add-24-regular", // Icon for the first feature
      onClick: () => clickHandle({ feature: "image-to-image" }), // Navigate to 'image-to-image' feature
    },
    {
      caption: "Upscale", // Caption for the second feature
      icon: "mingcute:scale-line", // Icon for the second feature
      onClick: () => clickHandle({ feature: "image-upscale" }), // Navigate to 'image-upscale' feature
      key: "upscale", // Optional key for identifying this item
    },
  ];

  // Map through the list and render a GalleryIcon for each feature
  return list.map((el, key) => (
    <GalleryIcon
      key={key}
      title={el.caption}
      icon={el.icon}
      onClick={() => (!States.loading.length ? el.onClick() : {})}
    />
  ));
}

export default SendGallery;
