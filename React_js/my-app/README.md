# 🌸 MegaStore — Full-Stack E-Commerce Mini App

A small, real-shaped e-commerce app that brings together **components, hooks, routing, state management, and API/DB calls** in one project. A React frontend talks to an Express REST API backed by a SQLite database.

> **Status:** Frontend ✅ · Backend API ✅ · Database ✅ · Auth 🚧 (planned)

---

## 📸 Preview

 <img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/552a273e-7849-498b-b9bb-bc53582d337b" />

<img width="1919" height="1078" alt="image" src="https://github.com/user-attachments/assets/b2077427-e202-42c6-a850-0305d02c4968" />

<img width="1906" height="1075" alt="image" src="https://github.com/user-attachments/assets/68edbcae-807c-4c60-88a6-ed297c51b31f" />

<img width="1905" height="876" alt="image" src="https://github.com/user-attachments/assets/e3ca7ca2-3c5f-4ef2-92e4-344c1a610cab" />


---

## ✨ Features

- Browse products loaded from a **SQLite database** with category filtering
- **Product detail page** fetched per item from the API
- **Shopping cart** with add, remove, quantity +/−, and total
- **Checkout saves orders** to the database (server calculates the total from DB prices)
- **Order history page** showing past orders with their items
- Cart **persists after refresh** (localStorage)
- Loading and error states for every API call, with a "Simulate Server Crash" button to test them
- Toast notifications, responsive pastel UI styled with Tailwind CSS
- 404 page for unknown routes

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, Vite |
| Routing | React Router |
| State | React Context API + hooks |
| Styling | Tailwind CSS |
| Backend | Node.js, Express, CORS |
| Database | SQLite via `better-sqlite3` |

---

## 🧠 Concepts Demonstrated

| Concept | Where it is used |
|---------|------------------|
| **Components** | `Layout`, `ShopPage`, `ProductPage`, `CartPage`, `OrdersPage`, `DataGate`, `NotFound` |
| **Hooks** | `useState`, `useEffect`, `useContext`, `useParams`, `useNavigate` |
| **Routing** | Nested routes with a shared layout, dynamic route `/product/:id`, wildcard 404 |
| **State management** | Global shop + cart state in `ShopContext` (Context API) |
| **API layer** | All `fetch` calls live in `src/api/shopApi.js`, so components never build URLs |
| **REST API** | Express routes for products and orders |
| **Database** | SQLite tables, foreign keys, `JOIN` queries, and a **transaction** for placing orders |
| **Async handling** | `async/await` with loading, error and success states, plus effect cleanup to avoid stale updates |

---

## 🗺️ Frontend Routes

| Path | Page |
|------|------|
| `/` | Shop with category filter |
| `/product/:id` | Product details |
| `/cart` | Cart and checkout |
| `/orders` | Order history |
| `*` | 404 Not Found |

---

## 📁 Project Structure

```
my-app/
├── src/
│   ├── api/
│   │   └── shopApi.js     # fetch helpers: getProducts, getProduct, createOrder, getOrders
│   ├── main.jsx           # Entry point, BrowserRouter + ShopProvider
│   ├── App.jsx            # Routes, Layout and pages
│   ├── ShopContext.jsx    # Global state: products, cart, loading/error
│   └── index.css          # Tailwind import
├── server/
│   ├── server.js          # Express API + SQLite setup and seed data
│   ├── package.json
│   └── shop.db            # Created automatically on first run
├── vite.config.js
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### 1. Install dependencies

```bash
# Frontend (from the project root)
npm install

# Backend
cd server
npm install
```

### 2. Run the backend (Terminal 1)

```bash
cd server
node server.js
```
The API starts on `http://localhost:3000`. On first run it creates `shop.db` and seeds six products.

### 3. Run the frontend (Terminal 2)

```bash
npm run dev
```
Open the URL shown in the terminal (usually `http://localhost:5173`).

> Both terminals must stay open. If the frontend shows "Cannot reach the server", the backend isn't running.

---

## 🔌 API Reference

Base URL: `http://localhost:3000/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/products` | List all products. Optional `?category=Fashion` filter |
| GET | `/products/:id` | Get one product. Returns `404` if not found |
| POST | `/orders` | Place an order from cart items |
| GET | `/orders` | List all orders (newest first) with their items |

### Example: place an order

**Request** `POST /api/orders`
```json
{
  "items": [
    { "id": 2, "qty": 1 },
    { "id": 3, "qty": 2 }
  ]
}
```

**Response** `201 Created`
```json
{ "id": 1, "total": 6900 }
```

**Errors**
| Status | Meaning |
|--------|---------|
| `400` | Empty cart, unknown product id, or invalid quantity |
| `404` | Product not found (`GET /products/:id`) |

> The server looks up prices from the `products` table itself, so the client can't send fake prices. The order and its items are saved in a single **transaction**: either everything is stored or nothing is.

---

## 🗄️ Database Schema

SQLite file: `server/shop.db`

```
products                         orders                    order_items
┌────────────┬─────────┐         ┌────────────┬─────────┐  ┌────────────┬─────────┐
│ id (PK)    │ INTEGER │◄──┐     │ id (PK)    │ INTEGER │◄─│ order_id   │ INTEGER │
│ name       │ TEXT    │   │     │ total      │ INTEGER │  │ product_id │ INTEGER │──┐
│ price      │ INTEGER │   │     │ created_at │ TEXT    │  │ qty        │ INTEGER │  │
│ category   │ TEXT    │   │     └────────────┴─────────┘  │ price      │ INTEGER │  │
│ rating     │ REAL    │   └───────────────────────────────┴────────────┴─────────┘  │
│ img        │ TEXT    │◄──────────────────────────────────────────────────────────┘
└────────────┴─────────┘
```

- `order_items.price` stores the **price at the time of purchase**, so old orders stay correct if product prices change later.
- `GET /api/orders` uses a `JOIN` between `order_items` and `products` to return item names and icons.

### Environment / configuration

No environment variables are required. Defaults:

| Setting | Value | Where to change |
|---------|-------|-----------------|
| API port | `3000` | `server/server.js` (`app.listen`) |
| API base URL | `http://localhost:3000/api` | `src/api/shopApi.js` (`BASE_URL`) |

---

## 🛣️ Roadmap

- [x] Components and routing
- [x] Global state with Context API
- [x] Cart with persistence
- [x] Loading and error handling
- [x] Backend REST API (Express)
- [x] SQLite database integration
- [x] Orders saved at checkout + order history


---
