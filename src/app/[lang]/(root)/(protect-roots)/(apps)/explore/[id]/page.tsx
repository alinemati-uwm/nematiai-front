import React from "react";

import ExploreArticle from "@/components/pages/explore/id";

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <ExploreArticle id={id} />;
}

export default Page;
