import type defaultLang from "@/config/dictionaries/en.json";

export type items = {
  icon?: string;
  classname?: string;
  appType?: AppsType;
} & Pick<appMenuesType, "i18Key" | "route">;

export type appMenuesType = {
  i18Key: keyof typeof defaultLang.components.menu;
  route: string;
  icon: string;
  activeIcon: string;
  items: items[];
  classname?: string;
};

const useCategoryModel = (() => {
  const menues: appMenuesType[] = [
    {
      i18Key: "chatbot",
      icon: "ri:chat-ai-line",
      activeIcon: "ri:chat-ai-fill",
      route: "/chat",
      classname: "bg-primary-lighter text-primary",
      items: [],
    },
    {
      i18Key: "ai_write",
      icon: "ph:pen-nib-light",
      activeIcon: "ph:pen-nib-fill",
      classname: "bg-orange-lighter text-orange",
      route: "/write",
      items: [
        {
          i18Key: "document",
          route: "/write/document",
          appType: "personal",
          classname: "bg-info-lighter text-info",
          icon: "fluent:document-32-regular",
        },
        {
          i18Key: "rewrite",
          route: "/write/rewrite",
          classname: "bg-success-lighter text-success",
          appType: "ai_writer",
          icon: "iconamoon:edit-light",
        },
        {
          i18Key: "grammar",
          route: "/write/grammar",
          classname: "bg-magenta-lighter text-magenta",
          appType: "grammar",
          icon: "ic:outline-text-fields",
        },
        {
          i18Key: "humanize",
          route: "/write/humanize",
          classname: "bg-warning-lighter text-warning-dark",
          appType: "humanize",
          icon: "solar:user-linear",
        },
        {
          i18Key: "mindmap",
          route: "/write/mind-map",
          classname: "bg-success-lighter text-success-dark",
          appType: "mind-map",
          icon: "material-symbols:graph-3",
        },
      ],
    },
    {
      i18Key: "ai_image",
      icon: "fluent:image-sparkle-20-regular",
      activeIcon: "fluent:image-sparkle-20-filled",
      route: "/image",
      items: [
        {
          i18Key: "image_editor",
          route: "/image/editor",
          classname: "bg-success-lighter text-success",
          icon: "material-symbols:image-outline",
        },
        {
          i18Key: "image_creation",
          route: "/image/text-to-image",
          appType: "text_to_image",
        },
        {
          i18Key: "image_to_image",
          route: "/image/image-to-image",
          appType: "image_to_image",
          icon: "fluent:image-sparkle-20-regular",
          classname: "bg-primary-lighter text-primary",
        },
        {
          i18Key: "resizing",
          route: "/image/image-upscale",
          appType: "image_upscale",
        },
      ],
    },
    {
      i18Key: "ai_voice",
      icon: "ri:chat-voice-ai-line",
      activeIcon: "ri:chat-voice-ai-fill",
      classname: "bg-orange-lighter text-orange",
      route: "/podcast",
      items: [
        {
          i18Key: "podcast",
          route: "/podcast",
          appType: "podcast",
        },
      ],
    },
    {
      i18Key: "explore",
      icon: "material-symbols:explore-outline",
      activeIcon: "material-symbols:explore",
      classname: "bg-magenta-lighter text-magenta",
      route: "/explore?categoryId=1",
      items: [],
    },
    {
      i18Key: "prompt_library",
      icon: "icon-park-outline:bookmark",
      activeIcon: "icon-park-solid:bookmark",
      route: "/template",
      classname: "bg-info-lighter text-info",
      items: [],
    },
  ];

  const flattenMenu = menues.flatMap(({ i18Key, icon, route, items }) => {
    const parent = { i18Key, icon, route };
    const children = items.map(item => ({
      i18Key: item.i18Key,
      icon: item.icon ? item.icon : parent.icon,
      route: `${item.route}`,
      className: item.classname,
    }));
    return [parent, ...children];
  });

  return { menues, flattenMenu };
})();

export default useCategoryModel;
