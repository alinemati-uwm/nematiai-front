import { type Metadata } from "next";

import { notFound } from "next/navigation";

import FeatuerPage from "@/components/pages/FeatuerPage";
import { featuersData } from "@/constants/featuers";

export function generateStaticParams() {
  return [
    {
      slug: "chatbot",
    },
    {
      slug: "grammar",
    },
    {
      slug: "translate",
    },
    {
      slug: "rewrite",
    },
    {
      slug: "image",
    },
    {
      slug: "code",
    },
    {
      slug: "chatpdf",
    },
  ];
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const features = featuersData.find(item => item.name === slug);
  return {
    title: `Nemati | ${features?.title} ${features?.higlight}`,
    description: `${features?.text}`,
    robots: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },

    openGraph: {
      type: "website",
      title: `Nerd | ${features?.title} ${features?.higlight}`,
      description: `${features?.text}`,
      url: `https://nerdstudio.ai/${slug}`,
      images: [
        {
          url: `https://nerdstudio.ai${features?.image}`,
          width: 1260,
          height: 800,
          alt: `${slug} pic from Nerd Studio`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Nerd | ${features?.title} ${features?.higlight}`,
      description: `${features?.text}`,
      images: [
        {
          url: `${features?.image}`,
          width: 1260,
          height: 800,
          alt: `${slug} pic from Nerd Studio`,
        },
      ],
    },
    other: {
      "application/ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: `Nerd Studio ${slug}`,
        url: `https://nerdstudio.ai/en/features/${slug}`,
        description: `${features?.text}`,
        mainEntity: {
          "@type": "Thing",
          name: `Nerd Studio ${slug} Features`,
          description: `${features?.text}`,
          image: `https://nerdstudio.ai${features?.image}`,
          url: `https://nerdstudio.ai/features/${slug}`,
        },
        about: {
          "@type": "Thing",
          name: `Nerd ${slug}`,
          description: `${features?.text}`,
        },
        publisher: {
          "@type": "Organization",
          name: "Nerd Studio",
          logo: {
            "@type": "ImageObject",
            url: "https://nerdstudio.ai/images/header/nerd_studio_logo.webp",
            width: 300,
            height: 60,
          },
        },
      }),
    },
  };
}

export default async function FeatuerPages({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const checkUrl = [
    "chatbot",
    "grammar",
    "document",
    "humanize",
    "rewrite",
    "image",
    "podcast",
  ];

  if (!checkUrl.includes(slug)) {
    return notFound();
  } else {
    return <FeatuerPage params={slug} />;
  }
}
