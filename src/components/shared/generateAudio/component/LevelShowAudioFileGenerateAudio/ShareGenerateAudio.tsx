import React, {
  useEffect,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

import * as PopoverPrimitive from "@radix-ui/react-popover";
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

import { Popover, PopoverTrigger } from "@/components/plate-ui/popover";

export default function ShareGenerateAudio({
  audioSrc,
  children,
}: {
  audioSrc: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const style: CSSProperties = {
    width: "26px",
    height: "26px",
    borderRadius: "4px",
  };
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

  useEffect(() => {
    return () => {
      setOpen(false);
    };
  }, []);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      {/*delete popover button to open popover*/}
      <PopoverTrigger>{children}</PopoverTrigger>

      <PopoverPrimitive.Content
        side="top"
        className="z-[20] flex-col select-none"
        collisionPadding={15}
      >
        <div className="flex flex-row items-center rounded-md shadow-lg whitespace-nowrap t p-2 gap-3 bg-white ">
          {social.map((el, key) => (
            <el.tag key={key} url={audioSrc}>
              {el.icon}
            </el.tag>
          ))}
        </div>
      </PopoverPrimitive.Content>
    </Popover>
  );
}
