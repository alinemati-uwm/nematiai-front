export interface UploadAPIRequest {
  convertPdfToText: {
    file: File;
  };
  convertUrlPdfToText: {
    url: string;
  };
  ocrExtractTextFromImage: {
    file: File;
  };
  savePdf: {
    file: File;
  };
  saveUrlPdf: {
    url: string;
  };
}

export interface UploadAPIResponse {
  convertPdfToText: {
    text: string;
  };
  savePdf: {
    id: number;
    path: string;
    title: string;
  };
  saveUrlPdf: {
    id: number;
    path: string;
    title: string;
  };
  getAllPdf: Array<{
    id: number;
    path: string;
    title: string;
  }>;
}
