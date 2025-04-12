import React, { type CSSProperties } from "react";

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

function ExploreToolsShare({ url }: { url?: string }) {
  // CSS styles for the social media icons
  const style: CSSProperties = {
    width: "26px",
    height: "26px",
    borderRadius: "4px",
  };

  // Array of social media share buttons with their respective icons
  const social = [
    {
      tag: WhatsappShareButton, // Social media share button component
      icon: <WhatsappIcon style={style} />, // Icon for WhatsApp
    },
    {
      tag: TelegramShareButton,
      icon: <TelegramIcon style={style} />, // Icon for Telegram
    },
    {
      tag: LinkedinShareButton,
      icon: <LinkedinIcon style={style} />, // Icon for LinkedIn
    },
    {
      tag: FacebookShareButton,
      icon: <FacebookIcon style={style} />, // Icon for Facebook
    },
  ];

  return (
    // Container for social media share buttons with some padding and spacing
    <div className="flex flex-row gap-x-2 items-center pl-2 py-4">
      {/* Mapping over the social array and rendering each button with its icon */}
      {social.map((el, key) => (
        <el.tag key={key} url={url ?? ""}>
          {/* Render the corresponding icon inside each social share button */}
          {el.icon}
        </el.tag>
      ))}
    </div>
  );
}

export default ExploreToolsShare;
