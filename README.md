# 📰 News Headlines App (Full-Stack) — React + Vite + Node.js

A full-stack news application that securely fetches live headlines from **NewsAPI** via a protected backend, and displays them in a clean responsive UI with search, refresh, skeleton loading, and detail view.

This project demonstrates best-practices in frontend performance, API security, and clean UI/UX.

---

## 🚀 Features

### ✅ **Frontend (React + Vite + TS)**
- Secure fetch from protected backend (`/api/news`)
- Live headlines grid view
- **Search with debounce**
- **Refresh / Pull-to-refresh button**
- **Fallback images + image proxy fallback**
- **Skeleton loaders**
- Responsive layout + clean UI (SCSS modular styling)
- Reusable components (ArticleCard, SearchBar, SkeletonCard, ArticleImage, MetaLine)
- TypeScript everywhere

### ✅ **Backend (Node.js + Express)**  
- `/api/news` endpoint (proxy to NewsAPI)
- Filters only required fields:
  - title, description, image, author, date, content
- **Bearer token authentication** (protects API)
- API key kept server-side (not exposed)

### ✅ Security
- NewsAPI key **never exposed on frontend**
- `.env` based secrets management
	•	Local token check before calling server
	•	Server validates bearer token
	•.env for secrets

### ✅ Code Quality
- Clean folder structure  
- Strong TypeScript types
- Aborting pending fetch requests (avoid double calls in Strict Mode)
- Meaningful git commits (`add server`, `add debounce`, `refactor`, `add skeleton`, etc.)

---

## 🧠 Tech Stack

| Layer | Technology |
|------|------------|
| Frontend | React 19, Vite, TypeScript, SCSS |
| Backend | Node.js, Express |
| API | NewsAPI.org |
| Auth | Bearer Token |
| State | React Hooks |
| Routing | React Router v6 |
| Dev Tools | Nodemon, Axios |

---

## 📂 Folder Structure

root/
├─ news-frontend/     # React app
│   ├─ src
│   │   ├─ api/
│   │   ├─ components/
│   │   ├─ pages/
│   │   ├─ hooks/
│   │   ├─ utils/
│   │   └─ styles/
│   └─ vite.config.ts
├─ server/            # Node backend
│   └─ server.js
└─ README.md

## 🔐 Environment Variables

### **Frontend (`news-frontend/.env`)**
VITE_API_BASE=/api
VITE_DEMO_TOKEN=DEMO_TOKEN_123

### **Backend (`server/.env`)**

NEWS_API_KEY=YOUR_NEWS_API_KEY // or use 7036b09db7e64f24891a22c6e5ab54b9
DEMO_TOKEN=DEMO_TOKEN_123
PORT=4000


---

## 🛠 Installation & Run

### Clone & install

```bash
git clone https://github.com/Mostafa-Ragab/news-list

cd news-list
Install & run backend
cd server
npm install
npm run dev


Install & run frontend
cd ../news-frontend
npm install
npm run dev


App will run at:
	•	Frontend → http://localhost:5173
	•	Backend  → http://localhost:4000

  🧪 Test Secure Fetch

  Your browser must hold token:
  localStorage.setItem("token", "DEMO_TOKEN_123");

  Then refresh the app ✅

  🏗 Build for Production

1️⃣ Build the frontend
cd news-frontend
npm run build  

2️⃣ Serve frontend via Node server

Ensure Express serves static files (already configured in this project):

app.use(express.static(path.join(__dirname, "../news-frontend/dist")));
app.get("*", (_req, res) =>
  res.sendFile(path.join(__dirname, "../news-frontend/dist/index.html"))
); # generates dist/

3️⃣ Start backend (serves built frontend)
cd server
npm install --production
node server.js
 App available at → http://localhost:4000

  🎯 Highlights
	•	✅ Secure backend proxy (no API key leakage)
	•	✅ Debounced search for performance and add abortController
	•	✅ Skeleton on first load
	•	✅ Handles image errors + CDN proxy fallback
	•	✅ Cancel fetch on component unmount
	•	✅ Clean reusable UI components
	•	✅ Git commits reflect feature milestones
  •	✅ loading skeletons = better perceived performanc

This project mimics real-world production patterns for API consumption, security, and performance optimization.

