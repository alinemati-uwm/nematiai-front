interface History {
  answers: Answer[];
}

interface Answer {
  id: number;
  answer_text: string;
  uuid: string;
  app_type: string;
  created_at: string;
  updated_at: string;
  urls: string[];
  versions: Version[];
}

interface HistoryVersion {
  answer: Answer;
  versions: Version[];
}
interface getPdfs {
  id: number;
  file: string;
  title: string;
}

interface Version {
  id: number;
  answer_text: string;
  created_at: string;
  updated_at: string;
  uuid: string;
  podcast: string;
  audio: string;
}
