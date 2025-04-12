import { type Metadata } from "next";

import { metadataBase } from "@/constants/app-info";
import { getLandingData } from "@/services/static-pages/landing";
import { type LangParams } from "@/services/types";

import Faqs from "../../../../../components/pages/faqs";

export const metadata: Metadata = {
  title: "Here are your FAQS",
  description:
    "We have listed for you the answers to all the common questions that may arise in the minds of the general public about Nerd Studio.",
  alternates: {
    canonical: metadataBase + "/faqs",
    languages: {
      en: metadataBase + "/en/faqs",
      ab: metadataBase + "/ab/faqs",
    },
  },
  openGraph: {
    type: "website",
    title: "Here are your FAQS",
    description:
      "We have listed for you the answers to all the common questions that may arise in the minds of the general public about Nerd Studio.",
    url: "https://nerdstudio.ai/faqs",
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
    title: "Here are your FAQS",
    description:
      "We have listed for you the answers to all the common questions that may arise in the minds of the general public about Nerd Studio.",
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
  keywords: ["Nerd Studio", "Nerd Studio Faqs"],
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      url: "https://nerdstudio.ai/faqs",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is Nerd Studio free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can register for free to use Nerd Studio without a credit card. Free accounts receive 30 credits daily. For additional credits, consider purchasing a Basic, Pro, or Premium Plan.",
          },
        },
        {
          "@type": "Question",
          name: "How can I download Nerd Studio extensions?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can download Nerd Studio extensions by visiting our download page at https://nerdstudio.ai/download.",
          },
        },
        {
          "@type": "Question",
          name: "How to upgrade, downgrade, or manage subscription plans?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "To upgrade, downgrade, or change your plan, go to the Nerd Studio web, click on Settings in the bottom left, and select Upgrade.",
          },
        },
        {
          "@type": "Question",
          name: "How to cancel my subscription?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "To cancel your subscription, downgrade to the free version or upgrade to cancel, effective at the end of your billing cycle.",
          },
        },
        {
          "@type": "Question",
          name: "What are credits?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Nerd Studio tracks credit usage for debugging and running applications, with varying credit consumption across different AI models.",
          },
        },
        {
          "@type": "Question",
          name: "Can I use Ai-generated content for commercial use?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Licensing for commercial use differs by model, with most being available for commercial use and a few having restrictions.",
          },
        },
      ],
      datePublished: "2024-11-25",
      dateModified: "2024-11-25",
      alternateName: "Nerd Studio AI",
    }),
  },
};

async function FaqsPage({ params }: LangParams) {
  const data = await getLandingData();
  return <Faqs params={params} data={data} />;
}
export default FaqsPage;
