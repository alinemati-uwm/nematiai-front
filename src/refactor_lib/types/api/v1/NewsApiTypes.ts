export interface NewsTopic {
  getTopic: {
    news: [
      {
        id: string;
        description: string;
        summarize_text: string;
        images: string;
        published_date: string;
        publisher: string;
        source_url: string;
        title: string;
        topic: {
          title: string;
          slug: string;
        };
        url: string;
        type: string;
        related: [
          {
            articleTitle: string;
            url: string;
            source: string;
            time: string;
            snippet: string;
          },
        ];
        location: 0;
        views_count: 0;
      },
    ];
    max_pages: 0;
    current_page: 1;
    items_per_page: 10;
  };
  getAllNewsData: {
    news: [
      {
        id: string;
        description: string;
        summarize_text: string;
        images: string;
        published_date: string;
        publisher: string;
        source_url: string;
        title: string;
        topic: {
          title: string;
          slug: string;
        };
        url: string;
        type: string;
        related: [
          {
            articleTitle: string;
            url: string;
            source: string;
            time: string;
            snippet: string;
          },
        ];
        location: number;
        keywords: string;
        views_count: number;
        is_read: boolean;
      },
    ];
    max_pages: number;
    current_page: number;
    items_per_page: number;
  };
  getPageById: {
    news: {
      id: string;
      description: string;
      summarize_text: string;
      images: string;
      published_date: string;
      publisher: string;
      source_url: string;
      title: string;
      topic: {
        title: string;
        slug: string;
      };
      url: string;
      type: string;
      related: [
        {
          articleTitle: string;
          url: string;
          source: string;
          time: string;
          snippet: string;
        },
      ];
      location: number;
      keywords: string;
      views_count: number;
      likes_count: number;
      dislikes_count: number;
      is_read: false;
      is_liked: false;
    };
    max_pages: number;
    current_page: number;
    items_per_page: number;
    comments: [
      {
        user: {
          email: string;
          username: string;
          first_name: string;
          last_name: string;
          profile_image: string;
        };
        content: string;
        status: string;
        created_at: Date;
      },
    ];
    user_view_count: number;
    total_view_count: number;
  };
}
