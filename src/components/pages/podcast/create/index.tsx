"use client";

import React, { useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import AppLayout from "@/components/layout/AppLayout";
import podcastGenerateModel from "@/components/pages/podcast/create/form/model";
import { SetSearchParamProvider } from "@/components/shared";
import { useGetDictionary } from "@/hooks";

import PodcastCreateContext from "./context";
import PodcastGenerating from "./CreateLoading";
import PodcastFormCreate from "./form";
import type podcastCreateTypes from "./type";

function PodcastCreate() {
  // Import necessary components and hooks
  const {
    components: {
      menu: { podcast },
    },
  } = useGetDictionary();

  const searchParams = useSearchParams();
  const router = useRouter();

  // Define initial states for podcast creation
  const [states, setStates] = useState<podcastCreateTypes["states"]>({
    params: {
      file: null,
      language: "",
      length: podcastGenerateModel.duration[1].id,
      prompt: "",
      voice: [],
    },
    processing: false,
    tab: "long_text", // Default tab for the podcast creation form
  });

  // Function to update the state for a given key
  const updateState = <T extends keyof typeof states>(
    key: T,
    value: (typeof states)[T],
  ) => setStates(prev => ({ ...prev, [key]: value }));

  // Redirect to podcast page if uuid parameter is found in search params
  useEffect(() => {
    const uuid = searchParams.get("uuid"); // Extract uuid from URL
    if (uuid) router.push(`podcast/${uuid}`); // Redirect to podcast page
  }, [searchParams]);

  return (
    <AppLayout>
      <AppLayout.side /> {/* Render the sidebar */}
      <AppLayout.body>
        <AppLayout.header
          history={{ type: "podcast" }}
          title={podcast}
          upgrade
          profile
        />
        <AppLayout.main>
          <SetSearchParamProvider appName="app" appSearchParamValue="podcast">
            <PodcastCreateContext
              value={{ methods: { updateState }, states }} // Provide context for the podcast creation
            >
              {states.processing ? ( // Show generating state if in processing
                <PodcastGenerating />
              ) : (
                // Otherwise show the podcast creation form
                <div className="flex w-full justify-center items-center min-h-full bg-holder-lighter text-center">
                  <PodcastFormCreate />
                </div>
              )}
            </PodcastCreateContext>
          </SetSearchParamProvider>
        </AppLayout.main>
      </AppLayout.body>
    </AppLayout>
  );
}

export default PodcastCreate;
