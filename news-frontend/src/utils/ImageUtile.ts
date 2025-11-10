export function toProxyUrl(raw: string, width?: number, height?: number) {
  try {
    const u = new URL(raw);
    // images.weserv.nl needs the URL without protocol
    const target = `${u.hostname}${u.pathname}`;
    const params = new URLSearchParams();
    if (width) params.set('w', String(width));
    if (height) params.set('h', String(height));
    params.set('fit', 'cover');
    params.set('we', '1'); // auto-webp if supported
    return `https://images.weserv.nl/?url=${encodeURIComponent(target)}&${params.toString()}`;
  } catch {
    return '';
  }
}

export function stripQuery(raw: string) {
  try {
    const u = new URL(raw);
    u.search = '';
    return u.toString();
  } catch {
    return raw;
  }
}