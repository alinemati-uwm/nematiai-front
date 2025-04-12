import type { MetadataRoute } from "next";

import { metadataBase } from "@/constants/app-info";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: metadataBase,
      lastModified: "2025-03-31T17:03:15.501Z",
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: metadataBase + "/faqs",
      lastModified: "2025-03-31T17:03:15.501Z",
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: metadataBase + "/contact",
      lastModified: "2025-03-31T17:03:15.501Z",
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: metadataBase + "/pricing",
      lastModified: "2025-03-31T17:03:15.501Z",
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: metadataBase + "/news",
      lastModified: "2025-03-31T17:03:15.501Z",
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];
}
