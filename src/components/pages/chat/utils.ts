import FileSaver from "file-saver";

import type { FileType } from "@/components/ui/attachments/types";
import { monacoLanguages } from "@/constants/code";

export const getAcceptFileList = ({
  type,
}: {
  type: "doc" | "image" | "both";
}): FileType[] => {
  switch (type) {
    case "doc": {
      return [".pdf"];
    }
    case "image": {
      return [".png", ".jpg", ".jpeg"];
    }
    case "both": {
      return [".png", ".jpg", ".jpeg", ".pdf"];
    }
  }
};

const extraExt = ["jsx", "tsx", "scss", "less", "json"];

/**
 * This function downloads a code snippet in the appropriate language extension.
 * It first finds the extension associated with the provided language from the monacoLanguages array.
 * If no matching extension is found, it defaults to 'js'.
 * It then creates a new Blob object from the code, with the MIME type set to 'text/plain;charset=utf-8'.
 * The FileSaver library is used to save the Blob object as a file, with the filename being the language and the extension.
 *
 * @param {string} language - The programming language of the code.
 * @param {string} code - The code snippet to be downloaded.
 * @param {string} title - The title of the code snippet.
 */

export function downloadCode(language: string, code: string, title?: string) {
  const ext = extraExt.includes(language)
    ? language
    : monacoLanguages.find(
        item => item.value.toLowerCase() === language?.toLowerCase(),
      )?.ext || "js";

  const blob = new Blob([code], {
    type: "text/plain;charset=utf-8",
  });
  FileSaver.saveAs(blob, `${title || language}.${ext}`);
}
