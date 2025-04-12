import WorkspaceApps from "@/components/pages/workspace/component/content/apps/WorkspaceApps";
import { WorkspaceMembers } from "@/components/pages/workspace/component/olds/WorkspaceMembers";
import { WorkspaceSettings } from "@/components/pages/workspace/component/olds/WorkspaceSettings";
import { type AppItem } from "@/services/types";

export const spacesTabs = [
  {
    id: "space-tab-1",
    title: "Workspace Apps",
    value: "apps",
    i18TitleKey: "team_tab_label",
    Component: WorkspaceApps,
  },
  {
    id: "space-tab-2",
    title: "Members",
    value: "members",
    i18TitleKey: "members_tab_label",
    Component: WorkspaceMembers,
  },
  {
    id: "space-tab-3",
    title: "Settings",
    value: "settings",
    i18TitleKey: "settings_tab_label",
    Component: WorkspaceSettings,
  },
] as const;

export const apps: AppItem[] = [
  {
    id: "1",
    title: "AI Chatbot",
    description:
      "Chatbot AI refers to the use of artificial intelligence (AI) to create computer programs that can simulate human conversation. These chatbots are designed to interact with users through text or voice, providing information, answering questions, and assisting with various tasks.",
    category: "chat",
    installCount: 1200,
    imageUrl: "/images/gpts/gpt.jpeg",
    url: "/chat",
  },
  {
    id: "2",
    title: "AI Image Generator",
    description:
      "An AI image generator is a tool that uses artificial intelligence to create images. These images can be used for a variety of purposes, such as creating art, generating illustrations for books or articles, or creating visual content for social media.",
    category: "image",
    installCount: 1180,
    imageUrl: "/images/gpts/artist.png",
    url: "/image",
  },
  {
    id: "3",
    title: "AI Chatbot",
    description:
      "Chatbot AI refers to the use of artificial intelligence (AI) to create computer programs that can simulate human conversation. These chatbots are designed to interact with users through text or voice, providing information, answering questions, and assisting with various tasks.",
    category: "chat",
    installCount: 1200,
    imageUrl: "/images/gpts/gpt.jpeg",
    url: "/chat",
  },
  {
    id: "4",
    title: "AI Image Generator",
    description:
      "An AI image generator is a tool that uses artificial intelligence to create images. These images can be used for a variety of purposes, such as creating art, generating illustrations for books or articles, or creating visual content for social media.",
    category: "image",
    installCount: 1180,
    imageUrl: "/images/gpts/artist.png",
    url: "/image",
  },
  {
    id: "5",
    title: "AI Chatbot",
    description:
      "Chatbot AI refers to the use of artificial intelligence (AI) to create computer programs that can simulate human conversation. These chatbots are designed to interact with users through text or voice, providing information, answering questions, and assisting with various tasks.",
    category: "chat",
    installCount: 1200,
    imageUrl: "/images/gpts/gpt.jpeg",
    url: "/chat",
  },
  {
    id: "6",
    title: "AI Image Generator",
    description:
      "An AI image generator is a tool that uses artificial intelligence to create images. These images can be used for a variety of purposes, such as creating art, generating illustrations for books or articles, or creating visual content for social media.",
    category: "image",
    installCount: 1180,
    imageUrl: "/images/gpts/artist.png",
    url: "/image",
  },
  {
    id: "7",
    title: "AI Chatbot",
    description:
      "Chatbot AI refers to the use of artificial intelligence (AI) to create computer programs that can simulate human conversation. These chatbots are designed to interact with users through text or voice, providing information, answering questions, and assisting with various tasks.",
    category: "chat",
    installCount: 1200,
    imageUrl: "/images/gpts/gpt.jpeg",
    url: "/chat",
  },
  {
    id: "8",
    title: "AI Image Generator",
    description:
      "An AI image generator is a tool that uses artificial intelligence to create images. These images can be used for a variety of purposes, such as creating art, generating illustrations for books or articles, or creating visual content for social media.",
    category: "image",
    installCount: 1180,
    imageUrl: "/images/gpts/artist.png",
    url: "/image",
  },
];
