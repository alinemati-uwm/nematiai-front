import { type Metadata } from "next";

import dynamic from "next/dynamic";

import NonProtectedLoading from "@/components/shared/non-protected-loading";
import { type LangParams } from "@/services/types";

export const metadata: Metadata = {
  title: "Plans & Pricing ",
  description:
    "Examine the various pricing options for Nerd Studio, including the Free, Basic, and Pro plans.",
  openGraph: {
    type: "website",
    title: "Plans & Pricing",
    description:
      "Examine the various pricing options for Nerd Studio, including the Free, Basic, and Pro plans.",
    url: "https://nerdstudio.ai/pricing",
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
    title: "Plans & Pricing",
    description:
      "Examine the various pricing options for Nerd Studio, including the Free, Basic, and Pro plans.",
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
  keywords: ["Nerd Studio", "Nerd Studio Plans & Pricing"],
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Pricing - Nerd Studio",
      url: "https://nerdstudio.ai/pricing",
      description:
        "Examine the various pricing options for Nerd Studio, including the Free, Basic, and Pro plans.",
      mainEntity: {
        "@type": "Product",
        name: "Nerd Studio Pricing Plans",
        url: "https://nerdstudio.ai/pricing",
        description:
          "Choose the plan that fits your needs. Nerd Studio offers Free, Basic, Pro, and Premium plans with different features and benefits.",
        offers: [
          {
            "@type": "Offer",
            priceCurrency: "USD",
            price: "0",
            priceValidUntil: "2025-12-31",
            url: "https://nerdstudio.ai/pricing",
            name: "Free Plan",
            eligibleRegion: {
              "@type": "Place",
              name: "Worldwide",
            },
            description:
              "Free plan with 100 daily credits, perfect for individual use.",
          },
          {
            "@type": "Offer",
            priceCurrency: "USD",
            price: "9.99",
            priceValidUntil: "2025-12-31",
            url: "https://nerdstudio.ai/pricing",
            name: "Basic Plan",
            eligibleRegion: {
              "@type": "Place",
              name: "Worldwide",
            },
            description:
              "Basic plan with more credits and additional features for casual users.",
          },
          {
            "@type": "Offer",
            priceCurrency: "USD",
            price: "19.99",
            priceValidUntil: "2025-12-31",
            url: "https://nerdstudio.ai/pricing",
            name: "Pro Plan",
            eligibleRegion: {
              "@type": "Place",
              name: "Worldwide",
            },
            description:
              "Pro plan for professional users with enhanced features and premium support.",
          },
          {
            "@type": "Offer",
            priceCurrency: "USD",
            price: "29.99",
            priceValidUntil: "2025-12-31",
            url: "https://nerdstudio.ai/pricing#premium",
            name: "Premium Plan",
            eligibleRegion: {
              "@type": "Place",
              name: "Worldwide",
            },
            description:
              "Premium plan with all features, including unlimited credits and priority support.",
          },
        ],
      },
      datePublished: "2024-11-25",
      dateModified: "2024-11-25",
      alternateName: "Nerd Studio AI",
    }),
  },
};

const Pricing = dynamic(() => import("@/components/pages/pricing"), {
  loading: () => <NonProtectedLoading />,
});

function PricingPage({ params }: LangParams) {
  return <Pricing params={params} />;
}
export default PricingPage;
