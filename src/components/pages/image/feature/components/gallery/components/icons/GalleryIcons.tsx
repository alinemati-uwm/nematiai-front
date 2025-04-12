import React from "react";

import DownloadGallery from "./buttons/DownloadGallery";
import EditGallery from "./buttons/EditGallery";
import SendGallery from "./buttons/send/SendGallery";
import ShareGallery from "./buttons/ShareGallery";

function GalleryIcons() {
  return (
    <>
      {/* Uncomment the line below if SaveGallery should be rendered in the future */}
      {/* <SaveGallery /> */}

      {/* Render the EditGallery component with a specific width */}
      <div className="w-[30%]">
        <EditGallery />
      </div>

      {/* Render the DownloadGallery component */}
      <DownloadGallery />

      {/* Render the SendGallery component */}
      <SendGallery />

      {/* Render the ShareGallery component */}
      <ShareGallery />
    </>
  );
}

export default GalleryIcons;
