import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Features",
  robots: {
    index: false,
    follow: false,
  },
};
export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
