import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 4000;
const NEWS_API_KEY = process.env.NEWS_API_KEY;
const DEMO_TOKEN = process.env.DEMO_TOKEN || "DEMO_TOKEN_123";
const DEFAULT_COUNTRY = process.env.NEWS_COUNTRY || "us";

// --- CORS: اسمح بالـAuthorization + OPTIONS
app.use(
  cors({
    origin: ["http://localhost:5173"], // غيّرها في الإنتاج
    credentials: false,
    methods: ["GET", "OPTIONS"],
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);

// اختياري: هيلث تشيك بسيط
app.get("/api/health", (_req, res) => res.json({ ok: true }));

// --- Auth middleware: اسمح بتمرير OPTIONS بلا توكن
app.use((req, res, next) => {
  if (req.method === "OPTIONS") return res.sendStatus(204); // preflight
  const expected = `Bearer ${DEMO_TOKEN}`;
  const auth = req.get("authorization") || "";
  if (auth !== expected) return res.status(401).json({ error: "unauthorized" });
  next();
});

// --- GET /api/news
app.get("/api/news", async (req, res) => {
  try {
    if (!NEWS_API_KEY) {
      return res.status(500).json({ error: "Missing NEWS_API_KEY" });
    }

    // اسمح بتغيير الدولة عبر كويري ?country=gb (اختياري)
    const country = (req.query.country || DEFAULT_COUNTRY).toString();

    const { data } = await axios.get("https://newsapi.org/v2/top-headlines", {
      params: { country },
      headers: { "X-Api-Key": NEWS_API_KEY },
      // timeout اختياري
      timeout: 10000,
    });

    if (data.status !== "ok") {
      return res.status(502).json({ error: data.message || "NewsAPI error" });
    }

    const articles = (data.articles || []).map((a) => ({
      title: a.title ?? "",
      description: a.description ?? "",
      urlToImage: a.urlToImage ?? "",
      author: a.author ?? "",
      publishedAt: a.publishedAt ?? "",
      content: a.content ?? "",
      url: a.url ?? "",
    }));

    res.json({ articles });
  } catch (err) {
    const code = err.response?.status || 500;
    const msg =
      err.response?.data?.message || err.message || "Failed to fetch from NewsAPI";
    res.status(code).json({ error: msg });
  }
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});