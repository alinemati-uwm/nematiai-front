/**
 * Converts a given HTML string to a format suitable for a Word document.
 *
 * This function wraps the provided HTML string with the necessary headers and footers
 * to create a complete HTML document. It then encodes this document as a data URL
 * with the MIME type for a Word document.
 *
 * @param {string} value - The HTML string to be converted.
 * @returns string - A data URL representing the Word document.
 */
export function convertInnerHtmlToDocx(value: string) {
  const header =
    "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
    "xmlns:w='urn:schemas-microsoft-com:office:word' " +
    "xmlns='http://www.w3.org/TR/REC-html40'>" +
    "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
  const footer = "</body></html>";
  const sourceHTML = header + value + footer;

  const source =
    "data:application/vnd.ms-word;charset=utf-8," +
    encodeURIComponent(sourceHTML);

  return source;
}
