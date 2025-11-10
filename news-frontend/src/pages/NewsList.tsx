import React, {
  useCallback, useEffect, useMemo, useState,
  type ChangeEvent, type SyntheticEvent
} from 'react';
import { Link } from 'react-router-dom';
import { fetchNews, type Article } from '../api';

const PLACEHOLDER_SM = 'https://placehold.co/120x80?text=No+Image';

function formatDate(iso?: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? '' : d.toLocaleString();
}

export default function NewsList() { 
  const [items, setItems] = useState<Article[]>([]);
  const [query, setQuery] = useState<string>('');
  const [debouncedQuery, setDebouncedQuery] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const load = useCallback(async () => {
    try {
      setErr('');
      setLoading(true);
      const articles = await fetchNews();
      setItems(articles);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Failed to load news';
      setErr(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  // Debounce 300ms
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(t);
  }, [query]);

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value);

  const onImgError = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = PLACEHOLDER_SM;
  };

  const filtered = useMemo(() => {
    const t = debouncedQuery.trim().toLowerCase();
    if (!t) return items;
    return items.filter(a => (a.title ?? '').toLowerCase().includes(t));
  }, [debouncedQuery, items]);

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input
          value={query}
          onChange={onSearchChange}
          placeholder="Search titles…"
          aria-label="Search articles by title"
          style={{ flex: 1, padding: '8px 10px', border: '1px solid #ddd', borderRadius: 6 }}
        />
        <button
          onClick={load}
          type="button"
          aria-label="Refresh news list"
          style={{ padding: '8px 10px', border: '1px solid #ddd', borderRadius: 6 }}
        >
          Refresh
        </button>
      </div>

      {loading && <p role="status">Loading…</p>}
      {err && <p role="alert" style={{ color: 'crimson' }}>{err}</p>}

      <div style={{ display: 'grid', gap: 10 }}>
        {filtered.map((a, i) => {
          const key = a.url ?? `${a.title}-${a.publishedAt}-${i}`;
          return (
            <Link
              key={key}
              to="/detail"
              state={{ article: a }}
              style={{
                display: 'flex', gap: 12, padding: 12, border: '1px solid #eee',
                borderRadius: 8, background: '#fff', textDecoration: 'none',
                color: 'inherit', alignItems: 'center',
              }}
            >
              <img
                src={a.urlToImage || PLACEHOLDER_SM}
                alt={a.title || 'Article image'}
                width={120}
                height={80}
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={onImgError}
                style={{ objectFit: 'cover', borderRadius: 4, flexShrink: 0 }}
              />
              <div>
                <h3 style={{ margin: '0 0 4px' }}>{a.title || '(No title)'}</h3>
                <div style={{ fontSize: 12, color: '#555' }}>
                  {(a.author || 'Unknown')} • {formatDate(a.publishedAt)}
                </div>
                {a.description && (
                  <p style={{ margin: '6px 0 0', color: '#333', fontSize: 13, lineHeight: 1.35 }}>
                    {a.description}
                  </p>
                )}
              </div>
            </Link>
          );
        })}
        {!loading && !err && filtered.length === 0 && <p>No results.</p>}
      </div>
    </div>
  );
}