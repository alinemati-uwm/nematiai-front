import axiosClient from "@/services/axios-client";

export interface LandingComment {
  name: string;
  handler: string;
  avatar: string;
  city: string;
  country: string;
  image: string;
  rate: number;
  comment: string;
  social_media: string;
}

export interface LandingService {
  app: string;
  image: string;
  description: string;
}

export interface LandingIntroduce {
  file: string;
  url: string;
  is_showing: boolean;
}

export interface LandingFaq {
  title: string;
  description: string;
}

export interface LandingTemplate {
  id: number;
  topic: string;
  task: string;
  prompt: string;
  params: Record<string, any>;
}

export interface LandingApp {
  category_name: string;
  templates: LandingTemplate[];
}

export interface Landing {
  comments: LandingComment[];
  services: LandingService[];
  introduce: LandingIntroduce;
  faqs: LandingFaq[];
  apps: LandingApp[];
  downloadlinks: string[];
}

export async function getLandingData() {
  try {
    const { data } = await axiosClient.get<Landing>(
      "/landing/get_landing_data/",
    );
    return data;
  } catch (error) {
    // Handle the error here
    console.error("Error fetching data:", error);
    // You can choose to throw the error again to propagate it
    // throw error;
  }
}
