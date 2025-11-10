// src/components/ArticleCard.tsx
import { Link } from 'react-router-dom';
import ArticleImage from './ArticleIamge';

export default function ArticleCard({ a }:any) {
  return (
    <Link
      to="/detail"
      state={{ article: a }}
      style={{ display: 'flex', gap: 12, padding: 12, background: '#fff', border: '1px solid #eee', borderRadius: 8, textDecoration: 'none', color: 'inherit' }}
    >
     <ArticleImage
  src={a.urlToImage}
  width={120}
  height={80}
  alt={a.title || "image"}
  style={{ objectFit: "cover", borderRadius: 4 }}
/>
      <div>
        <h3 style={{ margin: '0 0 4px' }}>{a.title || '(No title)'}</h3>
        <div style={{ fontSize: 12, color: '#555' }}>
          {(a.author || 'Unknown')} • {new Date(a.publishedAt || Date.now()).toLocaleString()}
        </div>
      </div>
    </Link>
  );
}