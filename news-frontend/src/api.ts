type ArticleRaw = {
  title?: string;
  description?: string;
  urlToImage?: string;
  author?: string;
  publishedAt?: string;
  content?: string;
  url?: string;
};

export type Article = {
  title: string;
  description: string;
  urlToImage: string;
  author: string;
  publishedAt: string;
  content: string;
  url?: string;
};

const API = import.meta.env.VITE_NEWS_ENDPOINT || "https://newsapi.org/v2/top-headlines";
const API_KEY = import.meta.env.VITE_NEWS_API_KEY as string;
const COUNTRY = import.meta.env.VITE_NEWS_COUNTRY || "us";
const CORS_PROXY = import.meta.env.VITE_CORS_PROXY || "";

export async function fetchNews(): Promise<Article[]> {
  const url = new URL(`${CORS_PROXY}${API}`);
  url.searchParams.set("country", COUNTRY);
  url.searchParams.set("apiKey", API_KEY);

  const res = await fetch(url.toString());

  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(msg || `HTTP ${res.status}`);
  }

  const data = await res.json();
  const raw = (data?.articles || []) as ArticleRaw[];

  return raw.map(a => ({
    title: a.title ?? "",
    description: a.description ?? "",
    urlToImage: a.urlToImage ?? "",
    author: a.author ?? "Unknown",
    publishedAt: a.publishedAt ?? "",
    content: a.content ?? "",
    url: a.url
  }));
}