export interface CommentItem {
  id: number;
  user_username: string;
  user_profile_picture: string;
  created_at: string;
  user_liked: boolean;
  user_disliked: boolean;
  like_count: number;
  dislike_count: number;
  reply_count: number;
  text: string;
}

export interface GetWithPageRes {
  current_page: number;
  max_pages: number;
  total_items: number;
}

export interface BaseNews {
  id: number;
  title: string;
  summary: string;
  sources: string;
  image_urls: string;
  created_at: string;
  category: {
    id: number;
    name: string;
    image: string;
  };
}

export interface ExploreNewsData {
  getAllNewsList: { news: BaseNews[] } & GetWithPageRes;
  responseData: {
    message: string;
    status: string;
  };
  getNewsCategories: {
    id: number;
    name: string;
    image: string;
    is_favorited: boolean;
  }[];
  mutateFavoriteCategories: {
    category_ids: number[];
  };
  getNewsDataById: BaseNews & {
    full_description: string;
    comment_count: number;
    like_count: number;
    dislike_count: number;
    view_count: number;
    related_news: {
      id: number;
      title: string;
      summary: string;
      image_urls: string;
      created_at: string;
    }[];

    is_saved: boolean;
    user_liked: boolean;
    user_disliked: boolean;
    comments: [];
  };
  mutateLikeNews: {
    news_id: number;
    action: string;
  };
  disLikeNews: {
    news_id: number;
    action: string;
  };

  mutateComment: {
    news_id: number;
    parent_id: number;
    text: string;
    reply_to?: string;
  };
  getCommentById: GetWithPageRes & {
    comments: CommentItem[];
  };
  getCommentsReply: GetWithPageRes & {
    replies: CommentItem[];
  };
  mutate_Like_Dislike_Comment: {
    comment_id: number;
    action: string;
  };
  mutateReport: {
    news_id: number;
    report_reason: string;
    feedback_text: string;
  };
  mutateCommentReport: {
    comment_id: number;
    feedback_text: string;
  };
  mutateSaveNews: {
    news_id: number;
  };
}
