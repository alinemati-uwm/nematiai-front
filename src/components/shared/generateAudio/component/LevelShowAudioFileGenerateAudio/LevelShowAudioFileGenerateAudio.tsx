import { useState } from "react";

import AppIcon from "@/components/shared/AppIcon";
import Loading from "@/components/shared/Loading";
import { Button } from "@/components/ui/button";
import { useGetDictionary } from "@/hooks";
import useDeleteAudio from "@/refactor_lib/hooks/mutations/useDeleteAudio";
import useToaster from "@/refactor_lib/hooks/shared/useToaster";

import { type typeInfo, type typeOnChangeLevel } from "../../typs";
import Player from "./palyer/player";
import ShareGenerateAudio from "./ShareGenerateAudio";

export default function LevelShowAudioFileGenerateAudio({
  audioSrc,
  onChangeLevel,
  setInfo,
  info,
  setAudioSrc,
  uuid,
  version,
}: {
  audioSrc: string;
  onChangeLevel: (params: typeOnChangeLevel) => void;
  setInfo: (params: typeInfo) => void;
  info: typeInfo;
  setAudioSrc: (val: string) => void;
  version: string;
  uuid: string;
}) {
  const { generateAudio: lang } = useGetDictionary().components;
  const [wantToGenerate, setWantToGenerate] = useState<boolean>(false);
  const [wantToDelete, setWantToDelete] = useState<boolean>(false);

  const { mutate, isPending: isPendingDelete } = useDeleteAudio();
  const { toaster } = useToaster();
  const download = () => {
    const imageUrl = audioSrc;
    window.open(imageUrl, "_blank");
  };

  const reset = () => {
    setAudioSrc("");
    onChangeLevel({ level: "start" });
  };

  const onDelete = () => {
    mutate(
      {
        history_uuid: uuid,
        history_version_uuid: version === "" ? undefined : version,
      },
      {
        onSuccess: () => {
          reset();
        },
        onError: (error: any) => {
          const message =
            error.response.data.detail &&
            typeof error.response.data.detail === "string"
              ? error.response.data.detail
              : lang.error;
          toaster({
            toastProps: {
              type: "error",
              message: message,
            },
          });
          setWantToDelete(false);
        },
      },
    );
  };
  return (
    <div className="flex flex-col w-full h-20">
      {(wantToGenerate || wantToDelete) && (
        <div className="flex flex-col  rounded-md  gap-1  ">
          {wantToGenerate ? (
            <div>
              <label>{lang.message_before_generate}</label>
              <br></br>
              <label>{lang.are_you_sure}</label>
            </div>
          ) : (
            <div>
              <label>{lang.message_before_delete}</label>
            </div>
          )}
          <div className="flex  items-center justify-center flex-1">
            <Button
              className=" h-input bg-primary-lighter text-primary hover:text-white "
              onClick={() => {
                setWantToGenerate(false);
                setWantToDelete(false);
              }}
              title={lang.no}
            >
              {lang.no}
            </Button>
            {wantToGenerate ? (
              <Button
                title={lang.regenerate}
                onClick={reset}
                className=" h-input ml-3 }"
              >
                {lang.sure}
              </Button>
            ) : (
              <Button
                title={lang.delete}
                onClick={onDelete}
                className="w-16 h-input ml-3 }"
              >
                {isPendingDelete ? (
                  <Loading
                    rootClass="-ms-1 me-1 text-primary-lighter "
                    svgClass="w-4 h-4  "
                  />
                ) : (
                  lang.delete
                )}
              </Button>
            )}
          </div>
        </div>
      )}
      {!wantToGenerate && !wantToDelete && (
        <>
          <div className=" flex-1  ">
            <Player
              reset={reset}
              setInfo={setInfo}
              audioSrc={audioSrc}
            ></Player>
          </div>
          <div className="flex flex-row justify-between  ">
            <div
              className={`text-small flex items-end justify-between ${info.isReady ? "  " : " invisible  "} `}
            >
              {info.timer}
            </div>
            <div className="flex flex-row  items-center gap-3">
              <AppIcon
                tooltip={lang.download}
                onClick={download}
                fontSize={23}
                icon="mdi:tray-download"
                className="p-1  cursor-pointer select-none"
              />

              <div className=" h-5 w-5 overflow-hidden">
                <ShareGenerateAudio audioSrc={audioSrc}>
                  <AppIcon
                    fontSize={23}
                    tooltip={lang.share}
                    icon="ic:outline-share"
                    className="p-1 cursor-pointer select-none"
                  />
                </ShareGenerateAudio>
              </div>
              <AppIcon
                tooltip={lang.regenerate}
                onClick={() => {
                  setWantToGenerate(true);
                }}
                fontSize={23}
                icon="ic:twotone-refresh"
                className="p-1 cursor-pointer select-none"
              />

              <AppIcon
                tooltip={lang.delete}
                fontSize={23}
                icon="mdi:trash-can-outline"
                className="p-1 cursor-pointer select-none text-danger"
                onClick={() => {
                  setWantToDelete(true);
                }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
