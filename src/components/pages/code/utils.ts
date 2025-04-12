import FileSaver from "file-saver";

import { monacoLanguages } from "@/constants/code";

/**
 * This function downloads a code snippet in the appropriate language extension.
 * It first finds the extension associated with the provided language from the monacoLanguages array.
 * If no matching extension is found, it defaults to 'js'.
 * It then creates a new Blob object from the code, with the MIME type set to 'text/plain;charset=utf-8'.
 * The FileSaver library is used to save the Blob object as a file, with the filename being the language and the extension.
 *
 * @param {string} language - The programming language of the code.
 * @param {string} code - The code snippet to be downloaded.
 */
export function downloadCode(language: string, code: string) {
  const ext =
    monacoLanguages.find(
      item => item.value.toLowerCase() === language?.toLowerCase(),
    )?.ext || "js";

  const blob = new Blob([code], {
    type: "text/plain;charset=utf-8",
  });
  FileSaver.saveAs(blob, `${language}.${ext}`);
}
