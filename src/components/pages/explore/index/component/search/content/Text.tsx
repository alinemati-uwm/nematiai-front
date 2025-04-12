import React from "react";

import AppTypo from "@/components/ui/AppTypo";

function ExploreContentText() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, key) => (
        <div key={key} className="flex flex-col gap-y-3">
          <AppTypo variant="headingM">Iran</AppTypo>
          <AppTypo>
            Autism spectrum disorder (ASD) is a developmental disability that
            can cause significant social, communication and behavioral
            challenges. CDC is committed to continuing to provide essential data
            on ASD and develop resources that help identify children with ASD as
            early as possible.
          </AppTypo>
        </div>
      ))}
    </>
  );
}

export default ExploreContentText;
