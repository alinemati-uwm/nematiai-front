import type { FileContextProps, FilesType } from "./types";

export default function addFileToList({
  setFiles,
  setSize,
  counter,
  setCounter,
  files: fileArray,
  maxSize,
  allfiles,
  eachSize,
  setFilePreviews,
  onChange,
  toaster,
  onGetNewFile,
  dictionary,
  maxUpload,
  accept = [],
}: FileContextProps) {
  let totalSize = 0;
  let currentCounter = counter;
  const newFiles: FilesType = {};
  const newFilePreviews: Record<string, string> = {};

  if (maxSize !== 0) {
    Object.values(allfiles).forEach(file => {
      totalSize += file.size;
    });
  }

  const unvalide_file: File[] = [];
  const unvalide_type_file: File[] = [];

  const checkTypeFile = (type: string) => {
    let flag = false;
    accept.forEach((item: string) => {
      if (type.includes(item.substring(1))) {
        flag = true;
      }
    });

    return flag;
  };

  fileArray.forEach(file => {
    const fileKey = `file_${currentCounter++}`;

    if (!checkTypeFile(file.type) || file.size === 0) {
      unvalide_type_file.push(file);
      return;
    }

    if (eachSize !== 0) {
      if (file.size / (1024 * 1024) > eachSize) {
        unvalide_file.push(file);
        return;
      }
    }
    newFiles[fileKey] = file;
    totalSize += file.size;
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = e => {
        if (e.target?.result) {
          newFilePreviews[fileKey] = e.target.result as string;
          setFilePreviews(prev => ({ ...prev, ...newFilePreviews }));
        }
      };
      reader.readAsDataURL(file);
    }
  });
  if (unvalide_type_file.length) {
    const fileName = unvalide_type_file.map((file, index) => {
      return (
        <li className="truncate max-w-[90%] block" key={index}>
          {index + 1}. {file.name}{" "}
        </li>
      );
    }, []);

    toaster({
      toastProps: {
        type: "error",
        content: (
          <div>
            <label className="text-danger">
              {dictionary.common.unvalid_file}
            </label>
            <ul className="">{fileName}</ul>
          </div>
        ),
      },
    });
  }
  if (unvalide_file.length) {
    const fileName = unvalide_file.map((file, index) => {
      return (
        <li className="truncate max-w-[90%] block" key={index}>
          {index + 1}. {file.name}{" "}
        </li>
      );
    }, []);

    toaster({
      toastProps: {
        type: "error",
        content: (
          <div>
            <label className="text-danger">
              {dictionary.common.max_each_size_for_file.replace(
                "[0]",
                eachSize,
              )}
            </label>
            <ul className="">{fileName}</ul>
          </div>
        ),
      },
    });
  }
  setSize(totalSize);

  setFiles(prevFiles => {
    try {
      if (onGetNewFile) onGetNewFile(newFiles);

      const result = maxUpload === 1 ? newFiles : { ...prevFiles, ...newFiles };

      if (maxUpload && Object.keys(result).length > maxUpload)
        throw Error(dictionary.page.image.you_cant_upload_more);

      if (onChange) onChange(result);
      return result;
    } catch (error) {
      toaster({
        toastProps: {
          type: "error",
          content: <div>{(error as Error).message}</div>,
        },
      });
      return prevFiles;
    }
  });
  setCounter(currentCounter);
}
