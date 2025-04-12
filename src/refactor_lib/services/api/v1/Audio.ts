import {
  type GenerateAudioRequest,
  type GenerateAudioResponse,
} from "@/refactor_lib/types/api/v1/GenerateAudio";

import { axiosClientV1 } from ".";

export const AudioAPI = {
  basePath: "/audio",
  generateTextToSpeech: ({
    dataVoic,
    signal,
  }: GenerateAudioRequest["generateTextToSpeech"]) =>
    axiosClientV1.post<GenerateAudioResponse["generateTextToSpeech"]>(
      `${AudioAPI.basePath}/open_ai_generate_text_to_speech/`,
      dataVoic,
    ),
  deleteAudio: ({
    history_uuid,
    history_version_uuid,
  }: GenerateAudioRequest["deleteAudio"]) =>
    axiosClientV1.delete<GenerateAudioResponse["deleteAudio"]>(
      `${AudioAPI.basePath}/answer/?history_uuid=${history_uuid}${history_version_uuid ? "&history_version_uuid=" + history_version_uuid : ""}`,
    ),
};

export const podcastAPI = {
  basePath: "/podcast",
  generatePodcast: ({
    dataPodcast,
  }: GenerateAudioRequest["generateTextToSpeech"]) => {
    const fd = new FormData();
    fd.append("generate_data", JSON.stringify(dataPodcast));
    return axiosClientV1.post<GenerateAudioResponse["generatePodcast"]>(
      `${podcastAPI.basePath}/generate_podcast/`,
      fd,
    );
  },
};
