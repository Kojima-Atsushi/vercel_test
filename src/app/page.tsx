import ArticleList from "@/components/ArticleList";

export default function Home() {
  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          記事投稿アプリへようこそ
        </h1>
        <p className="text-lg text-gray-600">
          あなたの記事を共有しましょう
        </p>
      </div>
      <ArticleList />
    </div>
  );
}
