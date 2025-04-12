interface Highlight {
  prompts: string[];
  messages: HighlightMessage;
  image: string;
  timeLine: string;
  name: string;
  role: string;
}

type HighlightMessage = {
  instagram: string[];
  tiktok: string[];
  linkedin: string[];
  youtube: string[];
  telegram: string[];
  whatsapp: string[];
  facebook: string[];
  meta: string[];
  summary: string[];
};

type HighlightType =
  | "facebook"
  | "youtube"
  | "linkedin"
  | "telegram"
  | "whatsapp"
  | "instagram"
  | "tiktok"
  | "meta"
  | "summary";

interface HighlightAction {
  setSelectedMessageForHighlight(v: string): void;

  setGeneratedHighlight(index: number, v: Partial<HighlightMessage>): void;

  setHighlightIsOpen(isOpen: boolean): void;
}

interface HighlightState {
  isHighlightOpen: boolean;
  messages: HighlightMessage;
  name: string;
  role: string;
  prompts: string[];
  image: string;
  timeLine: string;
}
