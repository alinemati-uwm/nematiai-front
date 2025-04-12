"use client";

import React from "react";

import dynamic from "next/dynamic";

import GeneratorsPagesSkeleton from "@/components/shared/skeleton/GeneratorsPagesSkeleton";

const ImageFeatures = dynamic(
  () => import("@/components/pages/image/feature"),
  {
    loading: () => <GeneratorsPagesSkeleton />,
  },
);

function Page() {
  return <ImageFeatures />;
}

export default Page;
