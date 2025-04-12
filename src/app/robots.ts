import type { MetadataRoute } from "next";

import { metadataBase } from "@/constants/app-info";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/chat",
        "/chatpdf",
        "/code",
        "/document",
        "/grammar",
        "/image",
        "/rewrite",
        "/template",
        "/translate",
        "/app-store",
        "/dashboard",
        "/workspace",
        "/payment",
        "/forms",
        "/login",
        "/signup",
      ],
    },
    sitemap: metadataBase + "/sitemap.xml",
  };
}
