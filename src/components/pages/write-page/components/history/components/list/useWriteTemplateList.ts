import useAppCategory from "@/hooks/category/useAppCategory";

const useWriteTemplateListModel = () => {
  const { getItems } = useAppCategory();
  const items = getItems("ai_write");

  const routes = (() => {
    const result: Partial<Record<AppsType, string>> = {};
    if (!items) return {};

    items?.forEach(item => {
      if (item?.appType) result[item.appType] = item.route;
    });
    return result;
  })();

  return { routes };
};

export default useWriteTemplateListModel;
