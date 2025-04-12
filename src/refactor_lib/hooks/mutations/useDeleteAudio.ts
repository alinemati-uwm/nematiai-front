import { useMutation } from "@tanstack/react-query";

import { AudioAPI } from "@/refactor_lib/services/api/v1/Audio";
import { type GenerateAudioRequest } from "@/refactor_lib/types/api/v1/GenerateAudio";

const useDeleteAudio = () => {
  return useMutation({
    mutationFn: ({
      history_uuid,
      history_version_uuid,
    }: GenerateAudioRequest["deleteAudio"]) => {
      return AudioAPI.deleteAudio({
        history_uuid,
        history_version_uuid,
      });
    },
  });
};

export default useDeleteAudio;
