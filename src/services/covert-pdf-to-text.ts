import { useState } from "react";

import { useMutation } from "@tanstack/react-query";
import axios, { type CancelTokenSource } from "axios";

import axiosClient from "@/services/axios-client";

type PDFConvertorResponse = {
  text: string;
};

export function useCovertPdfToText() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [index, setIndex] = useState<number | null>(null);
  const [cancelToken, setCancelToken] = useState<CancelTokenSource | null>(
    null,
  );

  const { mutate, data, ...rest } = useMutation({
    async mutationFn(pdf: File) {
      try {
        const formData = new FormData();
        formData.append("file", pdf);

        //create new refresh token
        const source = axios.CancelToken.source();
        setCancelToken(source);

        const response = await axiosClient.post<PDFConvertorResponse>(
          "/uploads/convert_pdf_to_text/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: progressEvent => {
              if (index === null) setIndex(0);
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total!,
              );
              setUploadProgress(percentCompleted);
            },
            cancelToken: source.token, // Pass the cancel token to the request
          },
        );

        return response.data.text;
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Request canceled", err.message);
        } else {
          console.log("Error happened in the upload", err);
          console.log("Error in upload index number", index);
        }
      }
    },

    onSettled: () => {
      setIndex(prev => (prev ? prev + 1 : 1));
      setUploadProgress(0);
    },
  });
  const cancel = () => {
    if (cancelToken) {
      cancelToken.cancel("Upload canceled by user");
      setIndex(prev => (prev ? prev + 1 : 1));

      setCancelToken(null); // Reset cancel token
    }
  };
  return {
    mutate,
    data,
    uploadProgress,
    setIndex,
    index,
    ...rest,
    cancel,
  };
}

export function useUploadUrl() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const { mutate, data, ...rest } = useMutation({
    async mutationFn(url: string) {
      try {
        const response = await axiosClient.post<PDFConvertorResponse>(
          "/uploads/convert_url_pdf_to_text/",
          { url },
          {
            onUploadProgress: progressEvent => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total!,
              );
              setUploadProgress(percentCompleted);
            },
          },
        );

        return response.data.text;
      } catch (err) {
        console.log("error happened in the upload url", err);
      }
    },
  });

  return {
    mutate,
    data,
    uploadProgress,

    ...rest,
  };
}
