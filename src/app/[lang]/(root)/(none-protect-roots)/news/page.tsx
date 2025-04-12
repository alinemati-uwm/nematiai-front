import News from "@/components/pages/news";
import { getAllNewsData } from "@/components/pages/news/GetAllNews";
import NonProtectedLoading from "@/components/shared/non-protected-loading";
import { getDictionary } from "@/lib/dictionary";
import { metadataBase } from "@/constants/app-info";
import type { LangParams } from "@/services/types";

export async function generateMetadata() {
  return {
    title: "News-The most up-to-date news of the day",
    description:
      "The most up-to-date and hot news of the world in Nerd Studio is now available to all users of this website.",

    openGraph: {
      type: "website",
      title: "News-The most up-to-date news of the day",
      description:
        "The most up-to-date and hot news of the world in Nerd Studio is now available to all users of this website.",
      url: "https://nerdstudio.ai/news",
      images: [
        {
          url: "https://nerdstudio.ai/images/header/nerd_studio_logo.webp",
          width: 1260,
          height: 800,
          alt: "The logo belongs to Nerd Studio",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "News-The most up-to-date news of the day",
      description:
        "The most up-to-date and hot news of the world in Nerd Studio is now available to all users of this website.",
      images: [
        {
          url: "https://nerdstudio.ai/images/header/nerd_studio_logo.webp",
          width: 1260,
          height: 800,
          alt: "The logo belongs to Nerd Studio",
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
    keywords: ["Nerd Studio", "Nerd Studio News, News "],
    other: {
      "application/ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        url: metadataBase + "/en/news",
        name: "Nerd Studio News",
        description:
          "The most up-to-date and hot news of the world in Nerd Studio is now available to all users of this website.",
      }),
    },
  };
}

const NewsPage = async ({
  searchParams,
  params,
}: { searchParams: { page: string } } & LangParams) => {
  await getDictionary(params.lang);

  const data = await getAllNewsData(
    searchParams.page ? parseInt(searchParams.page) : 1,
  );
  return data ? <News data={data.data} /> : <NonProtectedLoading />;
};
export default NewsPage;
