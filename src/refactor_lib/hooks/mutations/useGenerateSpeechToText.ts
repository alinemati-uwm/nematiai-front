import { useMutation } from "@tanstack/react-query";

import { AudioAPI, podcastAPI } from "@/refactor_lib/services/api/v1/Audio";
import { type GenerateAudioRequest } from "@/refactor_lib/types/api/v1/GenerateAudio";

const useGenerateSpeechToText = ({ type }: { type: "voice" | "podcast" }) => {
  return useMutation({
    mutationFn: ({
      dataVoic,
      dataPodcast,
      signal,
      file,
    }: GenerateAudioRequest["generateTextToSpeech"]) => {
      if (type === "voice")
        return AudioAPI.generateTextToSpeech({
          dataVoic,
          signal,
        });
      else {
        return podcastAPI.generatePodcast({
          dataPodcast,
          signal,
        });
      }
    },
  });
};

export default useGenerateSpeechToText;
