import { type Metadata } from "next";

import dynamic from "next/dynamic";

import NonProtectedLoading from "@/components/shared/non-protected-loading";
import { type LangParams } from "@/services/types";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Get in touch with Nerd Studio for support, inquiries, and more.",
  openGraph: {
    type: "website",
    title: "Contact us",
    description:
      "Get in touch with Nerd Studio for support, inquiries, and more.",
    url: "https://nerdstudio.ai/contact",
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
    title: "Contact us",
    description:
      "Get in touch with Nerd Studio for support, inquiries, and more.",
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
  keywords: ["Nerd Studio", "Contact Nerd Studio"],
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Contact Us - Nerd Studio",
      url: "https://nerdstudio.ai/contact",
      description:
        "Get in touch with Nerd Studio for support, inquiries, and more.",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "(+1) 971 400 2132",
        contactType: "customer service",
        areaServed: "Worldwide",
        availableLanguage: "English",
      },
      publisher: {
        "@type": "Organization",
        name: "Nerd Studio",
        logo: {
          "@type": "ImageObject",
          url: "https://nerdstudio.ai/images/header/nerd_studio_logo.webp",
          width: 300,
          height: 100,
        },
        url: "https://nerdstudio.ai",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "7343 N Teutonia Ave Milwaukee",
        addressLocality: "City",
        addressRegion: "WI",
        postalCode: "53209",
        addressCountry: "US",
      },
      datePublished: "2024-11-25",
      dateModified: "2024-11-25",
    }),
  },
};
const ContactUs = dynamic(() => import("@/components/pages/contact-us"), {
  loading: () => <NonProtectedLoading />,
});
function ContactUsPage({ params }: LangParams) {
  return <ContactUs params={params} />;
}
export default ContactUsPage;
