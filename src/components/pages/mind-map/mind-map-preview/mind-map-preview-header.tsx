import React, { type FC } from "react";

import { MinimalButton } from "@/components/shared";
import AppIcon from "@/components/shared/AppIcon";
import RenderIf from "@/components/shared/RenderIf";
import AppTypo from "@/components/ui/AppTypo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetDictionary } from "@/hooks";

interface IProps {
  onClose: () => void;
  documentName: string;
  handleDownload: (type: "html" | "svg") => void;
  isFullScreen?: boolean;
  setIsFullScreen?: (isFullScreen: boolean) => void;
}

const MindMapPreviewHeader: FC<IProps> = ({
  documentName,
  handleDownload,
  onClose,
  isFullScreen,
  setIsFullScreen,
}) => {
  const {
    page: { mind_map: dictionary },
  } = useGetDictionary();

  return (
    <header className="row h-10 gap-2 border-b">
      <AppTypo className="me-auto">{documentName}</AppTypo>
      <MinimalButton size="sm" icon="mdi:share-variant-outline" />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <MinimalButton
            size="sm"
            icon="mdi:download-circle-outline"
          ></MinimalButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-44">
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => handleDownload("svg")}
              className="flex gap-2"
            >
              <AppIcon icon="tabler:file-type-svg" />
              {dictionary.svg_download_label}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDownload("html")}
              className="flex gap-2"
            >
              <AppIcon icon="tabler:file-type-html" />
              {dictionary.html_download_label}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <RenderIf isTrue={!!setIsFullScreen}>
        <MinimalButton
          size="sm"
          icon={isFullScreen ? "mdi:arrow-collapse" : "mdi:arrow-expand"}
          onClick={() => setIsFullScreen?.(!isFullScreen)}
        />
      </RenderIf>
      <MinimalButton
        size="sm"
        icon="material-symbols:close-rounded"
        onClick={onClose}
      />
    </header>
  );
};

export default MindMapPreviewHeader;
