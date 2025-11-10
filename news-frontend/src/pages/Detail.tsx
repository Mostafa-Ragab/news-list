// src/pages/Detail.tsx
import { useLocation, useNavigate } from 'react-router-dom';
import ArticleImage from '../components/ArticleIamge';

export default function Detail() {
  const { state } = useLocation() as { state?: { article:any } };
  const nav = useNavigate();
  const a = state?.article;

  if (!a) {
    return (
      <div>
        <p>No article selected.</p>
        <button onClick={() => nav('/')} style={{ padding: '8px 10px', borderRadius: 6, border: '1px solid #ddd' }}>Back</button>
      </div>
    );
  }

  return (
    <article style={{ display: 'grid', gap: 12 }}>
     <ArticleImage
  src={a.urlToImage}
  large
  alt={a.title || "image"}
  style={{ width: "100%", maxHeight: 480, objectFit: "cover", borderRadius: 10 }}
/>
      <h2 style={{ marginBottom: 0 }}>{a.title}</h2>
      <div style={{ fontSize: 12, color: '#555' }}>
        {(a.author || 'Unknown')} • {new Date(a.publishedAt || Date.now()).toLocaleString()}
      </div>
      {a.description && <p>{a.description}</p>}
      {a.content && <p style={{ whiteSpace: 'pre-wrap', lineHeight: 1.55 }}>{a.content}</p>}
      {a.url && <a href={a.url} target="_blank" rel="noreferrer">Read original</a>}
    </article>
  );
}