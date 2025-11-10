# 📰 News Headlines App (React + Vite)

A small full-stack app that fetches real headlines and displays them with a clean UI.
The backend proxies NewsAPI securely (API key kept on the server) and exposes a protected /api/news endpoint consumed by the React frontend.

---

## 🚀 Features

- ✅ Fetch latest news articles
•	✅ Protected backend using Bearer token (no public API key in the frontend)
- ✅ Search with debounce (filters articles by title)
- ✅ Refresh button to reload data
- ✅ Error & loading states
- ✅ Fallback image for broken thumbnails
- ✅ Detail page: full article info
- ✅ Clean & responsive UI
- ✅ TypeScript + Vite + React Router
-  ✅ Include a Search Bar to filter articles dynamically by title.
-  ✅ Support Pull-to-Refresh or reload option to update the news list. 

---

## 📂 Project Structure
/news-frontend    → Vite + React + TS (consumes /api)
/server           → Node + Express (proxies NewsAPI; secured with token)

	•	Frontend calls /api/news (via Vite dev proxy or VITE_API_BASE in prod).
	•	Backend calls NewsAPI with NEWS_API_KEY (server-only).

## ⚙️ Requirements

- Node.js 18+
- PNPM / NPM / Yarn

Environment Variables

Server (server/.env)
NEWS_API_KEY=YOUR_REAL_NEWSAPI_KEY
DEMO_TOKEN=DEMO_TOKEN_123
PORT=4000
# Optional:
# NEWS_COUNTRY=us

Frontend (news-frontend/.env)
# In dev, we proxy /api to http://localhost:4000
VITE_API_BASE=/api
VITE_DEMO_TOKEN=DEMO_TOKEN_123
The server is the only place that talks to NewsAPI with your key.


🛠️ Install
Environment Values for Server:
NEWS_API_KEY=7036b09db7e64f24891a22c6e5ab54b9
DEMO_TOKEN=DEMO_TOKEN_123
PORT=4000

Environment Values for frontend:

VITE_API_BASE=/api
VITE_DEMO_TOKEN=DEMO_TOKEN_123

# in repo root
cd server
pnpm install   # or npm i / yarn
cd ../news-frontend
pnpm install   # or npm i / yarn

▶️ Run (two options)

Option A: Two terminals (simple)

Terminal 1 — server

cd server
pnpm dev   # or npm run dev
# API running on http://localhost:4000
Terminal 2 — frontend

cd news-frontend
pnpm dev   # or npm run dev
# Vite on http://localhost:5173

Dev proxy (frontend vite.config.ts) should include:

server: {
  proxy: {
    "/api": { target: "http://localhost:4000", changeOrigin: true }
  }
}
---

🔑 Auth Flow (dev)
	•	On app start, the frontend seeds a demo token (from VITE_DEMO_TOKEN) into localStorage and sends it as:
    Authorization: Bearer DEMO_TOKEN_123

    	•	The server checks this token for every request (except CORS preflight), returning 401 if missing/wrong.

Terminal: curl -i -H "Authorization: Bearer DEMO_TOKEN_123" http://localhost:4000/api/news
Should respond 200 with JSON { articles: [...] }.

