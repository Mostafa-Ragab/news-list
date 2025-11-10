// src/api.ts
import { request } from "./apiClient";

export interface ArticleRaw {
  title?: string;
  description?: string;
  urlToImage?: string;
  author?: string;
  publishedAt?: string;
  content?: string;
  url?: string;
}

export interface Article {
  title: string;
  description: string;
  urlToImage: string;
  author: string;
  publishedAt: string;
  content: string;
  url?: string;
}

interface NewsResponse {
  articles?: ArticleRaw[];
}

export async function fetchNews(opts?: { signal?: AbortSignal }): Promise<Article[]> {
  try {
    const data = await request<NewsResponse>("/news", { signal: opts?.signal });

    const rawArticles = Array.isArray(data?.articles) ? data.articles : [];

    return rawArticles.map((a) => ({
      title: a.title ?? "",
      description: a.description ?? "",
      urlToImage: a.urlToImage ?? "",
      author: a.author ?? "Unknown",
      publishedAt: a.publishedAt ?? "",
      content: a.content ?? "",
      url: a.url,
    }));
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to fetch articles";
    throw new Error(msg);
  }
}