import { useDownLoadHandler } from "@/hooks";

type elType = React.MutableRefObject<HTMLElement | null>;

export function useHandleCopyAndDownloadAction(elementRef: elType) {
  function getVisibleInnerHTML(element: HTMLElement) {
    const visibleElements = Array.from(element.children).filter(
      child => !(child as HTMLElement).hidden,
    );
    return visibleElements.map(child => child.outerHTML).join("");
  }
  const { handleDownloadPdf, handleDownloadDocx } =
    useDownLoadHandler(elementRef);

  const copyToClipboard = async () => {
    if (elementRef.current) {
      const htmlContent = getVisibleInnerHTML(elementRef.current); // Get the HTML content

      try {
        // Create a new Blob with the HTML content
        const blob = new Blob([htmlContent], { type: "text/html" });

        // Use Clipboard API to copy the Blob to the clipboard
        await navigator.clipboard.write([
          new ClipboardItem({
            "text/html": blob,
            "text/plain": htmlContent, // Optionally add plain text
          }),
        ]);
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
    }
  };

  return { handleDownloadPdf, handleDownloadDocx, copyToClipboard };
}
