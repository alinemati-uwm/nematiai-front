import React, { useContext, useState, type CSSProperties } from "react";

import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

import { GalleryAiImageContext } from "../../../context";
import GalleryIcon from "../container/GalleryIcon";

function ShareGallery() {
  // State to control the visibility of the popup
  const [Popup, setPopup] = useState(false);

  // Access the current 'mainImage' from the galleryAiImageContext
  const { mainImage } = useContext(GalleryAiImageContext);

  // Define a consistent style for the social media icons
  const style: CSSProperties = {
    width: "36px",
    height: "36px",
    borderRadius: "4px",
  };

  // Define the social media buttons and their associated share icons
  const social = [
    {
      tag: WhatsappShareButton,
      icon: <WhatsappIcon style={style} />,
    },
    {
      tag: TelegramShareButton,
      icon: <TelegramIcon style={style} />,
    },
    {
      tag: LinkedinShareButton,
      icon: <LinkedinIcon style={style} />,
    },
    {
      tag: FacebookShareButton,
      icon: <FacebookIcon style={style} />,
    },
  ];

  return (
    <div>
      {/* Render GalleryIcon and pass the popup content and visibility */}
      <GalleryIcon
        title="Share" // Title for the share button
        icon="mdi:share-variant-outline" // Share icon for the button
        popup={{
          content: (
            // Render a list of social media share buttons inside the popup
            <div className="flex row-auto gap-x-2">
              {social.map((el, key) => (
                <el.tag key={key} url={mainImage}>
                  {el.icon}{" "}
                  {/* Render the social media icon inside the button */}
                </el.tag>
              ))}
            </div>
          ),
          show: Popup, // Pass the current visibility state of the popup
          trigger: value => setPopup(value), // Function to toggle the popup visibility
          props: { style: { padding: "8px 10px" } }, // Additional styling for the popup
        }}
      />
    </div>
  );
}

export default ShareGallery;
