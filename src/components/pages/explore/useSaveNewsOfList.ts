import { useSaveOrUnSaveNews } from "@/components/pages/explore/news-actions";
import { useGetSavedNews } from "@/components/pages/explore/news-get";

export const useSaveNewsOfList = () => {
  const { data: savedData } = useGetSavedNews({ pageNumber: 1 });
  const { mutate: mutateSaveOrUnSaveNews } = useSaveOrUnSaveNews();
  const handleSaveNews = (newsId: number, value: boolean) => {
    mutateSaveOrUnSaveNews({ news_id: newsId.toString(), value });
  };

  return {
    savedData,
    handleSaveNews,
  };
};
