"use client";

import React, { useEffect } from "react";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import AppLayout from "@/components/layout/AppLayout";
import { SetSearchParamProvider } from "@/components/shared";
import AppIcon from "@/components/shared/AppIcon";
import { Button } from "@/components/ui/button";
import { useGetDictionary } from "@/hooks";

import PodcastArticle from "./component/Article";
import PodcastEmpty from "./component/Empty";
import LoadingPodcast from "./component/Loading";
import PodcastPlayer from "./component/player/Player";
import PodcastSingleContext from "./context";
import usePodcastSingle from "./usePodcastSingle";

function PodcastSingle() {
  // Access podcast single page data, states, and methods from custom hook
  const {
    query: { data, isPending, mutate }, // Query state for fetching podcast data
    states, // Local states
    updateState, // Method to update states
    uuid, // Unique identifier for the podcast
  } = usePodcastSingle();
  const {
    page: {
      podcast: { new_podcast },
    },
  } = useGetDictionary();
  // Access router for navigation
  const router = useRouter();
  const { lang } = useParams();

  // Fetch podcast data on component mount
  useEffect(() => {
    mutate();
  }, []);

  // Redirect to the podcast URL when UUID is available
  useEffect(() => {
    if (uuid) router.push(`${uuid}`);
  }, [uuid]);

  return (
    <AppLayout>
      <AppLayout.side /> {/* Render sidebar */}
      <AppLayout.body>
        <AppLayout.header
          history={{ type: "podcast" }}
          customComponent={
            <Link href={`/${lang}/podcast`}>
              <div className="flex flex-row items-center justify-center">
                <AppIcon icon="tabler:arrow-left" />
                <Button variant="ghost">{new_podcast}</Button>
              </div>
            </Link>
          }
          upgrade
          profile
        />{" "}
        {/* Render header */}
        <AppLayout.main className="!px-0">
          <SetSearchParamProvider appName="app" appSearchParamValue="podcast">
            <div className="h-full w-full">
              {isPending ? ( // Show loading state while data is being fetched
                <LoadingPodcast />
              ) : data?.data ? ( // Render podcast content if data is available
                <PodcastSingleContext
                  value={{ data: data.data, states, methods: { updateState } }} // Provide context to child components
                >
                  <div className="h-full flex flex-col">
                    <div className="h-full flex justify-center overflow-auto">
                      <div className="w-[800px] max-w-[95%] flex flex-col gap-y-6">
                        <PodcastArticle /> {/* Render podcast article */}
                      </div>
                    </div>
                    <div className="flex justify-center border-t bg-muted-light items-center">
                      <div className="w-[800px] max-w-[95%] relative px-4">
                        <PodcastPlayer /> {/* Render podcast player */}
                      </div>
                    </div>
                  </div>
                </PodcastSingleContext>
              ) : (
                // Show empty state if no data is available
                <PodcastEmpty />
              )}
            </div>
          </SetSearchParamProvider>
        </AppLayout.main>
      </AppLayout.body>
    </AppLayout>
  );
}

export default PodcastSingle;
