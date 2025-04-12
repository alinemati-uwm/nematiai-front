"use client";

import React from "react";

import AppLayout from "@/components/layout/AppLayout";
import { useGetDictionary } from "@/hooks";

import MainImageHead from "./components/Head";
import MainImageTemplates from "./components/templates";
import MainImageTools from "./components/tools/Tools";

function MainImagePage() {
  // Fetch the 'ai_image' label from the dictionary (for header text)
  const {
    components: {
      apps_header: { ai_image }, // Destructure ai_image from the dictionary
    },
  } = useGetDictionary();

  return (
    <AppLayout>
      {/* Render side layout */}
      <AppLayout.side />
      <AppLayout.body>
        {/* Set the header with title 'ai_image' */}
        <AppLayout.header title={ai_image} />
        <AppLayout.main>
          {/* Main content container */}
          <div className="flex flex-col gap-y-7">
            {/* Render components in a column */}
            <MainImageHead />
            <MainImageTools />
            <MainImageTemplates />
          </div>
        </AppLayout.main>
      </AppLayout.body>
    </AppLayout>
  );
}

export default MainImagePage;
