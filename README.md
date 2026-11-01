# 🌿 Verdant — High-End Botanical E-Commerce Platform

A modern, full-stack botanical e-commerce application crafted for horticultural enthusiasts and plant parents. Features an editorial-grade shopping experience, an AI-inspired plant diagnostic quiz, interactive care dashboard, and an Express REST API backend.

---

## ✨ Features

- **Botanical Catalog**: Browse, search, filter (by light, pet-friendliness, size, difficulty), and sort curated specimens.
- **Specimen Detail**: High-resolution imagery, lighting requirements, care schedules, and related accessories.
- **Diagnostic Plant Quiz**: Multi-step interactive quiz with tailored plant recommendations and match scoring.
- **Cart & Slide-over Drawer**: Global cart state management with real-time subtotal, quantity updates, and free shipping calculation.
- **Secure Checkout**: Multi-step ordering with form validation, tax and shipping calculations, and mock payment options.
- **Care Dashboard**: Personalized botanical care regimen, watering schedules, and order confirmation.
- **Full-Stack REST API**: Express backend with endpoints for plant catalog, quiz recommendations, orders, and newsletter subscribers.
- **Offline / Fallback Support**: Seamless fallback to local dataset if the backend server is temporarily unreachable.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM v7
- **UI FX**: Canvas Confetti, Lucide Icons

### Backend
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Middleware**: CORS, Morgan (HTTP logging)
- **Data Persistence**: JSON file storage (`plants.json`, `orders.json`, `subscribers.json`)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### 1. Clone the repository
```bash
git clone https://github.com/deydiya755-sys/verdant.git
cd verdant
```

### 2. Start the Backend API (Port 5000)
```bash
cd backend
npm install
npm run dev
```
Backend will be live at `http://localhost:5000`.

### 3. Start the Frontend App (Port 3000)
In a new terminal:
```bash
cd frontend
npm install
npm run dev
```
Frontend will be live at `http://localhost:3000`.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Backend health check |
| `GET` | `/api/plants` | All plants (with filters: `light`, `pet`, `size`, `difficulty`, `search`, `sort`) |
| `GET` | `/api/plants/curated` | Curated specimens for homepage |
| `GET` | `/api/plants/accessories` | Cross-sell accessories |
| `GET` | `/api/plants/:id` | Single plant details |
| `POST` | `/api/quiz/recommend` | Diagnostic plant match scoring algorithm |
| `POST` | `/api/orders` | Place customer order |
| `GET` | `/api/orders/:orderId` | Retrieve order details & care regimen |
| `POST` | `/api/newsletter` | Botanical newsletter subscription |

---

## 📂 Project Structure

```
verdant/
├── backend/
│   ├── controllers/      # Route controllers (plants, quiz, orders, newsletter)
│   ├── data/             # JSON data files (plants, orders, accessories)
│   ├── routes/           # Express router definitions
│   ├── package.json
│   └── server.js         # Server entry point
├── frontend/
│   ├── public/           # Static icons & assets
│   ├── src/
│   │   ├── components/   # Navbar, Footer, CartDrawer, ProductCard
│   │   ├── context/      # CartContext (global state)
│   │   ├── pages/        # Home, Shop, ProductDetail, PlantQuiz, Checkout, CareDashboard
│   │   ├── services/     # API service layer with fallbacks
│   │   ├── App.jsx       # Route configuration
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js    # Proxy configuration to backend (:5000)
└── README.md
```

---

## 📄 License
MIT
