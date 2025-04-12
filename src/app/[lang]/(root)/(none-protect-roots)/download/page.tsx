import { type Metadata } from "next";

import dynamic from "next/dynamic";

import NonProtectedLoading from "@/components/shared/non-protected-loading";

const Download = dynamic(() => import("@/components/pages/download"), {
  loading: () => <NonProtectedLoading />,
});

export const metadata: Metadata = {
  title: "Download all Nemati AI features",
  description:
    "In addition to the site, Nemati AI also offers extensions and mobile apps to users.",
  openGraph: {
    type: "website",
    title: "Download Nemati AI Features",
    description:
      "Take advantage of all the facilities of Nemati AI by downloading its extension and mobile app.",
    url: "https://nerdstudio.ai/download",
    images: [
      {
        url: "https://nemati.ai/images/common/logo.svg",
        width: 1260,
        height: 800,
        alt: "The logo belongs to Nemati AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Download Nemati AI Features",
    description:
      "Take advantage of all the facilities of Nemati AI by downloading its extension and mobile app.",
    images: [
      {
        url: "https://nemati.ai/images/common/logo.svg",
        width: 1260,
        height: 800,
        alt: "extension and mobile app picture",
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
  keywords: [
    "Nemati AI",
    "download Nemati AI",
    "Nemati AI extensions",
    "extensions",
    "Nemati AI mobile apps",
    "mobile apps",
  ],
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Download Nemati AI Features",
      description:
        "Take advantage of all the facilities of Nemati AI by downloading its extension and mobile app.",
      url: "https://nemati.ai/download",
      isPartOf: {
        "@type": "WebSite",
        url: "https://nemati.ai",
        name: "Nemati AI",
      },
      publisher: {
        "@type": "Organization",
        name: "Nemati AI",
        logo: {
          "@type": "ImageObject",
          url: "https://nemati.ai/images/common/logo.svg",
          width: 300,
          height: 100,
        },
      },
      datePublished: "2024-11-25",
      dateModified: "2024-11-25",
      alternateName: "NAI",
    }),
  },
};
export default function DownloadPage() {
  return <Download />;
}
