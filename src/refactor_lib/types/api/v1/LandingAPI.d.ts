export interface LandingAPIRequest {
  createContactUs: {
    name: string;
    email: string;
    message: string;
  };
}

export interface LandingAPIResponse {
  getLandingData: {
    comments: Array<{
      name: string;
      handler: string;
      avatar: string;
      city: string;
      country: string;
      image: string;
      rate: number;
      comment: string;
      social_media: string;
    }>;
    faqs: Array<{
      title: string;
      description: string;
    }>;
    hero: {
      title: string;
      description: string;
      rate: number;
      download_link: string;
    };
    downloadlinks: Array<{
      title: string;
      url: string;
      status: boolean;
    }>;
  };
  createContactUs: {
    name: string;
    email: string;
    message: string;
  };
  meetOurTeam: Array<{
    id: number;
    name: string;
    family: string;
    avatar: string;
    role: {
      title: string;
    };
    joined_team: Date;
    leave_team: Date;
    about: string;
    review: string;
    services: string;
    favorites: string;
    weight: number;
    social_media: [
      {
        handler: string;
        social_media: {
          title: string;
          logo: string;
          url: string;
        };
      },
    ];
  }>;
  getSingleTeamMember: {
    id: number;
    name: string;
    family: string;
    avatar: string;
    role: {
      title: string;
    };
    joined_team: Date;
    leave_team: Date;
    about: string;
    review: string;
    services: string;
    favorites: string;
    weight: number;
    social_media: [
      {
        handler: string;
        social_media: {
          title: string;
          logo: string;
          url: string;
        };
      },
    ];
  };
}
