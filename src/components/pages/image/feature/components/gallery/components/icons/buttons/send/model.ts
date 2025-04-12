const sendGalleryModel = (() => {
  const urlToFile = async (url: string): Promise<File> => {
    // Get the optimized URL dynamically
    const optimizedUrl = getOptimizedUrl(url);

    // Fetch the image as a blob
    const response = await fetch(optimizedUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image. Status: ${response.status}`);
    }
    const blob = await response.blob();

    // Create an Image element and draw it on a Canvas
    const img = document.createElement("img");
    img.src = URL.createObjectURL(blob);

    return new Promise<File>((resolve, reject) => {
      img.onload = () => {
        // Create a Canvas element
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Failed to get canvas context"));
          return;
        }

        // Set Canvas size to image size
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw the image on the Canvas
        ctx.drawImage(img, 0, 0);

        // Convert Canvas to PNG Blob
        canvas.toBlob(pngBlob => {
          if (!pngBlob) {
            reject(new Error("Failed to convert image to PNG"));
            return;
          }

          // Extract filename from URL
          const urlSegments = url.split("/");
          const filename = urlSegments[urlSegments.length - 1].split("?")[0]; // Remove query parameters

          // Return File object with PNG format
          resolve(
            new File([pngBlob], filename.replace(/\.[^/.]+$/, ".png"), {
              type: "image/png",
            }),
          );
        }, "image/png");
      };

      img.onerror = () => {
        reject(new Error("Failed to load image"));
      };
    });
  };

  const getOptimizedUrl = (url: string): string => {
    // Get the current origin of the website (e.g., 'https://example.com')
    const currentOrigin = window.location.origin;

    // If the URL already starts with the Next.js image optimization path, return it as is
    if (url.startsWith(`${currentOrigin}/_next/image`)) {
      return url;
    }

    // URL-encode the provided image URL for use in a query parameter
    const encodedUrl = encodeURIComponent(url);

    // Construct and return the optimized image URL with the desired width (1200px) and quality (75%)
    return `${currentOrigin}/_next/image?url=${encodedUrl}&w=1200&q=75`;
  };

  return { urlToFile };
})();

export default sendGalleryModel;
