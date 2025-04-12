import React, { useContext, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { useGetDictionary } from "@/hooks";
import LocalStreamResponseContext from "@/refactor_lib/contexts/LocalStreamResponseContext";
import useGenerateSpeechToText from "@/refactor_lib/hooks/mutations/useGenerateSpeechToText";
import useGetAppTypeEngines from "@/refactor_lib/hooks/shared/useGetAppTypeEngines";
import useToaster from "@/refactor_lib/hooks/shared/useToaster";
import { useStopResponding } from "@/services/general";

import {
  type typeAddToSelected,
  type typeInfo,
  type typeOnChangeLevel,
} from "../../typs";
import ListTone from "./ListTone";
import LoadingAfterstartGenerate from "./LoadingAfterstartGenerate";

export default function LevelStartGenerateAudio({
  version,
  onChangeLevel,
  uuid,
  appName,
  setInfo,
  type,
}: {
  type: "voice" | "podcast";
  version: string;
  onChangeLevel: (levelData: typeOnChangeLevel) => void;
  uuid: string;
  appName: AppsType;
  setInfo: (params: typeInfo) => void;
}) {
  const { generateAudio: lang } = useGetDictionary().components;
  const [selectedTone, setSelectedTone] = useState<string[]>([]);
  const { engines: appTypeEngines } = useGetAppTypeEngines({
    GetAllModels: { modelName: "TEXT_TO_SPEECH" },
  });
  const [isPending, setisPending] = useState<boolean>(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const { mutate } = useGenerateSpeechToText({ type });
  const { toaster } = useToaster();
  const {
    responseMessage: currentEditorValue,
    responseIsPending: currentEditorValueIsPending,
  } = useContext(LocalStreamResponseContext);

  const { mutateAsync: stopGenearteMutate } = useStopResponding();

  useEffect(() => {
    return () => {
      setInfo({ isGenerating: false });
      setisPending(false);
    };
  }, []);

  useEffect(() => {
    setInfo({ isGenerating: isPending });
  }, [isPending]);

  const OnClickBtn = async () => {
    if (currentEditorValue === "") {
      toaster({
        toastProps: {
          type: "error",
          message: lang.there_is_no_text || "",
        },
      });
      return;
    }

    if (!isPending) {
      setisPending(true);
      abortControllerRef.current = new AbortController();

      // {
      // 	"history_uuid": "1881e639-0961-4311-a1b1-bffc1ce00f79",
      // 		"history_version_uuid": "1881e639-0961-4311-a1b1-bffc1ce00f79",
      // 			"langauge": "en",
      // 				"length": "short",
      // 					"text": "This text needs to be transformed into podcast.",
      // 						"voice": [
      // 							"alloy",
      // 							"nova"
      // 						]
      // }
      let data = {};

      if (type === "voice") {
        data = {
          dataVoic: {
            history_uuid: uuid,
            history_version_uuid: version === "" ? undefined : version,
            app_type: appName,
            model: appTypeEngines[0],
            response_format: "wav",
            speed: 1,
            voice: selectedTone[0] ? selectedTone[0] : "",
            text: currentEditorValue,
          },
        };
      } else {
        data = {
          dataPodcast: {
            history_uuid: uuid,
            history_version_uuid: version === "" ? undefined : version,
            length: "short",
            text: currentEditorValue,
            voice: selectedTone,
          },
        };
      }

      mutate(
        {
          ...data,
          signal: abortControllerRef.current.signal,
        },
        {
          onError: (error: any) => {
            toaster({
              toastProps: {
                type: "error",
                message: error.response.data.detail || lang.error,
              },
            });
          },
          onSuccess: data => {
            setInfo({ showDownloadIsSuccess: true });
            onChangeLevel({ level: "showAudioFile", src: data.data.audio_url });
          },
          onSettled: () => {
            setisPending(false);
          },
        },
      );
    } else {
      try {
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
          abortControllerRef.current = null;
        }
        await stopGenearteMutate("TEXT_TO_SPEECH" as AppsType, {
          onSuccess() {
            setisPending(false);
            setInfo({ isGenerating: false });
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const addToSelected = ({ value, type: typeOffAdd }: typeAddToSelected) => {
    if (typeOffAdd === "add") {
      if (type === "voice") {
        setSelectedTone([value]);
      } else {
        if (selectedTone.length === 2) {
          return;
        }
        setSelectedTone([...selectedTone, value]);
      }
    } else {
      if (type === "voice") {
        setSelectedTone([]);
      } else {
        setSelectedTone(selectedTone.filter(item => item !== value));
      }
    }
  };

  return (
    <div className="flex flex-col pt-1.5 w-full flex-1 justify-center items-center">
      {!isPending && (
        <div>
          <label>
            {type === "voice"
              ? lang.choose_tone_voice
              : lang.choose_tone_podcast}
          </label>
        </div>
      )}
      {!isPending && (
        <ListTone
          selectedTone={selectedTone}
          addToSelected={addToSelected}
        ></ListTone>
      )}
      {isPending && <LoadingAfterstartGenerate></LoadingAfterstartGenerate>}

      {!isPending && (
        <div className="w-full">
          <Button
            disabled={
              type === "voice"
                ? !(selectedTone.length > 0)
                : !(selectedTone.length == 2)
            }
            className="row w-full text-small h-input"
            onClick={OnClickBtn}
          >
            {lang.generate}
          </Button>
        </div>
      )}
    </div>
  );
}
