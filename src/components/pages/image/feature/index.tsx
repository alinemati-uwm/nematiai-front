"use client";

import React, { useMemo, useReducer, type ReactNode } from "react";

import AppLayout from "@/components/layout/AppLayout";
import { SetSearchParamProvider } from "@/components/shared";

import ResultSection from "./components/ResultSection";
import FormAiImageSkeleton from "./components/skeletons/FormAiImageSkeleton";
import ImageToImage from "./components/tabs/components/ImageToImage";
import ImageUpscale from "./components/tabs/components/ImageUpscale";
import TextToImage from "./components/tabs/components/TextToImage";
import AiImagePageContext from "./context";
import useRouteAiImage from "./hooks/useRouteAiImage";
import UpdateHistoryAiImage from "./providers/UpdateHistoryAiImage";
import { aiImagePageStates, aiImageReducer } from "./reducer";
import { type imageTypes } from "./types";

export default function ImageFeatures() {
  // Initialize states using the reducer to manage the AI image page state
  const [states, dispatch] = useReducer(aiImageReducer, aiImagePageStates);
  // Retrieve the current feature from the route
  const { feature } = useRouteAiImage();

  // Function to update states for image URLs and associated data
  const updateStates = (imageUrls: any, data: any, state: any) => {
    // Dispatch an action to set the state value
    dispatch({
      type: "set_state",
      payload: { state, value: data },
    });
    // Dispatch another action to set the result (image URLs)
    dispatch({
      type: "set_result",
      payload: { state, value: imageUrls },
    });
  };

  // Memoized tab content for different AI image features (text-to-image, image-to-image, image upscaling)
  const tabContent = useMemo(
    (): Record<imageTypes, ReactNode> => ({
      text_to_image: (
        <TextToImage
          document_name={states.document_name}
          defaultValues={states.text_to_image}
          onSubmit={(imageUrls, data) =>
            updateStates(imageUrls, data, "text_to_image")
          }
        />
      ),
      image_to_image: (
        <ImageToImage
          document_name={states.document_name}
          defaultValues={states.image_to_image}
          sendImage={states.sendImage}
          onSubmit={(imageUrls, data) =>
            updateStates(imageUrls, data, "image_to_image")
          }
        />
      ),
      image_upscale: (
        <ImageUpscale
          document_name={states.document_name}
          defaultValues={states.image_upscale}
          sendImage={states.sendImage}
          onSubmit={(imageUrls, data) =>
            updateStates(imageUrls, data, "image_upscale")
          }
        />
      ),
    }),
    [states], // Recompute if the states change
  );

  return (
    <AiImagePageContext
      // Provide the current states and dispatch method to context
      value={{ methods: { dispatch }, states: { ...states } }}
    >
      <UpdateHistoryAiImage>
        <AppLayout>
          <AppLayout.side>
            <section className="w-full h-full relative flex flex-col">
              {/* Conditionally render content based on loading state */}
              {!states.loading ? (
                <>
                  {/* Display the corresponding tab content based on the current feature */}
                  <div className="w-full flex-grow bg-holder-lighter">
                    {tabContent[feature] || tabContent["text_to_image"]}
                  </div>
                </>
              ) : (
                <FormAiImageSkeleton /> // Display loading skeleton if data is loading
              )}
            </section>
          </AppLayout.side>
          <AppLayout.body>
            <AppLayout.header
              // Pass necessary props to header for profile, workspace, and upgrade options
              profile
              workspace
              upgrade
              history={{
                type: feature, // Pass the current feature for history
              }}
            ></AppLayout.header>
            <AppLayout.main bottomsheetHeight="small">
              {/* Context for setting search parameters and updating history */}
              <SetSearchParamProvider appName="app" appSearchParamValue="image">
                <UpdateHistoryAiImage>
                  {/* Display results section inside a flexible layout */}
                  <div className="flex flex-col h-full md:gap-x-6 gap-x-1">
                    <div className="w-full h-full bg-holder-lighter">
                      <ResultSection />
                    </div>
                  </div>
                </UpdateHistoryAiImage>
              </SetSearchParamProvider>
            </AppLayout.main>
          </AppLayout.body>
        </AppLayout>
      </UpdateHistoryAiImage>
    </AiImagePageContext>
  );
}
