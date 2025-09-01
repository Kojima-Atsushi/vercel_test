'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useArticleStore } from '@/store/articleStore';
import { CreateArticleData } from '@/types/article';

interface ArticleFormProps {
  articleId?: string;
  mode: 'create' | 'edit';
}

export default function ArticleForm({ articleId, mode }: ArticleFormProps) {
  const router = useRouter();
  const { addArticle, updateArticle, getArticle } = useArticleStore();
  const [formData, setFormData] = useState<CreateArticleData>({
    title: '',
    content: '',
    author: '',
  });

  useEffect(() => {
    if (mode === 'edit' && articleId) {
      const article = getArticle(articleId);
      if (article) {
        setFormData({
          title: article.title,
          content: article.content,
          author: article.author,
        });
      }
    }
  }, [mode, articleId, getArticle]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'create') {
      addArticle(formData);
      router.push('/');
    } else if (mode === 'edit' && articleId) {
      updateArticle(articleId, formData);
      router.push(`/articles/${articleId}`);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {mode === 'create' ? '新しい記事を作成' : '記事を編集'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            タイトル
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="記事のタイトルを入力してください"
          />
        </div>

        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
            著者
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="著者名を入力してください"
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
            内容
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows={10}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
            placeholder="記事の内容を入力してください"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            {mode === 'create' ? '作成' : '更新'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            キャンセル
          </button>
        </div>
      </form>
    </div>
  );
}
