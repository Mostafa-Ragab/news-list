// src/apiClient.ts
const API_BASE: string = (import.meta.env.VITE_API_BASE as string) || "/api";

/** Read the bearer token from storage */
export function getToken(): string {
  return localStorage.getItem("token") || "";
}

/** Optionally set/override the stored token */
export function setToken(token: string): void {
  if (token) localStorage.setItem("token", token);
}

/** Build a full URL from base + path */
function buildUrl(path: string): string {
  // Allow absolute URLs to pass through
  if (/^https?:\/\//i.test(path)) return path;
  const base = API_BASE.replace(/\/+$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

type RequestOptions = {
  /** Optional request timeout in milliseconds */
  timeoutMs?: number;
  /** Override API base for this call */
  base?: string;
};

export async function request<T>(
  path: string,
  init: RequestInit = {},
  opts: RequestOptions = {}
): Promise<T> {
  const controller = new AbortController();
  const timeout = typeof opts.timeoutMs === "number" ? opts.timeoutMs : undefined;
  let timeoutId: number | undefined;

  if (timeout && timeout > 0) {
    timeoutId = window.setTimeout(() => controller.abort(), timeout);
  }

  const headers = new Headers(init.headers || {});
  const token = getToken();
  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  // Set JSON headers if sending a plain object
  if (init.body && typeof init.body === "object" && !(init.body instanceof FormData)) {
    if (!headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  }

  const url = opts.base ? new URL(path, opts.base).toString() : buildUrl(path);

  try {
    const res = await fetch(url, { ...init, headers, signal: controller.signal });

    if (res.status === 401) {
      throw new Error("unauthorized");
    }
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(text || `HTTP ${res.status}`);
    }

    // No content
    if (res.status === 204) {
      return undefined as unknown as T;
    }

    // Try JSON; fall back to text
    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      return (await res.json()) as T;
    }
    return (await res.text()) as unknown as T;
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}