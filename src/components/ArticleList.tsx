'use client';

import { useArticleStore } from '@/store/articleStore';
import Link from 'next/link';

export default function ArticleList() {
  const { articles, deleteArticle } = useArticleStore();

  const handleDelete = (id: string) => {
    if (confirm('この記事を削除しますか？')) {
      deleteArticle(id);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">記事一覧</h2>
      {articles.length === 0 ? (
        <p className="text-gray-500 text-center py-8">記事がありません</p>
      ) : (
        <div className="grid gap-4">
          {articles.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    <Link
                      href={`/articles/${article.id}`}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {article.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-3 line-clamp-3">
                    {article.content}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>著者: {article.author}</span>
                    <span>
                      {article.createdAt.toLocaleDateString('ja-JP')}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Link
                    href={`/articles/${article.id}/edit`}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
                  >
                    編集
                  </Link>
                  <button
                    onClick={() => handleDelete(article.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
                  >
                    削除
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
