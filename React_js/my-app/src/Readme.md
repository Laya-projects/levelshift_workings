# 🌸 MegaStore — Full-Stack E-Commerce Mini App

A small, real-shaped e-commerce app that brings together **components, hooks, routing, state management, and API/DB calls** in one project. Built with React, React Router and Tailwind CSS, with a backend and database layer being added next.

> **Status:** Frontend complete ✅ · Backend / Database integration 🚧 (in progress)

---

## 📸 Preview

<!-- Add screenshots here -->
| Shop | Product Details | Cart |
|------|-----------------|------|
| _screenshot_ | _screenshot_ | _screenshot_ |

---

## ✨ Features

- Browse products with **category filtering**
- **Product detail page** for each item
- **Shopping cart** with add, remove, quantity +/−, total and checkout
- Cart **persists after refresh** (localStorage)
- **Loading and error states** for data fetching, with a "Simulate Server Crash" button to test them
- Toast notifications
- Responsive, pastel UI styled with Tailwind CSS
- 404 page for unknown routes

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite |
| Routing | React Router (`BrowserRouter`, `Routes`, `Route`) |
| State | React Context API + hooks |
| Styling | Tailwind CSS |
| Backend | _TBD_ |
| Database | _TBD_ |

---

## 🧠 Concepts Demonstrated

| Concept | Where it is used |
|---------|------------------|
| **Components** | `Layout`, `ShopPage`, `ProductPage`, `CartPage`, `DataGate`, `NotFound` |
| **Hooks** | `useState`, `useEffect`, `useContext`, plus `useParams`, `useNavigate` |
| **Routing** | Nested routes with a shared layout, dynamic route `/product/:id`, wildcard 404 |
| **State management** | Global shop + cart state in `ShopContext` (Context API) |
| **Async data fetching** | `async/await` with loading, error and success states |
| **API / DB calls** | Currently mocked → to be replaced by a real backend (see below) |

---

## 🗺️ Routes

| Path | Page |
|------|------|
| `/` | Shop with category filter |
| `/product/:id` | Product details |
| `/cart` | Cart and checkout |
| `*` | 404 Not Found |

---

## 📁 Project Structure

```
myshop/
├── src/
│   ├── main.jsx          # App entry, BrowserRouter + ShopProvider
│   ├── App.jsx           # Routes, Layout and pages
│   ├── ShopContext.jsx   # Global state: products, cart, loading/error
│   └── index.css         # Tailwind import
├── vite.config.js
├── package.json
└── README.md
```

> 🚧 Backend folder structure will be added here once the API is built.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd myshop

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

---

## 🔌 API & Database Integration

> 🚧 **To be completed.** The app currently loads products from a mock function in `ShopContext.jsx` that simulates database delay and failure.

<!--
  TODO: fill this section once the backend is built.
  Suggested contents:
  - Backend stack and how to run it
  - Database choice and schema (products, cart/orders, users)
  - Environment variables (.env.example)
  - API endpoints table (method, path, description)
  - How the frontend switches from the mock fetch to the real API
-->

### Planned endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | _to be added_ |
| GET | `/api/products/:id` | _to be added_ |
| POST | `/api/orders` | _to be added_ |

### Database schema

_To be added._


## 🛣️ Roadmap

- [x] Components and routing
- [x] Global state with Context API
- [x] Cart with persistence
- [x] Loading and error handling
- [x] Backend API
- [x] Database integration
- [x] User authentication
- [x] Order history
- [x] Deployment

---
