import { useGetDictionary } from "@/hooks";

function useImageTab() {
  const {
    page: {
      image: { image_to_image_tab_label, image_creation, upscale_tab_label },
    },
  } = useGetDictionary();

  const tabsCaption: any = {
    "text-to-image": image_creation,
    "image-to-image": image_to_image_tab_label,
    "image-upscale": upscale_tab_label,
  };

  return { tabsCaption };
}

export default useImageTab;
