"use client";

import { useRef } from "react";

import * as SelectPrimitive from "@radix-ui/react-select";
import { useParams, usePathname, useRouter } from "next/navigation";

import AppIcon from "@/components/shared/AppIcon";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { langDir } from "@/lib/dictionary";
import { redirectedPathName } from "@/lib/redirectedPathName";
import { languages } from "@/constants/languages";
import { useChangeDirection } from "@/hooks";

//Language settings panel in user panel dialog

export default function LanguageSettings() {
  const pathName = usePathname();
  const router = useRouter();
  const currentLang = useParams().lang as string;
  const { changeDir } = useChangeDirection();
  const inputRef = useRef<HTMLInputElement>(null);

  /**
   * Change language handler for select component
   * @param lang - target language to select
   */
  const handleChangeLang = (lang: string) => {
    router.replace(redirectedPathName(pathName, lang));
    changeDir(langDir[lang as keyof typeof langDir]);
  };

  return (
    <Select value={currentLang} onValueChange={handleChangeLang}>
      <SelectPrimitive.Trigger className="w-full hover:bg-muted p-1 rounded">
        <div className="gap-1 flex justify-center items-center ">
          <AppIcon icon="tabler:world" width={16} />
          <p>{languages.find(l => l.value === currentLang)?.title}</p>
          <AppIcon icon="bi:chevron-down" width={16} />
        </div>
      </SelectPrimitive.Trigger>

      <SelectContent className="lg:relative lg:h-[400px] lg:w-[200px] !overflow-scroll  lg:right-10 bg-holder-lighter">
        <SelectGroup className="col gap-1 w-full h-full ">
          {languages.map(lang => (
            <SelectItem
              key={lang.value}
              value={lang.value}
              className={
                lang.value === currentLang ? "!bg-active !text-primary" : ""
              }
            >
              {lang.title} <br />
              <span className="text-small font-normal text-label-light">
                {lang.englishTitle}
              </span>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
