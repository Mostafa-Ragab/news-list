// src/pages/Detail.tsx
import { useLocation, useNavigate } from "react-router-dom";
import ArticleImage from "../components/ArticleIamge";
import MetaLine from "../components/MetaLine";
import type { Article } from "../api";

type LocationState = { article?: Article };

export default function Detail() {
  const nav = useNavigate();
  const { state } = useLocation() as { state?: LocationState };
  const a = state?.article;

  if (!a) {
    return (
      <section aria-labelledby="no-article">
        <h2 id="no-article" style={{ marginTop: 0 }}>No article selected</h2>
        <button
          type="button"
          onClick={() => nav("/")}
          style={{ padding: "8px 10px", borderRadius: 6, border: "1px solid #ddd" }}
        >
          Back
        </button>
      </section>
    );
  }

  return (
    <article style={{ display: "grid", gap: 12 }}>
      {/* Hero image */}
      <ArticleImage
        src={a.urlToImage}
        alt={a.title || "Article image"}
        large
        style={{ width: "100%", maxHeight: 480, objectFit: "cover", borderRadius: 10 }}
      />

      {/* Title */}
      <h1 style={{ margin: "8px 0 0" }}>{a.title || "(No title)"}</h1>

      {/* Meta */}
      <MetaLine author={a.author} publishedAt={a.publishedAt} />

      {/* Summary */}
      {a.description && (
        <p style={{ margin: "8px 0", color: "#333" }}>{a.description}</p>
      )}

      {/* Body */}
      {a.content && (
        <p style={{ whiteSpace: "pre-wrap", lineHeight: 1.55, margin: 0 }}>
          {a.content}
        </p>
      )}

      {/* Source */}
      {a.url && (
        <a
          href={a.url}
          target="_blank"
          rel="noreferrer"
          style={{ marginTop: 4, width: "fit-content" }}
          aria-label="Open original article in a new tab"
        >
          Read original ↗
        </a>
      )}

      {/* Back action */}
      <div style={{ marginTop: 8 }}>
        <button
          type="button"
          onClick={() => nav(-1)}
          style={{ padding: "8px 10px", borderRadius: 6, border: "1px solid #ddd" }}
        >
          Back
        </button>
      </div>
    </article>
  );
}