import React, { useEffect, useRef, useState } from "react";

import { AppTooltip } from "@/components/shared";
import AppIcon from "@/components/shared/AppIcon";

import { type typeInfo } from "../typs";

// title={info.isPlaying && !open ? info.timer || "" : ""}
// 							open={open || info.isPlaying || false}

export function ButtonGenerateAudio({
  icon,
  hasAudio,
  open,
  info,
  setInfo,
  validChar,
  tooltip,
}: {
  icon: string;
  hasAudio: boolean;
  open: boolean;
  info: typeInfo;
  setInfo: (params: typeInfo) => void;
  validChar: boolean;
  tooltip?: string;
}) {
  const title = info.isPlaying && !open ? info.timer || "" : "";
  const setintervalRef = useRef<number | null>(null);
  const [showDownloadeed, setShowDownloaded] = useState<boolean>(false);
  const active = open || info.isPlaying || showDownloadeed;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const reset = () => {
    if (setintervalRef.current) {
      clearInterval(setintervalRef.current);

      setintervalRef.current = null;
      setShowDownloaded(false);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
  };

  useEffect(() => {
    if (info.showDownloadIsSuccess) {
      setShowDownloaded(true);
      setintervalRef.current = window.setInterval(() => {
        setShowDownloaded(prev => !prev);
      }, 1000);
      timeoutRef.current = setTimeout(() => {
        setInfo({ showDownloadIsSuccess: false });
      }, 5000);
    } else {
      reset();
    }
  }, [info.showDownloadIsSuccess]);

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  let content;
  if (!info.isGenerating) {
    if (info.showDownloadIsSuccess) {
      if (showDownloadeed) {
        content = <AppIcon icon="material-symbols:downloading" fontSize={20} />;
      } else {
        content = <AppIcon icon={icon} fontSize={20} />;
      }
    } else {
      content = (
        <>
          <div className="relative">
            <AppIcon icon={icon} fontSize={20} />
            {hasAudio && title === "" && (
              <>
                <div className="absolute end-[-10px] bottom-[-10px]">
                  <AppIcon
                    icon="rivet-icons:circle-solid"
                    className="text-[#fff]"
                  />
                </div>
                <div className="absolute end-[-10px] bottom-[-10px]">
                  <AppIcon
                    icon="lets-icons:check-fill"
                    className="text-[#04C900]"
                  />
                </div>
              </>
            )}
          </div>
          {title !== "" && (
            <label className="text-small min-w-16">{title}</label>
          )}
        </>
      );
    }
  } else {
    content = <AppIcon icon="svg-spinners:3-dots-bounce" />;
  }

  return (
    <AppTooltip title={tooltip ?? ""}>
      <div
        className={`text-white transition-all duration-200  ${title !== "" ? " px-1 min-w-20 " : " min-w-8  "} ${active ? " bg-primary-dark " : "   bg-primary lg:hover:bg-primary-dark  "} ${validChar && "bg-primary-light !cursor-not-allowed hover:!bg-primary-light"}  h-8 bg-primary rounded-md flex justify-center text-primary-lighter  active:bg-primary-dark cursor-pointer items-center`}
      >
        {content}
      </div>
    </AppTooltip>
  );
}
