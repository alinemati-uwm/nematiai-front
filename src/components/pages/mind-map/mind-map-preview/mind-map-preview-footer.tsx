import React, { useState, type FC, type ReactNode } from "react";

import {
  colorPalettes,
  linkShapes,
  structures,
} from "@/components/pages/mind-map/constants";
import {
  type MarkmapStructure,
  type PathType,
} from "@/components/pages/mind-map/lib/markmap-view";
import { MinimalButton, SelectAndDrawer } from "@/components/shared";
import AppIcon from "@/components/shared/AppIcon";
import RenderIf from "@/components/shared/RenderIf";
import AppTypo from "@/components/ui/AppTypo";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useGetDictionary } from "@/hooks";
import { ADVANCED_PROMPT_OPTIONS_RESPONSE_LANGUAGES } from "@/refactor_lib/constants/advancedPromptOptions";
import type { ChildrenProps, StateSetterType } from "@/services/types";

interface IFooterPopupProps {
  children: ReactNode | ReactNode[];
  align?: "start" | "end" | "center";
  icon: string;
  title?: string;
  contentClassName?: string;
}

function StructureSection({
  children,
  className,
}: ChildrenProps<{ className?: string }>) {
  return (
    <div className={cn("grid grid-cols-3 gap-2", className)}>{children}</div>
  );
}

interface StructureSectionItemProps {
  Icon: ({ className }: { className?: string }) => React.JSX.Element;
  onClick?: () => void;
  isActive?: boolean;
  className?: string;
  iconClassName?: string;
  title?: string;
}

StructureSection.Item = ({
  isActive,
  onClick,
  className,
  Icon,
  iconClassName,
  title,
}: StructureSectionItemProps) => (
  <div className="col w-full  gap-2">
    <div
      className={cn(
        "w-full aspect-square rounded-md bg-holder-lighter border col justify-center items-center cursor-pointer",
        isActive && "border-primary",
        className,
      )}
      onClick={onClick}
    >
      <Icon className={cn("size-7", iconClassName)} />
    </div>
    <RenderIf isTrue={!!title}>
      <p className="text-center text-[10px]">{title}</p>
    </RenderIf>
  </div>
);

const FooterPopup = ({
  align,
  children,
  icon,
  title,
  contentClassName,
}: IFooterPopupProps) => (
  <Popover>
    <PopoverTrigger asChild>
      <MinimalButton size="sm" icon={icon} title={title} />
    </PopoverTrigger>
    <PopoverContent
      side="top"
      className={cn("!p-3 col", contentClassName)}
      align={align}
    >
      <RenderIf isTrue={!!title}>
        <AppTypo className="mb-3">{title}</AppTypo>
      </RenderIf>
      {children}
    </PopoverContent>
  </Popover>
);

const languages = ADVANCED_PROMPT_OPTIONS_RESPONSE_LANGUAGES.map(langItem => ({
  id: langItem.value,
  value: langItem.label,
}));

interface IProps {
  language: string;
  setLanguage: StateSetterType<string>;
  rescale: (type: "zoomIn" | "zoomOut" | "fit") => void;
  setColors: (colors: string[]) => void;
  activeColor: string;
  setActiveColor: (val: string) => void;
  changeLinkShape: (value: number) => void;
  changeStructure: (structure: MarkmapStructure) => void;
  activePathType: PathType;
  openEditor?: () => void;
}

const MindMapPreviewFooter: FC<IProps> = ({
  rescale,
  language,
  setLanguage,
  setColors,
  activeColor,
  setActiveColor,
  changeLinkShape,
  changeStructure,
  activePathType,
  openEditor,
}) => {
  const {
    page: { mind_map: dictionary },
  } = useGetDictionary();
  const [activeStructure, setActiveStructure] = useState<string>(
    structures[0].id,
  );

  const structureDictionary = dictionary.structure;

  return (
    <footer className="row gap-2">
      <div className="w-36 me-auto">
        <SelectAndDrawer
          value={language}
          setValue={setLanguage}
          items={languages}
        />
      </div>
      <FooterPopup
        icon="material-symbols:mediation"
        title={structureDictionary.title}
        contentClassName="max-w-72 w-72"
      >
        <StructureSection className="mb-3">
          {structures.map(item => (
            <StructureSection.Item
              key={item.id}
              Icon={item.Icon}
              title={structureDictionary[item.key]}
              iconClassName={cn(
                item.key === "logical_left" && "scale-[-1]",
                item.key === "logical_left" && "scale-x-[-1]",
                item.key === "organization_upward" && "scale-y-[-1]",
              )}
              isActive={item.id === activeStructure}
              onClick={() => {
                setActiveStructure(item.id);
                changeStructure(item.key);
              }}
            />
          ))}
        </StructureSection>
        <AppTypo className="my-3">
          {structureDictionary.link_shape_title}
        </AppTypo>
        <StructureSection>
          {linkShapes.map(item => (
            <StructureSection.Item
              key={item.id}
              Icon={item.Icon}
              isActive={item.value === activePathType}
              onClick={() => changeLinkShape(item.value)}
            />
          ))}
        </StructureSection>
      </FooterPopup>

      <FooterPopup
        icon="ic:outline-palette"
        title={dictionary.colors_popup_title}
        contentClassName="max-w-80 w-80"
      >
        <div className="grid grid-cols-2 gap-2">
          {colorPalettes.map(({ colors, id }) => (
            <div
              key={id}
              className={cn(
                "w-full rounded-md gap-0.5 border p-1 cursor-pointer grid grid-cols-6 select-none",
                id === activeColor && "border-primary",
              )}
              onClick={() => {
                setColors(colors);
                setActiveColor(id);
              }}
            >
              {colors.map((color, index) => (
                <div
                  key={`${id}-${index}`}
                  className="w-full aspect-square rounded-sm"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          ))}
        </div>
      </FooterPopup>
      <MinimalButton
        size="sm"
        icon="mdi:zoom-out-outline"
        onClick={() => rescale("zoomOut")}
      />
      <MinimalButton
        size="sm"
        icon="mdi:zoom-in-outline"
        onClick={() => rescale("zoomIn")}
      />
      <MinimalButton
        size="sm"
        icon="mdi:fit-to-screen-outline"
        onClick={() => rescale("fit")}
      />
      <RenderIf isTrue={!!openEditor}>
        <Button onClick={openEditor} size="sm">
          <AppIcon icon="mdi:code-block-tags" />
          {dictionary.editor_btn_label}
        </Button>
      </RenderIf>
    </footer>
  );
};

export default MindMapPreviewFooter;
