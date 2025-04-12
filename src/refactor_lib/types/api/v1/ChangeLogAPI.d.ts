export interface ChangeLogAPIResponse {
  getAllChangeLogs: Array<{
    title: string;
    changelog: [
      {
        title: string;
        description: string;
      },
    ];
  }>;
  getAllBanners: Array<{
    image: string;
  }>;
  getAboutUs: {
    logo: string;
    title: string;
    about: string;
    policy: string;
    terms: string;
  };
  about: {
    logo: string;
    title: string;
    about: string;
    policy: string;
    terms: string;
  };
}
