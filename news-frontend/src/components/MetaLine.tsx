
type MetaLineProps = {
  author?: string;
  publishedAt?: string;
};

function formatDate(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "" : d.toLocaleString();
}

export default function MetaLine({ author, publishedAt }: MetaLineProps) {
  const authorText = (author || "").trim() || "Unknown";
  const dateText = formatDate(publishedAt);
  return (
    <div style={{ fontSize: 12, color: "#555" }}>
      {authorText}
      {dateText ? ` • ${dateText}` : ""}
    </div>
  );
}