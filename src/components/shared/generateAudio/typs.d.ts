export type typeTone = {
  value: string;
  name: string;
  image: string;
  selectedTone: string[];
  addToSelected: ({ value, type }: typeAddToSelected) => void;
};

export type typeAddToSelected = {
  value: string;
  type: "add" | "remove";
};

export type typeAudioPlayer = Pick<"name">;

export type Level = "start" | "showAudioFile";

export type typeOnChangeLevel = {
  level: Level;
  src?: string;
};

export type typeInfo = {
  timer?: string;
  isPlaying?: boolean;
  isGenerating?: boolean;
  isReady?: boolean;
  showDownloadIsSuccess?: boolean;
};
