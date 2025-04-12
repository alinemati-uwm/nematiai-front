import { type Metadata } from "next";

import { notFound } from "next/navigation";

import NewsDetailPage from "@/components/pages/news/components/newsDetailPage";
import { getPageNewsById } from "@/components/pages/news/GetAllNews";

export async function generateMetadata({
  params,
}: {
  params: { newsId: string };
}): Promise<Metadata> {
  const data = await getPageNewsById(params.newsId);
  const newsPageData = data?.data.news;
  return {
    title: `${newsPageData?.title}`,
    description: `${newsPageData?.description}`,
    robots: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
    alternates: {
      canonical: `https://nerdstudio/news/${params.newsId}`,
    },

    openGraph: {
      type: "website",
      title: `${newsPageData?.title}`,
      description: `${newsPageData?.description}`,
      url: "https://nerdstudio.ai/news",
      images: [
        {
          url: `${newsPageData?.images}`,
          width: 1260,
          height: 800,
          alt: "News pic from Nerd Studio",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${newsPageData?.title}`,
      description: `${newsPageData?.description}`,
      images: [
        {
          url: `${newsPageData?.images}`,
          width: 1260,
          height: 800,
          alt: "News pic from Nerd Studio",
        },
      ],
    },
    other: {
      "application/ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: `${newsPageData?.title}`,
        description: `${newsPageData?.description}`,
        url: `https://nerdstudio.ai/en/news/${params.newsId}`,
        datePublished: `${newsPageData?.published_date}`,
        dateModified: "2024-11-26T09:00:00+00:00",
        author: {
          "@type": "Person",
          name: `${newsPageData?.publisher}`,
        },
        publisher: {
          "@type": "Organization",
          name: "NerdStudio",
          logo: {
            "@type": "ImageObject",
            url: "https://nerdstudio.ai/images/header/nerd_studio_logo.webp",
            width: 300,
            height: 60,
          },
        },
        image: {
          "@type": "ImageObject",
          url: `${newsPageData?.images}`,
          width: 1200,
          height: 630,
          alt: "News picture from Nerd Studio",
        },
        mainEntityOfPage: `https://nerdstudio.ai/news/${params.newsId}`, //WARNING: => check local language
        keywords: `${newsPageData?.keywords}`,
        inLanguage: "en",
        contentRating: "PG",
        articleBody: `${newsPageData?.summarize_text}`,
      }),
    },
  };
}
const NewsId = async ({
  params: { newsId },
}: {
  params: { newsId: string };
}) => {
  const data = await getPageNewsById(newsId);

  {
    data ? (
      <>
        <NewsDetailPage newsPageData={data?.data.news} newsId={newsId} />
      </>
    ) : (
      notFound()
    );
  }
};

export default NewsId;
