// src/api.ts
import { request } from "./apiClient";

export type ArticleRaw = {
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

export async function fetchNews(): Promise<Article[]> {
  const { articles } = await request<{ articles: ArticleRaw[] }>("/news");
  return (articles || []).map(a => ({
    title: a.title ?? "",
    description: a.description ?? "",
    urlToImage: a.urlToImage ?? "",
    author: a.author ?? "Unknown",
    publishedAt: a.publishedAt ?? "",
    content: a.content ?? "",
    url: a.url,
  }));
}