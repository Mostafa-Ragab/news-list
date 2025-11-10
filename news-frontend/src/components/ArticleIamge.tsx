import { useMemo, useState } from "react";

const PH_SMALL = "https://placehold.co/120x80?text=No+Image";
const PH_LARGE = "https://placehold.co/1200x600?text=No+Image";

function stripQuery(raw?: string): string {
  if (!raw) return "";
  try {
    const u = new URL(raw);
    u.search = "";
    return u.toString();
  } catch {
    return raw || "";
  }
}

/** Build weserv proxy URL; prefers URLs *without* protocol in the `url` param */
function proxyUrl(raw?: string, w?: number, h?: number, large?: boolean): string {
  if (!raw) return large ? PH_LARGE : PH_SMALL;
  try {
    const u = new URL(raw);
    const target = `${u.hostname}${u.pathname}`; // no protocol
    const params = new URLSearchParams();
    if (w) params.set("w", String(w));
    if (h) params.set("h", String(h));
    params.set("fit", "cover");
    // If the origin fails, weserv returns this placeholder instead of 4xx
    params.set("default", encodeURIComponent(large ? PH_LARGE : PH_SMALL));
    return `https://images.weserv.nl/?url=${encodeURIComponent(target)}&${params.toString()}`;
  } catch {
    return large ? PH_LARGE : PH_SMALL;
  }
}

export type ArticleImageProps = {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  large?: boolean;
  style?: React.CSSProperties;
  className?: string;
};

export default function ArticleImage({
  src,
  alt = "",
  width,
  height,
  large,
  style,
  className,
}: ArticleImageProps) {
  // 0: original → 1: stripped query → 2: proxy → 3: placeholder
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);

  const currentSrc = useMemo(() => {
    if (!src) return large ? PH_LARGE : PH_SMALL;
    if (step === 0) return src;
    if (step === 1) return stripQuery(src);
    if (step === 2) return proxyUrl(src, width, height, large);
    return large ? PH_LARGE : PH_SMALL;
  }, [src, step, width, height, large]);

  return (
    <img
      src={currentSrc}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setStep((s) => (s < 3 ? ((s + 1) as 1 | 2 | 3) : s))}
      style={style}
      className={className}
    />
  );
}