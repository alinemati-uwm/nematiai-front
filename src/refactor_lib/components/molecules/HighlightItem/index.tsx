import React, { useContext, useEffect, useRef, useState } from "react";

import { produce } from "immer";

import { MinimalButton } from "@/components/shared";
import AppIcon from "@/components/shared/AppIcon";
import RenderIf from "@/components/shared/RenderIf";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { iconVariants } from "@/components/ui/variants";
import { useEngineFeatures } from "@/hooks/useEngineFeatures";
import { cn } from "@/lib/utils";
import { useCopyTextInClipBoard, useGetDictionary } from "@/hooks";
import LocalStreamResponseContext from "@/refactor_lib/contexts/LocalStreamResponseContext";
import useCurrentWorkspaceIdValue from "@/refactor_lib/hooks/atoms/useCurrentWorkspaceIdValue";
import useStreamHighlight from "@/refactor_lib/hooks/mutations/useStreamHighlight";
import useToaster from "@/refactor_lib/hooks/shared/useToaster";

interface HighlightItemProps {
  onCheck: (highlightType: string) => void;
  highlightType: string;
  optionTitle: string;
  isPlatformTypeHighlight: boolean;
  isChecked: boolean;
  icon?: any;
  isAnySelected: boolean;
  shouldGenerate: boolean;
  isSomeSelected: boolean;
  resetShouldGenerate: () => void;
  isAllSelected: boolean;
  isNoneSelected: boolean;
  addHighlightError: (highlightType: string) => void;
  removeHighlightError: (highlightType: string) => void;
}

const HighlightItem: React.FC<HighlightItemProps> = props => {
  const {
    highlightType,
    isChecked,
    isPlatformTypeHighlight,
    onCheck,
    optionTitle,
    icon: Icon,
    shouldGenerate,
    isAnySelected,
    resetShouldGenerate,
    isSomeSelected,
    isAllSelected,
    isNoneSelected,
    addHighlightError,
    removeHighlightError,
  } = props;
  const [isTextareaVisible, setIsTextareaVisible] = useState(false);
  const [isTextareaEditable, setIsTextareaEditable] = useState(false);
  const [responseList, setResponseList] = useState<string[]>([]);
  const [responseListUpdatePointer, setResponseListUpdatePointer] =
    useState(-1);
  const [responseListReadPointer, setResponseListReadPointer] = useState(-1);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const { common } = useGetDictionary();
  const { toaster } = useToaster();
  const {
    responseMessage: currentEditorValue,
    responseIsPending: currentEditorValueIsPending,
  } = useContext(LocalStreamResponseContext);

  const { selectedEngineFeature, selectedEngine } = useEngineFeatures();

  const currentWorkspaceId = useCurrentWorkspaceIdValue();

  const [handleCopy, isCopy] = useCopyTextInClipBoard();

  const {
    mutate: generateHighlight,
    responseMessage,
    isSuccess,
    isPending,
    isError,
    error,
  } = useStreamHighlight();

  useEffect(() => {
    if (isSuccess || isError) setResponseListUpdatePointer(prev => ++prev);
  }, [isSuccess, isError]);

  // move to next page after new request
  useEffect(() => {
    if (isPending) {
      setResponseListReadPointer(prev => ++prev);
    }
  }, [isPending]);

  useEffect(() => {
    if (!isError) return;
    addHighlightError(highlightType);
    setResponseList(
      produce(draft => {
        draft[responseListUpdatePointer + 1] =
          `Oops, following error happened while generating ${highlightType} highlight:\n${error.message}, Please try regenerating.`;
      }),
    );
  }, [isError]);

  useEffect(() => {
    if (isTextareaEditable) textareaRef.current?.focus();
  }, [isTextareaEditable]);

  // update responseList on each generation
  useEffect(() => {
    if (!responseMessage) return;
    setResponseList(
      produce(draft => {
        draft[responseListUpdatePointer + 1] = responseMessage;
      }),
    );
  }, [responseMessage]);

  const onToggleHighlightForGeneration = () => {
    onCheck(highlightType);
  };

  const onToggleTextareaEdit = () => {
    setIsTextareaEditable(prev => !prev);
  };

  const onClickShowNextResponse = () => {
    const nextPage = responseListReadPointer + 1;
    if (nextPage <= responseList.length - 1) {
      setResponseListReadPointer(nextPage);
    }
  };

  const onClickShowPrevResponse = () => {
    const nextPage = responseListReadPointer - 1;
    if (nextPage >= 0) {
      setResponseListReadPointer(nextPage);
    }
  };

  const onChangeResponseTextarea = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setResponseList(
      produce(draft => {
        draft[responseListReadPointer] = e.target.value;
      }),
    );
  };

  useEffect(() => {
    if (!shouldGenerate) return;

    if (isAllSelected || isNoneSelected) {
      handleGenerate();
      resetShouldGenerate();
    }
    if (isSomeSelected && isChecked) {
      handleGenerate();
      resetShouldGenerate();
    }
  }, [
    shouldGenerate,
    isAllSelected,
    isNoneSelected,
    isSomeSelected,
    isChecked,
  ]);

  const handleGenerate = () => {
    if (currentEditorValue === "") {
      toaster({
        toastProps: {
          type: "warning",
          message: common.no_text,
        },
      });
      return;
    }
    if (currentWorkspaceId && !currentEditorValueIsPending) {
      removeHighlightError(highlightType);
      setIsTextareaVisible(true);
      setResponseList(
        produce(draft => {
          draft.push("");
        }),
      );
      // generateHighlight({
      // 	body: promptTemplateCreator.createGenerateHighlightPrompt({
      // 		userMessage: currentEditorValue,
      // 		presencePenalty: 0,
      // 		topP: 1,
      // 		maxToken: 100,
      // 		model: selectedEngine,
      // 		temperature: 0.3,
      // 		targetPlatform: highlightType,
      // 		frequencyPenalty: 0,
      // 		documentName: "New Document",
      // 	}),
      // });
    }
  };

  if (isTextareaVisible) {
    return (
      <div className="grid gap-2">
        <div className="mt-2 flex justify-between">
          <div className="flex gap-2 items-center">
            <Checkbox
              checked={isChecked}
              onClick={onToggleHighlightForGeneration}
            />
            <span className="text-sm text-label-light ">{optionTitle}</span>
          </div>

          <div className="flex items-center gap-2 text-label-light">
            <MinimalButton
              icon="tabler:chevron-left"
              onClick={onClickShowPrevResponse}
              disabled={responseListReadPointer === 0}
            ></MinimalButton>
            <span className="text-sm text-label-light">{`${responseListReadPointer + 1}/${isPending ? responseListReadPointer + 1 : responseList.length}`}</span>
            <MinimalButton
              icon="tabler:chevron-right"
              onClick={onClickShowNextResponse}
              disabled={responseListReadPointer === responseList.length - 1}
            ></MinimalButton>
          </div>
        </div>
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={responseList[responseListReadPointer]}
            rows={5}
            className={`mb-0 w-full rounded border bg-input px-6 pb-6 pt-2 outline-none ring-0 focus:border-primary ${isError ? "border-danger-darker text-danger-darker" : ""}`}
            disabled={!isTextareaEditable}
            onChange={onChangeResponseTextarea}
          />
          <div className="absolute bottom-2 end-3 flex w-fit gap-1 rounded bg-holder-lighter px-1 py-0.5 text-label-light">
            <MinimalButton icon="tabler:reload" onClick={handleGenerate} />
            <MinimalButton icon="tabler:edit" onClick={onToggleTextareaEdit} />
            <MinimalButton
              icon={isCopy ? "lucide:copy-check" : "lucide:copy"}
              onClick={() => handleCopy(textareaRef.current?.value ?? "")}
            />
          </div>
        </div>
      </div>
    );
  }

  if (isPlatformTypeHighlight) {
    return (
      <div className="flex">
        <div
          className={cn(
            "flex h-10 cursor-pointer items-center gap-2 overflow-hidden rounded border bg-muted py-0 ps-2 flex-grow rounded-r-none border-r-0",
            isChecked &&
              " border-primary bg-primary-lighter text-primary-dark ",
            isAnySelected && "!rounded !border",
          )}
          onClick={onToggleHighlightForGeneration}
        >
          <span className="me-auto flex items-center gap-2 text-sm">
            {Icon ? (
              typeof Icon === "string" ? (
                <AppIcon icon={Icon} />
              ) : (
                <Icon />
              )
            ) : null}
            {optionTitle}
          </span>
          {isAnySelected && (
            <Checkbox
              checked={isChecked}
              onClick={onToggleHighlightForGeneration}
              className="me-4 rounded-full"
            />
          )}
        </div>
        {!isAnySelected && (
          <Button
            className="!h-full gap-1 px-4 py-2 text-small text-primary min-w-fit border border-l-0 rounded rounded-l-none"
            variant="secondary"
            onClick={handleGenerate}
          >
            <AppIcon
              icon="tabler:wand"
              className={iconVariants({ size: "sm" })}
            />
            Generate
          </Button>
        )}
      </div>
    );
  }

  if (!isPlatformTypeHighlight) {
    return (
      <div className="flex">
        <div
          className={cn(
            "flex h-10 cursor-pointer items-center gap-2 overflow-hidden rounded border bg-muted py-0 ps-2 flex-grow rounded-r-none border-r-0",
            isChecked &&
              " border-primary bg-primary-lighter text-primary-dark ",
            isAnySelected && "!rounded !border",
          )}
          onClick={onToggleHighlightForGeneration}
        >
          <RenderIf isTrue={isAnySelected}>
            <Checkbox
              checked={isChecked}
              onClick={onToggleHighlightForGeneration}
              className="data-[state=checked]:border-primary-dark data-[state=checked]:bg-transparent data-[state=checked]:text-primary-dark "
            />
          </RenderIf>
          <span className="me-auto text-sm">{optionTitle}</span>
        </div>
        <RenderIf isTrue={!isAnySelected}>
          <Button
            className="!h-full gap-1 px-4 py-2 text-small text-primary min-w-fit border border-l-0 rounded rounded-l-none"
            variant="secondary"
            onClick={handleGenerate}
          >
            <AppIcon
              icon="tabler:wand"
              className={iconVariants({ size: "sm" })}
            />
            Generate
          </Button>
        </RenderIf>
      </div>
    );
  }

  return props.highlightType;
};

export default HighlightItem;
