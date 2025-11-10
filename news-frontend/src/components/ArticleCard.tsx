import { Link } from "react-router-dom";
import ArticleImage from "./ArticleIamge";
import type { Article } from "../api";

const CARD_STYLES: React.CSSProperties = {
  display: "flex",
  gap: 12,
  padding: 12,
  border: "1px solid #eee",
  borderRadius: 8,
  background: "#fff",
  textDecoration: "none",
  color: "inherit",
  alignItems: "center",
};

function formatDate(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "" : d.toLocaleString();
}

type Props = { article: Article };

export default function ArticleCard({ article }: Props) {
  const { title, description, author, publishedAt, url, urlToImage } = article;
  const key = url ?? `${title}-${publishedAt}`;

  return (
    <Link key={key} to="/detail" state={{ article }} style={CARD_STYLES}>
      <ArticleImage
        src={urlToImage}
        alt={title || "Article image"}
        width={120}
        height={80}
        style={{ objectFit: "cover", borderRadius: 4, flexShrink: 0 }}
      />
      <div>
        <h3 style={{ margin: "0 0 4px" }}>{title || "(No title)"}</h3>
        <div style={{ fontSize: 12, color: "#555" }}>
          {(author || "Unknown")} • {formatDate(publishedAt)}
        </div>
        {description && (
          <p style={{ margin: "6px 0 0", color: "#333", fontSize: 13, lineHeight: 1.35 }}>
            {description}
          </p>
        )}
      </div>
    </Link>
  );
}