import { useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { useParams, useSearchParams } from "next/navigation";

import historyAPI from "@/refactor_lib/services/api/v1/HistoryAPI";

import type podcastSingleType from "./type";

function usePodcastSingle() {
  const [states, setStates] = useState<podcastSingleType["context"]["states"]>({
    file: {
      duration: 0,
    },
  }); // Initialize state with default values
  const { id } = useParams(); // Get id from URL parameters
  const searchParams = useSearchParams(); // Get search params from the URL
  const uuid = searchParams.get("uuid"); // Extract "uuid" from search params

  const query = useMutation({
    mutationFn: () =>
      historyAPI.getDetails({ uuid: id as string, appName: "podcast" }), // API call to get podcast details
    retry: 3, // Retry 3 times on failure
    retryDelay: 3000, // Delay between retries (3000ms)
  });

  // Function to update state by key and value
  const updateState = <T extends keyof typeof states>(
    key: T,
    value: (typeof states)[T],
  ) => setStates(prev => ({ ...prev, [key]: value }));

  return { query, states, updateState, id, uuid }; // Return all relevant values
}

export default usePodcastSingle;
