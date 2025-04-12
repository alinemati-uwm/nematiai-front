import { extraIcons } from "./extraIcons";
import useCategoryModel from "./model";

export type AllIcons = {
  icon: string;
  classname: string;
};

function useAppCategory() {
  const { menues, flattenMenu } = useCategoryModel;

  const getItems = (key: string) => menues.find(el => el.i18Key === key)?.items;

  const getAllItemsIcon = () => {
    const icons: AllIcons[] = [];
    menues?.forEach(item => {
      item.icon &&
        item.classname &&
        icons.push({ icon: item.icon, classname: item.classname! });
      item?.items?.forEach(item => {
        item.icon &&
          icons.push({ icon: item.icon, classname: item.classname! });
      });
    });
    icons.push(...extraIcons);
    return { icons };
  };

  const getPages = (keys: string[]) => {
    const routes: any = [];
    menues?.map(item => {
      if (keys.includes(item.i18Key)) {
        routes.push(item);
      }
      if (item.items) {
        item.items?.map(item => {
          if (keys.includes(item.i18Key)) {
            routes.push(item);
          }
        });
      }
    });

    return routes;
  };

  return { menues, flattenMenu, getItems, getPages, getAllItemsIcon };
}

export default useAppCategory;
