"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";
import { themes } from "@/constants/theme";
import { useGetDictionary } from "@/hooks";
import type { AppTheme } from "@/types/theme";

/**
 * Appearance settings panel in user panel dialog
 * @constructor
 */
export default function AppearanceSettings() {
  const { activeTheme, changeTheme } = useTheme();
  const userPanelDictionary = useGetDictionary().components.user.panel;
  return (
    <div className="flex flex-row   lg:flex lg:flex-col gap-16 lg:gap-2 px-6  my-5">
      {/*
          list of themes
          this change background color, popover background color, overlay color, muted color and text color
      */}

      <div className="flex flex-col w-full gap-4 ">
        <h2 className="flex ">{userPanelDictionary.appearance_themes_title}</h2>
        <div className="flex gap-2 w-full flex-row ">
          {themes.map(theme => (
            <Button
              variant="ghost"
              className={cn("fit overflow-hidden rounded !px-0  ")}
              key={theme.id}
              onClick={() => changeTheme({ themeClass: theme.key as AppTheme })}
            >
              <Image
                src={`/images/themes/${theme.image}`}
                alt={theme.key}
                width={250}
                height={200}
                className={cn(
                  "!h-12 !w-[100px] lg:!h-20 lg:!w-[115px] object-cover border-2 rounded",
                  activeTheme === theme.key && "border-primary",
                )}
              />
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
