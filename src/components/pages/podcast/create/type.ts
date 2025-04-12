import { type podcastLength } from "@/refactor_lib/types/api/v1/GenerateAudio";

export type PodcastTab = "long_text" | "pdf_doc";

type podcastCreateTypes = {
  states: {
    params: {
      file: File | null;
      prompt: string;
      length: podcastLength;
      language: string;
      voice: string[];
    };
    tab: PodcastTab;
    processing: boolean;
  };
  context: {
    states: podcastCreateTypes["states"];
    methods: {
      updateState<T extends keyof podcastCreateTypes["states"]>(
        key: T,
        value: podcastCreateTypes["states"][T],
      ): void;
    };
  };
};

export default podcastCreateTypes;
