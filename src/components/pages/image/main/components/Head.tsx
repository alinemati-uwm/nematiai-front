import React from "react";

import Image from "next/image";

import AppTypo from "@/components/ui/AppTypo";
import { Button } from "@/components/ui/button";
import { useUiStore } from "@/stores/zustand/ui-store";
import { useGetDictionary } from "@/hooks";

function MainImageHead() {
  // Fetch dictionary values for image-related text and common actions (like update)
  const {
    page: {
      image: { occurred_Please_try_again_later, create_image_with_nerd }, // Image-related messages
    },
    common: { update }, // Common 'update' action text
  } = useGetDictionary();

  // Set actions for opening user panel and setting active menu
  const setIsOpen = useUiStore.use.setOpenUserPanelDialog();
  const setActiveMenu = useUiStore.use.setUserPanelActiveMenu();

  return (
    <div className='flex flex-col-reverse md:flex-row md:justify-between items-center px-6 bg-[url("/images/image/3a145c1db22c8f0f582b14aea721fe36.jpg")] bg-cover bg-center bg-no-repeat rounded relative overflow-hidden'>
      {/* Gradient overlay for better text readability on the image background */}
      <div className="bg-gradient-to-t from-gray-950 to-transparent absolute left-0 top-0 right-0 bottom-0"></div>

      {/* Text content section */}
      <div className="flex flex-col gap-y-1 md:gap-y-3 relative text-center md:text-justify pb-4 md:pb-0">
        {/* Main heading for the image section */}
        <AppTypo variant="headingM" className="text-white">
          {occurred_Please_try_again_later}
        </AppTypo>
        {/* Subheading for image creation message */}
        <AppTypo className="text-white">{create_image_with_nerd}</AppTypo>
        <div className="md:mt-3 flex justify-center md:justify-normal">
          {/* Update button */}
          <Button
            onClick={() => {
              setIsOpen(true); // Open the user panel
              setActiveMenu("upgrade"); // Set 'upgrade' as the active menu
            }}
            className="bg-background text-label-dark hover:text-label-lighter"
          >
            {update} {/* Button text */}
          </Button>
        </div>
      </div>

      {/* Image for visual content */}
      <Image
        src="/images/image/4b66ac0c23dc19f747d9682aa26285b5.png"
        alt="Image description"
        width={403}
        height={106}
        className="relative"
      />
    </div>
  );
}

export default MainImageHead;
