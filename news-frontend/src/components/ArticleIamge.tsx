import { useMemo, useState } from "react";
import { stripQuery, toProxyUrl } from "../utils/ImageUtile";

const PH_SMALL = "https://placehold.co/120x80?text=No+Image";
const PH_LARGE = "https://placehold.co/1200x600?text=No+Image";

export type ArticleImageProps = {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  large?: boolean;
  enableProxy?: boolean;
  placeholderSrc?: string;
  style?: React.CSSProperties;
  className?: string;
};

export default function ArticleImage({
  src,
  alt = "",
  width,
  height,
  large,
  enableProxy = true,
  placeholderSrc,
  style,
  className,
}: ArticleImageProps) {
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);

  const fallback = placeholderSrc ?? (large ? PH_LARGE : PH_SMALL);

  const currentSrc = useMemo(() => {
    if (!src) return fallback;

    if (step === 0) return src;
    if (step === 1) return stripQuery(src);
    if (step === 2 && enableProxy) return toProxyUrl(src, width, height);
    return fallback;
  }, [src, step, width, height, enableProxy, fallback]);

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