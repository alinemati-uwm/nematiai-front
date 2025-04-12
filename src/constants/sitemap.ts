import { appLocales } from "../../i18n.config";

export type appSitemapType = {
  items:
    | {
        path: "features";
        pages: Array<
          | "chatbot"
          | "grammar"
          | "rewrite"
          | "image"
          | "podcast"
          | "document"
          | "humanize"
        >;
      }
    | {
        path: "contact";
        pages: [];
      }
    | {
        path: "pricing";
        pages: [];
      }
    | {
        path: "news";
        pages: [];
      };
  sitemap: {
    langs: string[];
    pages: Record<
      "features" | "contact" | "pricing" | "news",
      appSitemapType["items"]
    >;
  };
};

export const appSitemap: appSitemapType["sitemap"] = {
  langs: appLocales,
  pages: {
    features: {
      path: "features",
      pages: [
        "chatbot",
        "grammar",
        "rewrite",
        "image",
        "humanize",
        "document",
        "podcast",
      ],
    },
    contact: {
      path: "contact",
      pages: [],
    },
    pricing: {
      path: "pricing",
      pages: [],
    },
    news: {
      path: "news",
      pages: [],
    },
  },
};
