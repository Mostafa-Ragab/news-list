import { useMemo, useState } from "react";

const PH_SMALL = "https://placehold.co/120x80?text=No+Image";
const PH_LARGE = "https://placehold.co/1200x600?text=No+Image";

function stripQuery(raw?: string) {
  if (!raw) return "";
  try { const u = new URL(raw); u.search = ""; return u.toString(); } catch { return raw; }
}

// Build a weserv proxy URL. It prefers URLs *without* protocol in the `url` param.
function proxyUrl(raw?: string, w?: number, h?: number, large?: boolean) {
  if (!raw) return large ? PH_LARGE : PH_SMALL;
  try {
    const u = new URL(raw);
    const target = `${u.hostname}${u.pathname}`; // no protocol
    const params = new URLSearchParams();
    if (w) params.set("w", String(w));
    if (h) params.set("h", String(h));
    params.set("fit", "cover");
    // if the origin fails, weserv will return this placeholder instead of 4xx
    params.set("default", encodeURIComponent(large ? PH_LARGE : PH_SMALL));
    return `https://images.weserv.nl/?url=${encodeURIComponent(target)}&${params.toString()}`;
  } catch {
    return large ? PH_LARGE : PH_SMALL;
  }
}

export default function ArticleImage({
  src,
  alt = "",
  width,
  height,
  large,
  style,
  className
}: {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  large?: boolean;
  style?: React.CSSProperties;
  className?: string;
}) {
  // 0: original, 1: stripped query, 2: proxy, 3: placeholder
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);

  const currentSrc = useMemo(() => {
    if (!src) return large ? PH_LARGE : PH_SMALL;
    if (step === 0) return src;                                   // try original
    if (step === 1) return stripQuery(src);                        // try without query
    if (step === 2) return proxyUrl(src, width, height, large);    // try via proxy
    return large ? PH_LARGE : PH_SMALL;                            // final fallback
  }, [src, step, width, height, large]);

  return (
    <img
      src={currentSrc}
      alt={alt}
      width={width}
      height={height}
      referrerPolicy="no-referrer"
      onError={() => setStep((s) => (s < 3 ? ((s + 1) as any) : s))}
      style={style}
      className={className}
    />
  );
}