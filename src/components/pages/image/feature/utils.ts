const rImageType = /data:(image\/.+);base64,/;

/**
 * This function converts a base64 string to a Blob object.
 * It first extracts the MIME type from the base64 string and stores it in a variable.
 * The base64 string is then decoded and converted to a raw string.
 * The raw string is converted to a Uint8Array, with each character's char code being an element in the array.
 * A Blob object is then created from the Uint8Array, with the MIME type being either the extracted MIME type or a provided MIME type.
 *
 * @param {string} data - The base64 string to be converted to a Blob.
 * @param {string} [toType] - The MIME type to be used for the Blob. If not provided, the MIME type is extracted from the base64 string.
 * @returns {Blob} The Blob object created from the base64 string.
 */
function base64ToBlob(data: string, toType?: string) {
  let mimeString = "";
  let raw, uInt8Array, i;

  raw = data.replace(rImageType, function (header, imageType) {
    mimeString = imageType;
    return "";
  });

  raw = atob(raw);
  const rawLength = raw.length;
  uInt8Array = new Uint8Array(rawLength); // eslint-disable-line

  for (i = 0; i < rawLength; i += 1) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: toType ? toType : mimeString });
}

/**
 * This function downloads an image in the specified format.
 * If the format is 'pdf', it creates a new Image object and sets its source to the base64 encoded image data.
 * When the image is fully loaded, it creates a new canvas element and draws the image on it.
 * The canvas is then converted to a data URL representing the canvas's image data.
 * A new PDF document is created, and the image is added to the document.
 * The PDF document is then saved and the download is initiated.
 * If the format is not 'pdf', it uses the FileSaver library to save the base64 encoded image data as a Blob object.
 * The Blob object is then downloaded in the specified format, or 'jpg' if no format is specified.
 *
 * @param {string} fileName - The name to be used for the downloaded file.
 * @param {string} image - The base64 encoded image data to be downloaded.
 * @param {"png" | "jpg" | "pdf" | "webp"} [ext] - The format to be used for the downloaded file. If not provided, 'jpg' is used.
 * @returns {Promise<void>} A Promise that resolves when the download is initiated.
 */

export const checkImageTransparency = (file: File): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = event => {
      if (event.target) {
        img.src = event.target.result as string;
      }
    };

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (ctx) {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        let transparentFound = false;
        for (let i = 0; i < data.length; i += 4) {
          // Check the alpha channel
          if (data[i + 3] < 255) {
            transparentFound = true;
            break;
          }
        }
        if (!transparentFound) reject("The image is not transparent");
        else resolve(transparentFound);
      } else {
        reject(new Error("Could not get canvas context"));
      }
    };

    img.onerror = error => {
      reject(error);
    };

    reader.onerror = error => {
      reject(error);
    };

    reader.readAsDataURL(file); // Read the file as a data URL
  });
};

const loadImage = (file: File): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();
    reader.onload = e => {
      img.src = e.target?.result as string;
    };
    img.onload = () => resolve(img);
    img.onerror = reject;
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const checkImageSizesEqual = (
  file1: File,
  file2: File,
): Promise<boolean> => {
  return Promise.all([loadImage(file1), loadImage(file2)]).then(
    ([img1, img2]) => img1.width === img2.width && img1.height === img2.height,
  );
};

export const dataURLToBlob = (dataURL: string) => {
  const byteString = atob(dataURL.split(",")[1]);
  const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
  const ab = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    ab[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
};
