import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import axiosClient from "@/services/axios-client";

type StopRespondingParams = {
  app_type: AppsType;
};

async function stopResponding(app_type: AppsType) {
  axiosClient.post<any, AxiosResponse, StopRespondingParams>(
    "/general/generate_stop/",
    { app_type },
  );
}

export function useStopResponding() {
  return useMutation({
    mutationFn: async (app_type: AppsType) => {
      try {
        return await stopResponding(app_type);
      } catch (error) {
        console.error("ُStop Error:", error);
      }
    },
    retry: 0,
    onError: error => {
      console.error("Error stopping response:", error);
    },
  });
}
