import { useCallback, useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import { fetchNews, type Article } from "../api";
import ArticleCard from "../components/ArticleCard";
import SearchBar from "../components/SearchBar";
import { ErrorText, EmptyState } from "../components/Status";
import useDebouncedValue from "../hooks/useDebouncedValue";

function isAbortError(err: unknown): err is DOMException {
  return err instanceof DOMException && err.name === "AbortError";
}

export default function NewsList() {
  const [items, setItems] = useState<Article[]>([]);
  const [query, setQuery] = useState<string>("");
  const debouncedQuery = useDebouncedValue<string>(query, 300);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const didInit = useRef<boolean>(false);
  const abortRef = useRef<AbortController | undefined>(undefined);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const load = useCallback(async () => {
    try {
      // cancel any in-flight request
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setErrorMsg("");
      setLoading(true);

      const articles = await fetchNews({ signal: controller.signal });
      setItems(articles);
    } catch (err: unknown) {
      if (isAbortError(err)) return; // ignore cancellations
      const msg = err instanceof Error ? err.message : "Failed to load news";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (didInit.current) return; // prevent StrictMode double run
    didInit.current = true;

    void load();

    return () => {
      abortRef.current?.abort();
    };
  }, [load]);

  const filtered = useMemo<Article[]>(() => {
    const t = debouncedQuery.trim().toLowerCase();
    if (!t) return items;
    return items.filter((a) => (a.title ?? "").toLowerCase().includes(t));
  }, [debouncedQuery, items]);

  return (
    <div>
      <SearchBar
        value={query}
        onChange={handleSearchChange}
        onRefresh={load}
        loading={loading}
      />
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