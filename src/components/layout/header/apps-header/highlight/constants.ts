import {
  FacebookShareButton,
  TelegramShareButton,
  ThreadsShareButton,
  TwitterShareButton,
} from "react-share";

import type {
  HighlightItemsType,
  SocialButtonsType,
} from "@/components/layout/header/apps-header/highlight/types";

export const highlightData: HighlightItemsType[] = [
  {
    name: "Facebook",
    image: "/images/highlightPic/facebook.svg",
    id: "418541fgdg",
  },
  {
    name: "Instagram",
    image: "/images/highlightPic/instagram.svg",
    id: "84872tdsg",
  },
  {
    name: "Telegram",
    image: "/images/highlightPic/telegram.svg",
    id: "415891rtijs",
  },
  {
    name: "Discord",
    image: "/images/highlightPic/discord.svg",
    id: "9841205sfs",
  },
  {
    name: "Twitch",
    image: "/images/highlightPic/twitch.svg",
    id: "4857d8edf",
  },
  {
    name: "TikTok",
    image: "/images/highlightPic/tiktok.svg",
    id: "6418psrft",
  },
  {
    name: "Threads",
    image: "/images/highlightPic/threads.svg",
    id: "148925lhjrf",
  },
  {
    name: "X",
    image: "/images/highlightPic/x.svg",
    id: "48125sdgfhf",
  },
  {
    name: "Summary",
    image: "/images/highlightPic/summary.svg",
    id: "9148wwd",
  },
];

export const social: SocialButtonsType = {
  facebook: {
    item: FacebookShareButton,
  },
  telegram: {
    item: TelegramShareButton,
  },
  x: {
    item: TwitterShareButton,
  },
  threads: {
    item: ThreadsShareButton,
  },
};
