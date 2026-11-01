import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';

const app = express();
app.use(cors());
app.use(express.json());

// Open (or create) the database file
const db = new Database('shop.db');

// Tables
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price INTEGER NOT NULL,
    category TEXT NOT NULL,
    rating REAL,
    img TEXT
  );
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    total INTEGER NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL REFERENCES orders(id),
    product_id INTEGER NOT NULL REFERENCES products(id),
    qty INTEGER NOT NULL,
    price INTEGER NOT NULL
  );
`);

// Seed the data once, only if the table is empty
const { count } = db.prepare('SELECT COUNT(*) AS count FROM products').get();
if (count === 0) {
  const insert = db.prepare(
    'INSERT INTO products (name, price, category, rating, img) VALUES (?, ?, ?, ?, ?)'
  );
  [
    ['Wireless Headphones', 2999, 'Electronics', 4.5, '🎧'],
    ['Ergonomic Keyboard', 4500, 'Electronics', 4.7, '⌨️'],
    ['Stainless Steel Bottle', 1200, 'Lifestyle', 4.2, '🧴'],
    ['Leather Backpack', 3800, 'Fashion', 4.6, '🎒'],
    ['Smart Fitness Watch', 5499, 'Electronics', 4.4, '⌚'],
    ['Running Sneakers', 6200, 'Fashion', 4.8, '👟'],
  ].forEach((row) => insert.run(...row));
}

// Root: friendly check page
app.get('/', (req, res) => {
  res.json({
    message: 'MegaStore API is running 🌸',
    endpoints: ['/api/products', '/api/products/:id', 'POST /api/orders'],
  });
});

// GET /api/products  (optional ?category=Fashion)
app.get('/api/products', (req, res) => {
  const { category } = req.query;
  const rows = category
    ? db.prepare('SELECT * FROM products WHERE category = ?').all(category)
    : db.prepare('SELECT * FROM products').all();
  res.json(rows);
});

// GET /api/products/:id
app.get('/api/products/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Product not found' });
  res.json(row);
});

// POST /api/orders   body: { items: [{ id, qty }] }
app.post('/api/orders', (req, res) => {
  const { items } = req.body;
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  const getProduct = db.prepare('SELECT * FROM products WHERE id = ?');
  const insertOrder = db.prepare('INSERT INTO orders (total) VALUES (?)');
  const insertItem = db.prepare(
    'INSERT INTO order_items (order_id, product_id, qty, price) VALUES (?, ?, ?, ?)'
  );

  // A transaction: either everything is saved, or nothing is
  const placeOrder = db.transaction((items) => {
    let total = 0;
    const lines = items.map(({ id, qty }) => {
      const product = getProduct.get(id);
      if (!product || !Number.isInteger(qty) || qty < 1) throw new Error('Invalid item in cart');
      total += product.price * qty;
      return { product, qty };
    });
    const { lastInsertRowid } = insertOrder.run(total);
    lines.forEach(({ product, qty }) =>
      insertItem.run(lastInsertRowid, product.id, qty, product.price)
    );
    return { id: Number(lastInsertRowid), total };
  });

  try {
    res.status(201).json(placeOrder(items));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/orders  (newest first, with line items)
app.get('/api/orders', (req, res) => {
  const orders = db.prepare('SELECT * FROM orders ORDER BY id DESC').all();
  const getItems = db.prepare(`
    SELECT oi.product_id, oi.qty, oi.price, p.name, p.img
    FROM order_items oi
    JOIN products p ON p.id = oi.product_id
    WHERE oi.order_id = ?
  `);
  res.json(orders.map((o) => ({ ...o, items: getItems.all(o.id) })));
});

app.listen(3000, () => {
  console.log('MegaStore API v3 (with orders) running on http://localhost:3000');
});