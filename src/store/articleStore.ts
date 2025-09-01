import { create } from 'zustand';
import { Article, CreateArticleData } from '@/types/article';

interface ArticleStore {
  articles: Article[];
  addArticle: (articleData: CreateArticleData) => void;
  updateArticle: (id: string, articleData: Partial<CreateArticleData>) => void;
  deleteArticle: (id: string) => void;
  getArticle: (id: string) => Article | undefined;
}

export const useArticleStore = create<ArticleStore>((set, get) => ({
  articles: [
    {
      id: '1',
      title: 'Next.jsで記事投稿アプリを作成しよう',
      content: 'Next.jsとTailwind CSSを使用して、美しい記事投稿アプリを作成する方法を紹介します。',
      author: '開発者',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    },
    {
      id: '2',
      title: 'TypeScriptの基本',
      content: 'TypeScriptの基本的な使い方と型システムについて説明します。',
      author: 'プログラマー',
      createdAt: new Date('2024-01-02'),
      updatedAt: new Date('2024-01-02'),
    },
  ],
  
  addArticle: (articleData: CreateArticleData) => {
    const newArticle: Article = {
      id: Date.now().toString(),
      ...articleData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    set((state) => ({
      articles: [newArticle, ...state.articles],
    }));
  },
  
  updateArticle: (id: string, articleData: Partial<CreateArticleData>) => {
    set((state) => ({
      articles: state.articles.map((article) =>
        article.id === id
          ? { ...article, ...articleData, updatedAt: new Date() }
          : article
      ),
    }));
  },
  
  deleteArticle: (id: string) => {
    set((state) => ({
      articles: state.articles.filter((article) => article.id !== id),
    }));
  },
  
  getArticle: (id: string) => {
    return get().articles.find((article) => article.id === id);
  },
}));
