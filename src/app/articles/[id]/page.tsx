import ArticleDetail from "@/components/ArticleDetail";

interface ArticlePageProps {
  params: {
    id: string;
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  return <ArticleDetail articleId={params.id} />;
}
