import type React from "react";
import { useState } from "react";

import html2canvas from "html2canvas";

import { type CropData } from "@/components/pages/chat-pdf/componets/MainChatPdfComponent";
import { generateRandomKey } from "@/lib/utils";
import { useChatPdfStore } from "@/stores/zustand/chat-pdf-store";

type FilesType = Record<string, File>;

interface Props {
  containerRef: React.MutableRefObject<HTMLDivElement | null>;
  addFile: (({ files }: { files: File[] }) => void) | undefined;
  cropData: CropData | null;
  setCropData: React.Dispatch<React.SetStateAction<CropData | null>>;
  isCropping: boolean;
  setIsCropping: React.Dispatch<React.SetStateAction<boolean>>;
  showConfirmModal: boolean;
  setShowConfirmModal: React.Dispatch<React.SetStateAction<boolean>>;
  scrollDocumentRef: React.MutableRefObject<HTMLDivElement | null>;
}

const useCropPdf = ({
  containerRef,
  scrollDocumentRef,
  addFile,
  setCropData,
  isCropping,
  setIsCropping,
  cropData,
  showConfirmModal,
  setShowConfirmModal,
}: Props) => {
  // const [cropData, setCropData] = useState<CropData | null>(null);
  // const [isCropping, setIsCropping] = useState<boolean>(false);
  const [isCropActive, setIsCropActive] = useState<boolean>(false);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  // const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [cropIsLoading, setCropIsLoading] = useState<boolean>(false);
  const addMessage = useChatPdfStore.use.addMessage();

  const addBase64Image = (base64: string, fileName: string) => {
    const mimeType = base64.match(/^data:(.*?);base64,/)?.[1];
    const byteString = atob(base64.split(",")[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeType });
    const file = new File([blob], fileName, { type: mimeType });
    addFile && addFile({ files: [file] });
  };

  const handleConfirmOcr = async () => {
    // processCropData();
    await cropAndSave();
    addMessage("user", "Taken picture is sent");
    setCropData(null);
  };

  const handleCancelOcr = () => {
    setIsCropping(false);
    setIsCropActive(false);
    setShowConfirmModal(false);
    setCropData(null);
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isCropActive || !containerRef.current) return;

    setIsCropping(true);
    if (scrollDocumentRef.current) {
      const rect = scrollDocumentRef.current.getBoundingClientRect();

      const startX =
        event.clientX - rect.left + scrollDocumentRef.current.scrollLeft;
      const startY =
        event.clientY - rect.top + scrollDocumentRef.current.scrollTop;

      setCropData({
        startX,
        startY,
        endX: startX,
        endY: startY,
      });
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isCropping || !cropData || !containerRef.current) return;

    if (scrollDocumentRef.current) {
      const rect = scrollDocumentRef.current.getBoundingClientRect();
      const endX =
        event.clientX - rect.left + scrollDocumentRef.current.scrollLeft;
      const endY =
        event.clientY - rect.top + scrollDocumentRef.current.scrollTop;

      setCropData({
        ...cropData,
        endX,
        endY,
      });
    }
  };

  const handleMouseUp = () => {
    if (!isCropping || !cropData) return;
    setIsCropping(false);
    setShowConfirmModal(true);
  };

  const captureImage = async (
    divRef: React.MutableRefObject<HTMLDivElement | null>,
  ) => {
    if (!divRef.current) return;

    const container = divRef.current;
    const scale = 2;

    // Calculate potential size
    const originalWidth = container.offsetWidth;
    const originalHeight = container.offsetHeight;

    const maxCanvasSize = 16384; // Browser's typical max size

    // Adjust scale if it exceeds the max size
    const adjustedScale = Math.min(
      scale,
      maxCanvasSize / originalWidth,
      maxCanvasSize / originalHeight,
    );

    try {
      const canvas = await html2canvas(container, {
        scale: adjustedScale, // Use adjusted scale
        useCORS: true,
        backgroundColor: "#fff",
      });
      const imageData = canvas.toDataURL("image/png");
      return imageData;
    } catch (error) {
      console.error("Error capturing the image:", error);
    }
  };

  const cropAndSave = async () => {
    if (!containerRef.current) return;
    if (!cropData || !containerRef.current) return;
    setCropIsLoading(true);
    const { startX, startY, endX, endY } = cropData;
    const cropWidth = Math.abs(endX - startX);
    const cropHeight = Math.abs(endY - startY);

    const realWidth = containerRef.current.offsetWidth;
    const realHeight = containerRef.current.offsetHeight;

    try {
      const imageData = await captureImage(containerRef);
      const image = new Image();
      image.src = imageData || "";

      image.onload = () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        const scaleX = image.width / realWidth;
        const scaleY = image.height / realHeight;

        if (context) {
          // Define the section to crop (adjust the coordinates and size as needed)
          const cropX = startX * scaleX;
          const cropY = startY * scaleY;
          const cropW = cropWidth * scaleX;
          const cropH = cropHeight * scaleY;
          //2px for remove red border before croping
          const sizeborderX = 2 * scaleX;
          const sizeborderY = 2 * scaleY;

          // Set the canvas size to the desired cropped size
          canvas.width = cropWidth;
          canvas.height = cropHeight;

          // Draw the cropped section of the image onto the canvas
          context.drawImage(
            image,
            cropX + sizeborderX,
            cropY + sizeborderY,
            cropW - 2 * sizeborderX,
            cropH - 2 * sizeborderY,
            sizeborderX,
            sizeborderY,
            cropWidth - 2 * sizeborderX,
            cropHeight - 2 * sizeborderY,
          );
          const croppedDataURL = canvas.toDataURL("image/png");
          setCroppedImage(croppedDataURL);
          addBase64Image(
            croppedDataURL,
            "image" + generateRandomKey() + ".png",
          );
        }
      };
    } catch (error) {
      console.log("error", error);
    } finally {
      setCropIsLoading(false);
      setIsCropping(false);
      setIsCropActive(false);
      setShowConfirmModal(false);
    }
  };

  return {
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    isCropping,
    setIsCropping,
    isCropActive,
    setIsCropActive,
    cropData,
    setCropData,
    croppedImage,
    showConfirmModal,
    setShowConfirmModal,
    handleConfirmOcr,
    handleCancelOcr,
    cropIsLoading,
  };
};

export default useCropPdf;
