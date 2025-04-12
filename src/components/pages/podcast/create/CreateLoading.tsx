import React, { useContext, useEffect } from "react";

import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import Lottie from "react-lottie";

import useAppHistory from "@/components/shared/HistoryRefactor/useAppHistory";
import AppTypo from "@/components/ui/AppTypo";
import animationData from "@/assets/animations/podcast.json";
import useToaster from "@/refactor_lib/hooks/shared/useToaster";
import { podcastAPI } from "@/refactor_lib/services/api/v1/Audio";

import PodcastCreateContext from "./context";

function PodcastGenerating() {
  const router = useRouter(); // Hook to access router for navigation
  const { lang } = useParams();
  const { toaster } = useToaster();
  const {
    query: { refetch },
  } = useAppHistory({ type: "podcast" }); // Custom hook to access app history
  const {
    methods: { updateState }, // Method to update the state
    states: {
      params: { file, language, prompt, voice, length },
      tab, // Tab state for determining input type (text or file)
    },
  } = useContext(PodcastCreateContext);
  const { mutate } = useMutation({
    mutationFn: podcastAPI.generatePodcast,
    onError: (error: any) => {
      const message = error?.response?.data?.detail ?? error;
      toaster({
        toastProps: {
          type: "error",
          message:
            typeof message === "string" ? message : (error as Error).message, // Display error message
        },
      });

      updateState("processing", false); // Update state to stop processing on error
    },
    onSuccess: res => {
      // Success handler for mutation
      refetch(); // Refetch data after successful podcast generation
      router.push(`/${lang}/podcast/${res.data.uuid}`); // Navigate to the newly generated podcast page
    },
  });

  useEffect(() => {
    mutate({
      dataPodcast: {
        langauge: language,
        length,
        voice,
        ...(tab === "long_text" && { text: prompt }),
      },
      ...(file && tab === "pdf_doc" && file), // Attach file if tab is "file"
    });
  }, []);

  return (
    <div className="flex flex-col w-full text-center gap-y-4">
      <div className="w-[200px] h-[100px] m-auto">
        <Lottie
          isPaused={false}
          isStopped={false}
          width="100%"
          height="auto"
          style={{ marginTop: "-60px" }}
          options={{ animationData, autoplay: true, loop: true }}
        />
      </div>
      <AppTypo variant="headingXS">Generate podcast ...</AppTypo>
      <AppTypo className="mt-1">
        It takes about 5 to 10 minutes.Your results will be ready shortly!
      </AppTypo>
    </div>
  );
}

export default PodcastGenerating;
