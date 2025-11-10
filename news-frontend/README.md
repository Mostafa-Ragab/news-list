# 📰 News Headlines App (React + Vite)

A simple news viewer app that fetches real-time headlines and displays them in a clean interface.  
This project simulates a frontend assignment where the app consumes a news API securely and shows a list + detailed article screen.

---

## 🚀 Features

- ✅ Fetch latest news articles
- ✅ Protected API call (via  environment variables)
- ✅ Search with debounce (filters articles by title)
- ✅ Refresh button to reload data
- ✅ Error & loading states
- ✅ Fallback image for broken thumbnails
- ✅ Detail page: full article info
- ✅ Clean & responsive UI
- ✅ TypeScript + Vite + React Router

---

## 📂 Project Structure
src/
├── api/          # fetch functions
├── components/   # UI components
├── pages/        # NewsList + Details
├── router/       # App routing
└── main.tsx      # App entry

## ⚙️ Requirements

- Node.js 18+
- PNPM / NPM / Yarn

---

## 🛠️ Installation & Run

### Clone the project
```sh
git clone https://github.com/YOUR_USERNAME/news-task.git
cd news-task

pnpm install

Create .env file in project root:

VITE_NEWS_API_KEY=7036b09db7e64f24891a22c6e5ab54b9
VITE_NEWS_ENDPOINT=https://newsapi.org/v2/top-headlines
VITE_NEWS_COUNTRY=us
VITE_USE_BACKEND=false

▶️ Run Development Server
pnpm dev