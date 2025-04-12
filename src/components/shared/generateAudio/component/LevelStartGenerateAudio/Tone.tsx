import React, { useEffect, useState } from "react";

import Image from "next/image";

import { cn } from "@/lib/utils";

import { type typeTone } from "../../typs";
import AudioPlayer from "./AudioPlayer";

export type toneProps = typeTone & {
  classnames?: Partial<{
    box: string;
    image: string;
    playerBox: {
      box?: string;
    };
  }>;
};

export default function Tone({
  value,
  image,
  name,
  addToSelected,
  selectedTone,
  classnames,
}: toneProps) {
  const [select, setSelect] = useState<boolean>(false);

  useEffect(() => {
    setSelect(selectedTone.includes(value));
  }, [selectedTone]);

  const onClick = () => {
    setSelect(prev => {
      addToSelected({ value, type: prev ? "remove" : "add" });
      return prev;
    });
  };

  return (
    <div
      className={cn(
        `group border ${select ? "border-primary-light" : "border-transparent lg:hover:border-muted-dark"} h-20 cursor-pointer rounded p-1 flex items-center justify-center flex-col`,
        classnames?.box,
      )}
      onClick={onClick}
    >
      <Image
        src={`/images/generateAudio/${image}`}
        width={36}
        height={36}
        alt="Tone "
        quality={100}
        className={cn("rounded-full pb-1", classnames?.image)}
      />
      <div
        onClick={e => {
          e.stopPropagation();
        }}
        className={cn(
          `${select ? "bg-muted-lighter" : "bg-muted-light group-hover:bg-muted-lighter"} flex flex-row rounded-full p-1`,
          classnames?.playerBox?.box,
        )}
      >
        <AudioPlayer name={name}></AudioPlayer>
        <label className="text-small">{name}</label>
      </div>
    </div>
  );
}
