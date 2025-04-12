import { type podcastLength } from "@/refactor_lib/types/api/v1/GenerateAudio";

type length = {
  id: podcastLength;
  value: string;
};

const duration: length[] = [
  {
    value: "Short(1-2 Min)",
    id: "short",
  },
  {
    value: "Medium(3-5 Min)",
    id: "medium",
  },
  {
    value: "Long(6-10 Min)",
    id: "long",
  },
];

const podcastGenerateModel = { duration };

export default podcastGenerateModel;
