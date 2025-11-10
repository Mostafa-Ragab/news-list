import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type SyntheticEvent,
} from "react";
import { Link } from "react-router-dom";
import { fetchNews, type Article } from "../api";

const PLACEHOLDER_SM = "https://placehold.co/120x80?text=No+Image";

/* ---------- utils ---------- */
function formatDate(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "" : d.toLocaleString();
}

function useDebouncedValue<T>(value: T, delayMs = 300): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(id);
  }, [value, delayMs]);
  return debounced;
}

/* ---------- UI bits ---------- */
function ArticleCard({
  article,
  onImgError,
}: {
  article: Article;
  onImgError: (e: SyntheticEvent<HTMLImageElement>) => void;
}) {
  const { title, description, author, publishedAt, url, urlToImage } = article;
  const key = url ?? `${title}-${publishedAt}`;

  return (
    <Link
      key={key}
      to="/detail"
      state={{ article }}
      style={{
        display: "flex",
        gap: 12,
        padding: 12,
        border: "1px solid #eee",
        borderRadius: 8,
        background: "#fff",
        textDecoration: "none",
        color: "inherit",
        alignItems: "center",
      }}
    >
      <img
        src={urlToImage || PLACEHOLDER_SM}
        alt={title || "Article image"}
        width={120}
        height={80}
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={onImgError}
        style={{ objectFit: "cover", borderRadius: 4, flexShrink: 0 }}
      />
      <div>
        <h3 style={{ margin: "0 0 4px" }}>{title || "(No title)"}</h3>
        <div style={{ fontSize: 12, color: "#555" }}>
          {(author || "Unknown")} • {formatDate(publishedAt)}
        </div>
        {description && (
          <p
            style={{
              margin: "6px 0 0",
              color: "#333",
              fontSize: 13,
              lineHeight: 1.35,
            }}
          >
            {description}
          </p>
        )}
      </div>
    </Link>
  );
}

/* ---------- page ---------- */
export default function NewsList() {
  const [items, setItems] = useState<Article[]>([]);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 300);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value);

  const handleImgError = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = PLACEHOLDER_SM;
  };

  const load = useCallback(async () => {
    try {
      setErrorMsg("");
      setLoading(true);
      const articles = await fetchNews();
      setItems(articles);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to load news";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const filtered = useMemo(() => {
    const t = debouncedQuery.trim().toLowerCase();
    if (!t) return items;
    return items.filter((a) => (a.title ?? "").toLowerCase().includes(t));
  }, [debouncedQuery, items]);

  return (
    <div>
      {/* top controls */}
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input
          value={query}
          onChange={handleSearchChange}
          placeholder="Search titles…"
          aria-label="Search articles by title"
          style={{
            flex: 1,
            padding: "8px 10px",
            border: "1px solid #ddd",
            borderRadius: 6,
          }}
        />
        <button
          onClick={load}
          type="button"
          aria-label="Refresh news list"
          disabled={loading}
          style={{
            padding: "8px 10px",
            border: "1px solid #ddd",
            borderRadius: 6,
            opacity: loading ? 0.7 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Loading…" : "Refresh"}
        </button>
      </div>

      {/* status */}
      {errorMsg && (
        <p role="alert" style={{ color: "crimson", marginTop: 0 }}>
          {errorMsg}
        </p>
      )}
      {!errorMsg && !loading && filtered.length === 0 && <p>No results.</p>}

      {/* list */}
      <div style={{ display: "grid", gap: 10 }}>
        {filtered.map((a) => (
          <ArticleCard key={a.url ?? `${a.title}-${a.publishedAt}`} article={a} onImgError={handleImgError} />
        ))}
      </div>
    </div>
  );
}