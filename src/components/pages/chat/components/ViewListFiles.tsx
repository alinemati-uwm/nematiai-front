import React from "react";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Image from "next/image";
import Link from "next/link";

import AppIcon from "@/components/shared/AppIcon";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGetDictionary } from "@/hooks";

export interface ViewListFilesProps {
  files: {
    title: string;
    url: string;
  }[];
}

const getIconForFile = (
  file: {
    title: string;
    url: string;
  },
  type: string,
) => {
  const list: { icon?: React.ReactNode } = {};
  const styles: React.CSSProperties = {
    backgroundImage: `url(${file.url})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundColor: "gray",
  };
  switch (type) {
    case "pdf": {
      list.icon = (
        <Link
          href={file.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center p-2"
          title={file.title}
        >
          <AppIcon fontSize={38} icon="prime:file-pdf" />
        </Link>
      );
      break;
    }
    case "png":
    case "jpg":
    case "jpeg": {
      list.icon = (
        <div style={styles} className="w-12 h-12 rounded bg-primary-light" />
      );
      break;
    }
    default:
      break;
  }

  return list.icon;
};

const ViewListFiles = ({ files }: ViewListFilesProps) => {
  const { common: lang } = useGetDictionary();

  // console.log(files);

  return (
    <div className="w-full gap-1 flex row overflow-y-auto scroll  justify-end ">
      {Object.entries(files).map(([key, file]) => {
        // Find the last index of '.' in the filename
        const lastDotIndex = file.title.lastIndexOf(".");
        // Extract the file extension from the last '.' to the end of the string
        let type;

        // If there is no '.', the file type is unknown
        if (lastDotIndex === -1) {
          type = "Unknown";
        } else {
          type = file.title;
        }
        if (file.title.endsWith(".png")) type = "png";
        if (file.title.endsWith(".pdf")) type = "pdf";
        return (
          <>
            {type === "png" ? (
              <Dialog>
                <DialogTrigger>
                  <div
                    key={key}
                    className="flex row text-label-light rounded bg-primary-light"
                  >
                    <div
                      title={file.title}
                      className="relative  rounded  border"
                    >
                      {getIconForFile(file, type)}
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="w-auto h-auto max-w-full max-h-full p-10">
                  <VisuallyHidden>
                    <DialogTitle>Files List</DialogTitle>
                  </VisuallyHidden>
                  <Image
                    src={file.url}
                    width={400}
                    height={400}
                    className="w-full h-full"
                    quality={100}
                    layout="responsive"
                    alt={file.title}
                  />
                </DialogContent>
              </Dialog>
            ) : (
              <div
                key={key}
                className="flex row text-label-light rounded bg-primary-light"
              >
                <div title={file.title} className="relative  rounded  border">
                  {getIconForFile(file, type)}
                </div>
              </div>
            )}
          </>
        );
      })}
    </div>
  );
};

export default ViewListFiles;
