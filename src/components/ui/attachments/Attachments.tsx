import React, { useEffect, useRef, useState, type JSX } from "react";

import AppIcon from "@/components/shared/AppIcon";
import { cn } from "@/lib/utils";
import { useGetDictionary } from "@/hooks";
import useToaster from "@/refactor_lib/hooks/shared/useToaster";

import AppTypo from "../AppTypo";
import addFile from "./addFile";
import {
  handleDragLeave,
  handleDragOver,
  handleDrop,
} from "./handleDragAndDropFile";
import type { AttachmentsOutput, FilesType, Props } from "./types";
import ViewFiles from "./ViewFiles";

// Custom hook for managing file attachments
const useAttachments = ({
  accept = [".pdf"],
  maxSize = 0,
  onChange,
  onGetNewFile,
  multiple = true,
  initialValues,
  maxUpload,
  eachSize = 0,
  classnames,
}: Props): AttachmentsOutput => {
  const [files, setFiles] = useState<FilesType>({});
  const [filePreviews, setFilePreviews] = useState<Record<string, string>>({});
  const [counter, setCounter] = useState<number>(1);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [size, setSize] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState<boolean>(false); // State to track dragging status
  const dictionary = useGetDictionary();
  const { toaster } = useToaster();
  const [key, setKey] = useState<number>(0);

  const handleAddFiles = (newFiles: File[]) => {
    const names = Object.values(newFiles).map(el => el.name);
    if (Object.values(files).find(el => names.includes(el.name))) return;

    addFile({
      setFiles,
      setSize,
      counter,
      setCounter,
      maxSize,
      allfiles: files,
      eachSize,
      setFilePreviews,
      onChange,
      toaster,
      onGetNewFile,
      maxUpload,
      files: newFiles,
      dictionary,
      accept,
    });
  };

  useEffect(() => {
    const fileSizeInMB = size / (1024 * 1024); // Convert bytes to megabytes
    if (maxSize !== 0) {
      if (fileSizeInMB > maxSize) {
        setErrorMessage(
          dictionary.common.max_size_for_file
            .replace("[1]", maxSize.toString())
            .replace("[0]", fileSizeInMB.toFixed().toString()),
        );
        setError(true);
      } else {
        setErrorMessage("");
        setError(false);
      }
    }
  }, [size]);

  useEffect(() => {
    if (initialValues?.length) handleAddFiles(initialValues);
  }, []);

  // Handler for file input change event
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    handleAddFiles(Array.from(event.target.files));
    setKey(prev => prev + 1);
  };

  // Function to remove a file
  const removeFile = async (key: string) => {
    console.log("s", key);

    setSize(prevSize => prevSize - files[key].size);
    const { [key]: _, ...remainingFiles } = files;
    if (onChange) await onChange(remainingFiles);
    setFiles(remainingFiles);
  };

  // Function to trigger the file input click
  const showUpload = () => {
    inputRef.current?.click();
  };

  // Function to reset all files
  const resetFile = () => {
    setFiles({});
    setFilePreviews({});
  };

  const inputFile = (
    <input
      key={key}
      type="file"
      accept={accept.join(",")}
      multiple={multiple}
      ref={inputRef}
      className="hidden"
      onChange={handleFileChange}
    />
  );

  return {
    content: (
      <div className="w-full  gap-1 flex col">
        {Object.values(files).length !== 0 && (
          <div className="w-full max-w-[100%] gap-4 pt-2 flex row overflow-y-auto scrollbar">
            <ViewFiles
              files={files}
              filePreviews={filePreviews}
              onRemove={removeFile}
            />
          </div>
        )}
        {error && (
          <div className="text-danger text-small">
            <label>{errorMessage}</label>
          </div>
        )}
        {inputFile}
      </div>
    ),
    input: inputFile,
    ViewFiles: <ViewFiles files={files} filePreviews={filePreviews} />,
    showUpload,
    files: Object.values(files),
    resetFile,
    error,
    addFile: ({ files }) => {
      handleAddFiles(files);
    },
    holderDropWithChild: ({
      child,
      className = "",
      bgOnDragg = " bg-primary-lighter ",
      bgManin = " bg-primary-lighter ",
    }: {
      child: JSX.Element;
      className?: string;
      bgOnDragg?: string;
      bgManin?: string;
    }) => {
      return (
        <div
          onClick={showUpload}
          onDrop={event => {
            handleDrop(event, handleAddFiles, setDragging, accept, multiple);
          }}
          onDragOver={event => {
            handleDragOver(event, setDragging);
          }}
          onDragLeave={event => {
            handleDragLeave(event, setDragging);
          }}
          className={
            className + ` !${dragging ? bgOnDragg : bgManin} cursor-pointerr `
          }
        >
          {child}
        </div>
      );
    },
    holderDropFile: (
      <div
        onClick={showUpload}
        onDrop={event => {
          handleDrop(event, handleAddFiles, setDragging, accept, multiple);
        }}
        onDragOver={event => {
          handleDragOver(event, setDragging);
        }}
        onDragLeave={event => {
          handleDragLeave(event, setDragging);
        }}
        className={cn(
          `${dragging ? "bg-muted-dark" : " bg-primary-lighter"} cursor-pointer my-1 w-full col border-2 border-primary rounded py-9 border-dashed flex justify-center items-center rounded-custom gap-y-3`,
          classnames?.holderDropFile,
        )}
      >
        <AppIcon
          icon="mdi:progress-upload"
          className="cursor-pointer text-label-light"
          width={24}
        />
        <AppTypo variant="headingM" color="secondary">
          {dictionary.common.upload_File}
        </AppTypo>
        <AppTypo color="secondary">
          (
          {accept
            .map(item => {
              return item.split(".")[1].toUpperCase();
            })
            .join(", ")}{" "}
          / {maxSize != 0 ? maxSize + "MB" : ""})
        </AppTypo>
      </div>
    ),
  };
};
export default useAttachments;
