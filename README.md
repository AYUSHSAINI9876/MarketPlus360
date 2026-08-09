# 🚀 MarketPlus360 - High-Fidelity Trading Ecosystem

MarketPlus360 is a full-stack paper-trading platform clone inspired by Zerodha. It features a "Midnight Cyber" dark theme, real JWT-based authentication, per-user portfolios, and a simulated funds ledger — no real money or live market data is involved.

---

## 📸 Platform Preview

| **Midnight Cyber Hero** | **Pro Trading Dashboard** |
|:---:|:---:|
| ![SS1](screenshots/ss1.png) | ![SS2](screenshots/ss2.png) |
| **Order Execution** | **Holdings Visualizer** |
| ![SS3](screenshots/ss3.png) | ![SS4](screenshots/ss4.png) |
| **Live Positions** | **Cyber Pricing** |
| ![SS5](screenshots/ss5.png) | ![SS6](screenshots/ss6.png) |
| **Interactive Signup** | **Product Ecosystem** |
| ![SS7](screenshots/ss7.png) | ![SS8](screenshots/ss8.png) |

---

## ✨ Key Features

- **Real authentication**: mobile number + password, bcrypt-hashed, JWT sessions. The dashboard is a protected app — it validates the session against the API and bounces unauthenticated visitors to `/login`.
- **Per-user data**: Holdings, Positions, Orders and Funds are scoped to the logged-in user (not shared/global).
- **Simulated funds ledger**: every account starts with ₹1,00,000 in paper money. Buying deducts the order value, selling credits it back, and orders are rejected if funds/holdings are insufficient.
- **Full trading lifecycle**: place BUY/SELL orders that instantly (no manual refresh) sync Holdings, Positions, Orders and the Funds balance.
- **Midnight Cyber dark theme**: glassmorphism UI, consistent across the marketing site and dashboard.
- **Interactive Watchlist**: live client-side search/filter and one-click trade execution.

---

## 🛠️ Tech Stack

- **Frontend** (marketing + auth): React, React Router, Bootstrap 5
- **Dashboard** (trading app): React, MUI (Material UI), Chart.js
- **Backend**: Node.js, Express, JWT, bcrypt, Helmet, rate limiting
- **Database**: MongoDB (Mongoose)

---

## 🚀 Local Development

### Prerequisites

- Node.js 18+
- A MongoDB connection string (Atlas or local)

### 1. Environment configuration

Each app has a `.env.example` — copy it to `.env` in the same folder and fill in real values.

**`backend/.env`**
```env
PORT=3005
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=a_long_random_secret
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
```

**`frontend/.env`**
```env
REACT_APP_API_URL=http://localhost:3005
REACT_APP_DASHBOARD_URL=http://localhost:3001
```

**`dashboard/.env`**
```env
REACT_APP_API_URL=http://localhost:3005
REACT_APP_WEB_URL=http://localhost:3000
```

> None of these `.env` files are committed (see `.gitignore`). Generate `JWT_SECRET` with `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`.

### 2. Installation & run

Open three separate terminals:

**Terminal 1: Backend**
```bash
cd backend
npm install
npm start
```

**Terminal 2: Frontend (marketing/auth)**
```bash
cd frontend
npm install
npm start
```

**Terminal 3: Dashboard**
```bash
cd dashboard
npm install
$env:PORT=3001; npm start
```

### Localhost URLs

- **Main Platform**: [http://localhost:3000](http://localhost:3000)
- **Trading Dashboard**: [http://localhost:3001](http://localhost:3001)
- **API Server**: [http://localhost:3005](http://localhost:3005) — health check at `/api/health`

---

## 🔐 How login works across two separate apps

The marketing site and dashboard are independently deployed apps (different origins), so they can't share `localStorage` or cookies directly. Login/signup succeeds on the marketing site, which redirects to `<dashboard>/auth/callback#token=<jwt>`. The dashboard reads the token out of the URL fragment (never sent to any server logs), stores it, and redirects to `/`. Every dashboard API call attaches it as `Authorization: Bearer <token>`; a 401 response clears the token and bounces back to the marketing site's `/login`.

---

## ☁️ Deploying to Vercel

This is 3 separate Vercel projects (one per app), all pointed at the same GitHub repo with a different **Root Directory**.

| Project | Root Directory | Type | Env vars |
|---|---|---|---|
| `marketplus360-api` | `backend` | Node serverless (auto-detected via `backend/api/index.js` + `vercel.json`) | `MONGO_URI`, `JWT_SECRET`, `ALLOWED_ORIGINS` (set to the two URLs below) |
| `marketplus360-web` | `frontend` | Static (Create React App, auto-detected) | `REACT_APP_API_URL`, `REACT_APP_DASHBOARD_URL` |
| `marketplus360-dashboard` | `dashboard` | Static (Create React App, auto-detected) | `REACT_APP_API_URL`, `REACT_APP_WEB_URL` |

Deploy the API project first so you know its URL, then set the two frontend projects' `REACT_APP_API_URL` to it, deploy them, then go back and set the API project's `ALLOWED_ORIGINS` to the two resulting `*.vercel.app` URLs (comma-separated) and redeploy it.

**Before deploying**: rotate the MongoDB Atlas password (it previously lived in a plaintext `.env`) and confirm your Atlas cluster's Network Access allows `0.0.0.0/0`, since Vercel functions have no fixed IP.

---

## 📄 License

This project is for educational purposes. Built with ❤️ for the MarketPlus360 community.
