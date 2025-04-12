export interface HistoryAPIRequest {
  updateAnswerByUUID: {
    answer_text: string;
  };
  addAnswerToFavorite: {
    answer_id: number;
  };
  addAnswerToPin: {
    answer_id: number;
  };
  getAllAnswers: {
    appName?: AppsType;
  };
  getDetails: {
    appName?: AppsType;
    uuid: string;
  };
}

export interface HistoryAPIResponse {
  getAllAnswers: {
    histories: Array<HistoryAPIResponse.histories>;
  };
  answers: {
    title?: string;
    id: number;
    answer_text: string;
    file_urls?: string;
    uuid: string;
    app_type: string;
    created_at: string;
    prompt: string;
    updated_at: string;
    urls: string[];
    pin: boolean;
    favorite: boolean;
    audio: string | null;
    podcast: string | null;
    model_generator: { id: number; icon: string; name: string };
    versions: Version[];
  };

  updateAnswerByUUID: {
    id: number;
    answer_text: string;
    uuid: string;
    app_type: string;
    created_at: Date;
    updated_at: Date;
    urls: string[];
    versions: Version[];
  };
  deleteAnswerByUUID: {
    message: string;
  };
  getAllFavoriteAnswers: Array<{
    id: number;
    answer_text: string;
    uuid: string;
    app_type: string;
    created_at: string;
    updated_at: string;
    urls: string[];
    versions: Array<{
      id: number;
      uuid: string;
      answer_text: string;
      created_at: string;
      updated_at: string;
    }>;
  }>;
  addAnswerToFavorite: {
    message: string;
  };
  getAllPinnedAnswers: Array<{
    id: 0;
    answer_text: string;
    uuid: string;
    app_type: string;
    created_at: string;
    updated_at: string;
    urls: string[];
    versions: Array<{
      id: 0;
      uuid: string;
      answer_text: string;
      created_at: string;
      updated_at: string;
    }>;
  }>;
  addAnswerToPin: {
    message: string;
  };
}
