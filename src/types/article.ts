export interface Article {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateArticleData {
  title: string;
  content: string;
  author: string;
}
