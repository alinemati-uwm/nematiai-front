import React, { useEffect, useRef, useState } from "react";

import dynamic from "next/dynamic";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useGetDictionary } from "@/hooks";

import { type Level, type typeInfo, type typeOnChangeLevel } from "../typs";
import { ButtonGenerateAudio } from "./ButtonGenerateAudio";
import { LazyLoading } from "./LazyLoading";
import styles from "./PopoverGenereateAudio.module.css";

const LevelStartGenerateAudio = dynamic(
  () => import("./LevelStartGenerateAudio/LevelStartGenerateAudio"),
  {
    loading: () => <LazyLoading />,
  },
);

const LevelShowAudioFileGenerateAudio = dynamic(
  () =>
    import("./LevelShowAudioFileGenerateAudio/LevelShowAudioFileGenerateAudio"),
  {
    loading: () => <LazyLoading />,
  },
);

const levels = {
  start: {
    component: LevelStartGenerateAudio,
    className: "popoverLevelStart",
  },
  showAudioFile: {
    component: LevelShowAudioFileGenerateAudio,
    className: "popoverLevelShowAudioFile",
  },
} as Record<Level, any>;

/**
 * Component to generate audio with a popover interface.
 *
 * @param {Object} props - The properties for the component.
 * @param {string} props.intialSrc - The initial source of the audio.
 * @param {AppsType} props.appName - The name of the application.
 * @param {string} props.uuid - The unique identifier for the audio.
 * @param {string} [props.version=""] - The version of the audio.
 * @param {string} props.icon - The icon to display on the button.
 * @param {"voice" | "podcast"} [props.type="voice"] - The type of audio.
 * @param {Object} props.validChar - The validation state and number of characters.
 * @param {boolean} props.validChar.state - The validation state.
 * @param {number} props.validChar.number - The number of valid characters.
 */
export function PopoverGenereateAudio({
  intialSrc,
  uuid,
  appName,
  version = "",
  icon,
  type = "voice",
  validChar,
}: {
  intialSrc: string;
  appName: AppsType;
  uuid: string;
  version: string;
  icon: string;
  type: "voice" | "podcast";
  validChar: { state: boolean; number: number };
}) {
  const [open, setOpen] = useState(false);
  const [openForFirstTime, setOpenForFirtTime] = useState(false);

  const [level, setLevel] = useState<Level>("showAudioFile");
  const [audioSrc, setAudioSrc] = useState<string>(intialSrc);
  const contentPopoverRef = useRef<HTMLDivElement>(null);

  const btnRef = useRef<HTMLDivElement>(null);

  const [info, SetInfo] = useState<typeInfo>({
    timer: "",
    isPlaying: false,
    isGenerating: false,
  });

  const setInfo = ({
    timer,
    isPlaying,
    isGenerating,
    isReady,
    showDownloadIsSuccess,
  }: typeInfo) => {
    SetInfo({
      timer: timer === undefined ? info.timer : timer,
      isPlaying: isPlaying === undefined ? info.isPlaying : isPlaying,
      showDownloadIsSuccess:
        showDownloadIsSuccess === undefined
          ? info.showDownloadIsSuccess
          : showDownloadIsSuccess,
      isGenerating:
        isGenerating === undefined ? info.isGenerating : isGenerating,
      isReady: isReady === undefined ? info.isReady : isReady,
    });
  };

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      let target = event.target as Node;

      const rootNode = target.getRootNode();

      if (rootNode instanceof ShadowRoot) {
        target = rootNode.host;
      }

      if (
        !(
          (contentPopoverRef.current &&
            contentPopoverRef.current.contains(target)) ||
          (btnRef.current && btnRef.current.contains(target))
        )
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Get dictionary
  const { generateAudio: lang } = useGetDictionary().components;

  // Set initial level
  useEffect(() => {
    if (intialSrc === "") {
      setLevel("start");
    } else {
      setLevel("showAudioFile");
    }
    setAudioSrc(intialSrc);
  }, [intialSrc, uuid, version]);

  //Component to render
  const DynamicLevel = levels[level].component;

  // Change level
  const onChangeLevel = ({ level, src }: typeOnChangeLevel) => {
    setLevel(level);
    if (src) setAudioSrc(src);
  };

  // Change show
  const onchangeShow = () => {
    setOpen((prev: boolean) => {
      return !prev;
    });
  };

  return (
    uuid && (
      <Popover open={openForFirstTime}>
        {/*delete popover button to open popover*/}
        <PopoverTrigger disabled={validChar.state}>
          <span
            ref={btnRef}
            onClick={() => {
              if (openForFirstTime === false) {
                setOpenForFirtTime(true);
              }
              onchangeShow();
            }}
          >
            {validChar.state ? (
              <HoverCard>
                <HoverCardTrigger>
                  <ButtonGenerateAudio
                    icon={icon}
                    hasAudio={audioSrc !== ""}
                    info={info}
                    open={open}
                    tooltip={type}
                    setInfo={setInfo}
                    validChar={validChar.state}
                  ></ButtonGenerateAudio>
                </HoverCardTrigger>
                <HoverCardContent>
                  {lang.will_activate} {validChar.number} {lang.character}
                </HoverCardContent>
              </HoverCard>
            ) : (
              <ButtonGenerateAudio
                icon={icon}
                hasAudio={audioSrc !== ""}
                info={info}
                open={open}
                tooltip={type}
                setInfo={setInfo}
                validChar={validChar.state}
              ></ButtonGenerateAudio>
            )}
          </span>
        </PopoverTrigger>

        <PopoverContent
          ref={contentPopoverRef}
          className={` ${open ? " flex " : " hidden "}  w-[303px]  flex-col gap-4 !p-4 select-none  ${styles[levels[level].className]}`}
          collisionPadding={0}
        >
          <div className="w-full flex flex-col flex-1 h-full  select-none ">
            {level === "start" && (
              <div>
                <label className="font-bold text-base">
                  {lang.title_voice}
                </label>
              </div>
            )}
            <div className="flex-1 flex flex-col w-full">
              {DynamicLevel && (
                <DynamicLevel
                  setAudioSrc={setAudioSrc}
                  type={type}
                  version={version}
                  audioSrc={audioSrc}
                  onChangeLevel={onChangeLevel}
                  appName={appName}
                  uuid={uuid}
                  setInfo={setInfo}
                  info={info}
                />
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    )
  );
}
