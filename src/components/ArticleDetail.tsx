'use client';

import { useArticleStore } from '@/store/articleStore';
import Link from 'next/link';

interface ArticleDetailProps {
  articleId: string;
}

export default function ArticleDetail({ articleId }: ArticleDetailProps) {
  const { getArticle } = useArticleStore();
  const article = getArticle(articleId);

  if (!article) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">記事が見つかりません</p>
        <Link
          href="/"
          className="text-blue-500 hover:text-blue-600 mt-2 inline-block"
        >
          ホームに戻る
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {article.title}
          </h1>
          <div className="flex items-center justify-between text-sm text-gray-500 border-b border-gray-200 pb-4">
            <span>著者: {article.author}</span>
            <div className="flex gap-4">
              <span>作成日: {article.createdAt.toLocaleDateString('ja-JP')}</span>
              <span>更新日: {article.updatedAt.toLocaleDateString('ja-JP')}</span>
            </div>
          </div>
        </div>

        <div className="prose max-w-none">
          <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {article.content}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 flex gap-4">
          <Link
            href={`/articles/${article.id}/edit`}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            編集
          </Link>
          <Link
            href="/"
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            一覧に戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
