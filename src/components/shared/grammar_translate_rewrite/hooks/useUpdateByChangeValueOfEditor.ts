"use client";

import { useEffect, useRef, useState } from "react";

import { type Value } from "@udecode/slate";

import { useHistoryUpdateChild } from "@/services/history";

import { type typeUpdateByChangeValueOfEditor } from "../types";

export const removeIdForCheck = (str: string) => {
  let newStr = str.replace(/,"id":"[^"]*"/g, "");
  newStr = newStr.replace(/,"_id":"[^"]*"/g, "");
  return newStr;
};

export const useUpdateByChangeValueOfEditor = ({
  setInfoForLeavePage = () => {},
  editorValue,
  selectedUUID,
  isPendingGenerate,
  appName,
  selectedVersion,
  setEditorValue,
  afterUpdate = () => {},
}: typeUpdateByChangeValueOfEditor) => {
  const {
    data,
    mutate: updateHistory,
    isSuccess,
  } = useHistoryUpdateChild({
    appName,
  });

  const [lastValue, setLastValue] = useState<Value | null>(null);

  useEffect(() => {
    reset();
  }, [selectedUUID, selectedVersion]);

  const reset = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setLastValue(null);
  };

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [hasChanged, setHasChanged] = useState<boolean>(false);

  useEffect(() => {
    if (isSuccess && data) {
      afterUpdate({
        version: data.versions[0].uuid,
        uuid: data.uuid,
        podcast: data.versions[0].podcast || "",
        audio: data.versions[0].audio || "",
      });
    }
  }, [data, isSuccess]);

  const update = (value: Value, lockOnChange: boolean) => {
    const newValue = value;
    let oldValue = editorValue;

    if (lockOnChange) {
      setLastValue(value);
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (!isPendingGenerate && selectedUUID !== "") {
      if (lastValue !== null) {
        oldValue = lastValue;
      }

      if (
        removeIdForCheck(JSON.stringify(newValue)) !==
        removeIdForCheck(JSON.stringify(oldValue))
      ) {
        setHasChanged(true);
        setInfoForLeavePage({ hasChange: true });

        timeoutRef.current = setTimeout(() => {
          const valueUpdate = JSON.stringify(value);
          setLastValue(value);

          updateHistory(
            {
              answer_text: valueUpdate,
              answerUuid: selectedUUID,
            },
            {
              onSuccess: () => {
                setHasChanged(false);
                setInfoForLeavePage({ hasChange: false });
              },
            },
          );
        }, 3000);
      }
    }
  };

  const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    let change;
    setHasChanged(prev => {
      change = prev;
      return prev;
    });

    if (change === false) {
      return true;
    }
    const confirmationMessage =
      "You have unsaved changes. Do you want to update the text before leaving?";
    event.preventDefault();
    return confirmationMessage;
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { update };
};
