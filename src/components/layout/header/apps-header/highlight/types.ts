import type {
  FacebookShareButton,
  TelegramShareButton,
  ThreadsShareButton,
  TwitterShareButton,
} from "react-share";

export type HighlightItemsType = {
  name: string;
  id: string;
  image: string;
};

export interface HighlightItemsTypeWithResponse extends HighlightItemsType {
  textResponse: string;
}

export interface HighlightResult extends HighlightItemsType {
  texts: string[];
  isStreaming: boolean;
}

export interface SocialButtonsType {
  facebook: {
    item: typeof FacebookShareButton;
  };
  telegram: {
    item: typeof TelegramShareButton;
  };
  x: {
    item: typeof TwitterShareButton;
  };
  threads: {
    item: typeof ThreadsShareButton;
  };
}
