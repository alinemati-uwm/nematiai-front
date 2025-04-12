"use client";

import React from "react";

import AppLayout from "@/components/layout/AppLayout";
import { SetSearchParamProvider } from "@/components/shared";
import { useGetDictionary } from "@/hooks";

import TemplateContent from "./components/content/TemplateContent";

function TemplatedPage() {
  const {
    components: {
      apps_header: { prompt_library },
    },
  } = useGetDictionary(); // Retrieves dictionary values, specifically extracting `prompt_library` from the apps header.

  return (
    <AppLayout>
      <AppLayout.side /> {/* Sidebar section of the layout */}
      <AppLayout.body>
        <AppLayout.header
          title={prompt_library} // Sets the header title dynamically from dictionary data
          history={{ type: "podcast" }} // Passes history state, possibly for navigation context
          upgrade
          profile
        />

        <AppLayout.main>
          {/* Provides search parameters context, likely for filtering templates */}
          <SetSearchParamProvider
            appName="app"
            appSearchParamValue="prompt_library"
          >
            <TemplateContent /> {/* Main content of the page */}
          </SetSearchParamProvider>
        </AppLayout.main>
      </AppLayout.body>
    </AppLayout>
  );
}

export default TemplatedPage;
