export const commentKeys = {
  getComments: (newsId: number) => ["news-comments", { newsId }],
  getReply: (commentId: number) => ["news-comments-reply", { commentId }],
};

export const newsKeys = {
  getNews: (categoryId: number) => ["get-new", { categoryId }],
  getById: (newsId: string) => ["new-by-id", { newsId }],
  categories: ["news-categories"],
  userNews: () => ["user-news"],
  savedNews: () => ["saved-news"],
};
