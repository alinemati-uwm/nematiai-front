import React from "react";

import { Button } from "@/components/plate-ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/plate-ui/dropdown-menu";
import { AppTooltip } from "@/components/shared/AppTooltip";

import AppIcon from "../../../shared/AppIcon";

interface IProps {
  handleDownloadPdf: () => void;
  handleDownloadDocx: () => void;
}

export function DownloadDropDown({
  handleDownloadDocx,
  handleDownloadPdf,
}: IProps) {
  return (
    <DropdownMenu>
      <AppTooltip title="Download" responseTab>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <AppIcon icon="ic:sharp-cloud-download" width={15} />
          </Button>
        </DropdownMenuTrigger>
      </AppTooltip>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleDownloadPdf}>
            Download Pdf
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDownloadDocx}>
            Download Docx
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
