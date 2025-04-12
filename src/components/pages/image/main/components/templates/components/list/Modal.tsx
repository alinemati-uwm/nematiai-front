import React from "react";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Image from "next/image";

import AppIcon from "@/components/shared/AppIcon";
import AppTypo from "@/components/ui/AppTypo";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface props {
  open: boolean;
  closeModal(): void;
}
// Define TemplateListModal component that accepts closeModal and open as props
function TemplateListModal({ closeModal, open }: props) {
  return (
    // Dialog component to display the modal; open is passed as prop to control visibility
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent className="flex flex-col sm:flex-row gap-4 max-w-auto max-w-[95%] w-[1000px] p-5">
        <VisuallyHidden>
          <DialogTitle>templates</DialogTitle>
        </VisuallyHidden>
        {/* Image section */}
        <Image
          src="https://w.wallhaven.cc/full/qz/wallhaven-qz7my5.jpg"
          unoptimized
          width={1000}
          height={1000}
          className="sm:w-[60%] h-auto rounded"
          alt=""
        />
        {/* Content Section */}
        <div className="flex flex-col gap-3 justify-between">
          {/* Header and body content */}
          <div className="flex flex-col gap-y-4">
            {/* Title and close button */}
            <div className="flex flex-row justify-between items-center">
              <AppTypo variant="headingM">Title prompt summerize</AppTypo>
              {/* Close button with an icon */}
              <AppIcon
                icon="iconamoon:close-light"
                width={16}
                className="cursor-pointer"
                onClick={closeModal} // Close the modal when clicked
              />
            </div>
            {/* Description with buttons for copy and share */}
            <div className="flex flex-col gap-y-4 p-2 border rounded">
              <AppTypo>
                {/* Description text */}
                Office ipsum you must be muted. Donuts 4-blocker issues
                responsible submit functional idea pollination. Know put diarize
                pants must floor cob. Seat creep they relaxation eager switch
                innovation thats market. Solutions roll keywords decisions teams
                4-blocker t-shaped.
              </AppTypo>
              {/* Action buttons */}
              <div className="flex flex-row gap-x-2">
                <Button variant="outline">
                  <AppIcon icon="fluent:copy-16-regular" width={16}></AppIcon>
                  Copy
                </Button>
                <Button variant="outline">
                  <AppIcon icon="ic:baseline-link" width={16}></AppIcon>
                  Share Link
                </Button>
              </div>
            </div>
          </div>
          {/* Footer section with buttons to open editor or download */}
          <div className="flex flex-col gap-y-3">
            <Button>Open to Editor</Button>
            <Button variant="outline">Download</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default TemplateListModal;
