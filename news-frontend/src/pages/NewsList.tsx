import { useCallback, useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import { fetchNews, type Article } from "../api";
import ArticleCard from "../components/ArticleCard";
import SearchBar from "../components/SearchBar";
import { ErrorText, EmptyState } from "../components/Status";
import useDebouncedValue from "../hooks/useDebouncedValue";

export default function NewsList() {
  const [items, setItems] = useState<Article[]>([]);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 300);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const didInit = useRef(false);          // ← guard
  const abortRef = useRef<AbortController | null>(null); // ← cancel in-flight fetch

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value);

  const load = useCallback(async () => {
    try {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setErrorMsg("");
      setLoading(true);

      const articles = await fetchNews({ signal: controller.signal }); // accept AbortSignal in your api
      setItems(articles);
    } catch (err: unknown) {
      if ((err as any)?.name === "AbortError") return; // ignore cancellations
      const msg = err instanceof Error ? err.message : "Failed to load news";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (didInit.current) return; // ← prevent second mount call in StrictMode
    didInit.current = true;

    void load();

    return () => {
      abortRef.current?.abort(); // cleanup on unmount
    };
  }, [load]);

  const filtered = useMemo(() => {
    const t = debouncedQuery.trim().toLowerCase();
    if (!t) return items;
    return items.filter((a) => (a.title ?? "").toLowerCase().includes(t));
  }, [debouncedQuery, items]);

  return (
    <div>
      <SearchBar value={query} onChange={handleSearchChange} onRefresh={load} loading={loading} />
      <ErrorText text={errorMsg} />
      <EmptyState show={!errorMsg && !loading && filtered.length === 0} />

      <div style={{ display: "grid", gap: 10 }}>
        {filtered.map((a) => (
          <ArticleCard key={a.url ?? `${a.title}-${a.publishedAt}`} article={a} />
        ))}
      </div>
    </div>
  );
}