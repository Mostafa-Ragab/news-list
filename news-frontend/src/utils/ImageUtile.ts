export function toProxyUrl(raw: string, width?: number, height?: number): string {
  if (!raw) return "";
  try {
    const u = new URL(raw);
    const target = `${u.hostname}${u.pathname}`;
    const params = new URLSearchParams();
    if (width) params.set("w", String(width));
    if (height) params.set("h", String(height));
    params.set("fit", "cover");
    params.set("we", "1"); // auto-webp if supported
    return `https://images.weserv.nl/?url=${encodeURIComponent(target)}&${params.toString()}`;
  } catch {
    return raw;
  }
}

export function stripQuery(raw: string): string {
  if (!raw) return "";
  try {
    const u = new URL(raw);
    u.search = "";
    return u.toString();
  } catch {
    return raw;
  }
}