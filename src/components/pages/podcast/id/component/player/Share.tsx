import React, { useContext, useRef, useState, type CSSProperties } from "react";

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

import AppIcon from "@/components/shared/AppIcon";
import useOutsideClick from "@/hooks/useOutSideClick";
import { useGetDictionary } from "@/hooks";

import PodcastSingleContext from "../../context";

function PodcastShare() {
  // Accessing the podcast data from context
  const { data } = useContext(PodcastSingleContext);
  const ref = useRef(null); // Ref to detect clicks outside of the share menu
  const [toggle, setToggle] = useState(false); // State to toggle the visibility of share menu

  const {
    components: {
      generateAudio: { share },
    },
  } = useGetDictionary();

  // Handle clicks outside the share menu to close it
  useOutsideClick(ref, true, () => setToggle(false));

  // Style for the social media icons
  const style: CSSProperties = {
    width: "26px",
    height: "26px",
    borderRadius: "4px",
  };

  // Array of social media share buttons and their respective icons
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
    <div className="relative" ref={ref}>
      {/* Button to toggle the share menu */}
      <AppIcon
        onClick={() => setToggle(prev => !prev)}
        icon="material-symbols:share-outline"
        className="cursor-pointer"
        tooltip={share}
        width={20}
      />
      {/* Conditionally render the share menu if toggle is true */}
      {toggle && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-8 z-10 bg-white shadow-md rounded-md p-3">
          {/* Social media share buttons */}
          <div className="flex row-auto gap-x-3">
            {social.map((el, key) => (
              <el.tag key={key} url={data.podcast ?? ""}>
                {el.icon}
              </el.tag>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PodcastShare;
