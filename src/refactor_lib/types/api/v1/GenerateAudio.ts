export type podcastLength = "short" | "medium" | "long";

export interface GenerateAudioResponse {
  generateTextToSpeech: {
    audio_url: string;
  };
  deleteAudio: {
    data: any;
  };
  generatePodcast: {
    audio_url: string;
    uuid?: string;
  };
}

export interface GenerateAudioRequest {
  generateTextToSpeech: {
    dataPodcast?: {
      history_uuid?: string;
      history_version_uuid?: string | undefined;
      length: podcastLength;
      text?: string;
      voice: string[];
      langauge: string;
    };
    dataVoic?: {
      history_uuid: string;
      history_version_uuid?: string | undefined;
      app_type: AppsType;
      model: string;
      response_format: "wav";
      speed: 1;
      voice: string;
      text: string;
    };
    signal?: AbortSignal;
    file?: File;
  };
  deleteAudio: {
    history_uuid: string;
    history_version_uuid?: string | undefined;
  };
}
