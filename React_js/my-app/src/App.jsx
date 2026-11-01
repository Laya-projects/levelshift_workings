import { useState, useEffect } from 'react';
import { Routes, Route, Link, NavLink, Outlet, useParams, useNavigate } from 'react-router-dom';
import { useShop } from './ShopContext.jsx';
import { getProduct, createOrder, getOrders } from './api/shopApi.js';

const CATEGORIES = ['All', 'Electronics', 'Fashion', 'Lifestyle'];

// Pastel tile colour per category
const TILE = {
  Electronics: 'from-sky-100 to-indigo-100',
  Fashion: 'from-pink-100 to-rose-100',
  Lifestyle: 'from-amber-100 to-orange-100',
};

// Reusable button styles (shadcn-style variants, pastel palette)
const primaryBtn =
  'rounded-full bg-rose-400 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-rose-200 transition hover:bg-rose-500 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60';
const softBtn =
  'rounded-full bg-violet-100 px-4 py-2.5 text-sm font-semibold text-violet-700 transition hover:bg-violet-200 active:scale-95';

/* ---------- LAYOUT ---------- */
function Layout() {
  const { loadShopData, cartCount, toast } = useShop();

  const navClass = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition ${isActive ? 'bg-violet-100 text-violet-700' : 'text-slate-500 hover:bg-violet-50'
    }`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-violet-50 font-sans text-slate-700">
      <header className="sticky top-0 z-10 border-b border-pink-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-3">
          <Link to="/">
            <h1 className="text-2xl font-extrabold text-rose-400">🌸 MegaStore</h1>
          </Link>

          <div className="flex gap-2">
            <button
              onClick={() => loadShopData(false)}
              className="rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-200"
            >
              Simulate Server Refresh
            </button>
            <button
              onClick={() => loadShopData(true)}
              className="rounded-full bg-red-100 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-200"
            >
              Simulate Server Crash
            </button>
          </div>

          <nav className="flex items-center gap-2">
            <NavLink to="/" end className={navClass}>
              Shop
            </NavLink>
            <NavLink to="/orders" className={navClass}>
              Orders
            </NavLink>
            <NavLink
              to="/cart"
              className="rounded-full bg-pink-100 px-4 py-2 text-sm font-semibold text-rose-500 transition hover:bg-pink-200"
            >
              🛒 Cart
              <span className="ml-2 rounded-full bg-rose-400 px-2 py-0.5 text-xs text-white">
                {cartCount}
              </span>
            </NavLink>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-8">
        <Outlet />
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-slate-800 px-5 py-3 text-sm text-white shadow-lg">
          ✅ {toast}
        </div>
      )}
    </div>
  );
}

/* ---------- Loading / Error wrapper ---------- */
function DataGate({ children }) {
  const { loading, error, loadShopData } = useShop();

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-pink-100 border-t-rose-400" />
        <h3 className="mt-4 text-slate-500">Fetching items from server database...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-lg rounded-3xl border border-red-100 bg-red-50 p-8 text-center">
        <h2 className="text-xl font-bold text-red-700">⚠️ Network Error Caught</h2>
        <p className="my-3 text-red-600">{error}</p>
        <button onClick={() => loadShopData(false)} className={primaryBtn}>
          Reconnect to Database
        </button>
      </div>
    );
  }

  return children;
}

/* ---------- PAGE: Shop ( / ) ---------- */
function ShopPage() {
  const { products, addToCart, addingId } = useShop();
  const [category, setCategory] = useState('All');

  const shown = category === 'All' ? products : products.filter((p) => p.category === category);

  return (
    <DataGate>
      <div className="flex flex-col gap-8 md:flex-row">
        {/* Sidebar */}
        <aside className="shrink-0 md:w-52">
          <div className="rounded-3xl border border-pink-100 bg-white p-4 shadow-sm">
            <h3 className="mb-3 px-2 text-sm font-bold uppercase tracking-wide text-slate-400">
              Categories
            </h3>
            <ul className="space-y-1">
              {CATEGORIES.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => setCategory(cat)}
                    className={`w-full rounded-full px-4 py-2 text-left text-sm transition ${category === cat
                      ? 'bg-rose-400 font-semibold text-white shadow-md shadow-rose-200'
                      : 'text-slate-600 hover:bg-pink-50'
                      }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Products */}
        <main className="grow">
          <p className="mb-4 text-sm text-slate-500">
            Showing {shown.length} items in <strong className="text-rose-400">{category}</strong>
          </p>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-6">
            {shown.map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-between rounded-3xl border border-pink-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-pink-100"
              >
                <div>
                  <div
                    className={`flex h-32 items-center justify-center rounded-2xl bg-gradient-to-br text-6xl ${TILE[item.category] || 'from-pink-100 to-violet-100'
                      }`}
                  >
                    {item.img}
                  </div>
                  <h4 className="mt-4 font-bold text-slate-800">{item.name}</h4>
                  <span className="mt-1 inline-block rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-medium text-violet-600">
                    {item.category}
                  </span>
                </div>

                <div className="mt-5">
                  <div className="mb-3 flex items-center justify-between">
                    <strong className="text-lg text-slate-800">₹{item.price}</strong>
                    <span className="rounded-full bg-amber-50 px-2 py-0.5 text-sm text-amber-500">
                      ⭐ {item.rating}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Link to={`/product/${item.id}`} className={`${softBtn} flex-1 text-center`}>
                      View
                    </Link>
                    <button
                      onClick={() => addToCart(item)}
                      disabled={addingId !== null}
                      className={`${primaryBtn} flex-[2]`}
                    >
                      {addingId === item.id ? 'Adding...' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </DataGate>
  );
}

/* ---------- PAGE: Product details ( /product/:id ) ---------- */
function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, addingId } = useShop();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    getProduct(id)
      .then((data) => !cancelled && setProduct(data))
      .catch((err) => !cancelled && setError(err.message))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-pink-100 border-t-rose-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center text-red-600">
        ⚠️ {error === 'Failed to fetch' ? 'Cannot reach the server.' : error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-20 text-center">
        <h2 className="mb-3 text-2xl font-bold">Product not found 😕</h2>
        <Link to="/" className="text-rose-400 hover:underline">← Back to shop</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-3xl gap-8 rounded-3xl border border-pink-100 bg-white p-6 shadow-lg shadow-pink-100 md:grid-cols-2">
      <div
        className={`flex items-center justify-center rounded-2xl bg-gradient-to-br py-14 text-8xl ${TILE[product.category] || 'from-pink-100 to-violet-100'
          }`}
      >
        {product.img}
      </div>

      <div className="flex flex-col">
        <span className="w-fit rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-600">
          {product.category}
        </span>
        <h2 className="mt-3 text-2xl font-extrabold text-slate-800">{product.name}</h2>
        <p className="mt-1 text-amber-500">⭐ {product.rating}</p>
        <p className="mt-4 grow text-slate-500">
          This is a high-quality product from our {product.category} lineup. Engineered for high
          durability and performance.
        </p>
        <h3 className="mt-4 text-3xl font-extrabold text-rose-400">₹{product.price}</h3>

        <div className="mt-5 flex gap-2">
          <button onClick={() => navigate(-1)} className={`${softBtn} flex-1`}>← Back</button>
          <button
            onClick={() => addToCart(product)}
            disabled={addingId !== null}
            className={`${primaryBtn} flex-[2]`}
          >
            {addingId === product.id ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
/* ---------- PAGE: Cart ( /cart ) ---------- */
function CartPage() {
  const { cart, cartTotal, changeQty, removeFromCart, clearCart } = useShop();
  const [order, setOrder] = useState(null);
  const [placing, setPlacing] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

  const checkout = async () => {
    setPlacing(true);
    setCheckoutError('');
    try {
      const saved = await createOrder(cart.map(({ id, qty }) => ({ id, qty })));
      setOrder(saved);
      clearCart();
    } catch (err) {
      setCheckoutError(err.message === 'Failed to fetch' ? 'Cannot reach the server.' : err.message);
    } finally {
      setPlacing(false);
    }
  };

  if (order) {
    return (
      <div className="py-20 text-center">
        <div className="text-6xl">🎉</div>
        <h2 className="mt-3 mb-1 text-2xl font-bold">Order #{order.id} placed!</h2>
        <p className="mb-3 text-slate-500">Total paid: ₹{order.total}</p>
        <Link to="/" onClick={() => setOrder(null)} className="text-rose-400 hover:underline">
          Continue shopping
        </Link>
      </div>
    );
  }
  if (cart.length === 0) {
    return (
      <div className="py-20 text-center">
        <div className="text-6xl">🛒</div>
        <h2 className="mt-3 mb-2 text-2xl font-bold">Your cart is empty</h2>
        <Link to="/" className="text-rose-400 hover:underline">← Go shopping</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="mb-5 text-2xl font-extrabold text-slate-800">Your Cart</h2>

      <div className="space-y-3">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 rounded-3xl border border-pink-100 bg-white p-4 shadow-sm"
          >
            <div
              className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br text-3xl ${TILE[item.category] || 'from-pink-100 to-violet-100'
                }`}
            >
              {item.img}
            </div>

            <div className="grow">
              <Link
                to={`/product/${item.id}`}
                className="font-bold text-slate-800 hover:text-rose-400"
              >
                {item.name}
              </Link>
              <div className="text-sm text-slate-400">₹{item.price} each</div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => changeQty(item.id, -1)}
                className="h-8 w-8 rounded-full bg-violet-100 font-bold text-violet-700 transition hover:bg-violet-200"
              >
                −
              </button>
              <strong className="w-6 text-center">{item.qty}</strong>
              <button
                onClick={() => changeQty(item.id, 1)}
                className="h-8 w-8 rounded-full bg-violet-100 font-bold text-violet-700 transition hover:bg-violet-200"
              >
                +
              </button>
            </div>

            <strong className="w-20 text-right text-slate-800">₹{item.price * item.qty}</strong>

            <button
              onClick={() => removeFromCart(item.id)}
              className="h-8 w-8 rounded-full bg-red-100 text-red-500 transition hover:bg-red-200"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-3xl border border-pink-100 bg-white p-6 shadow-sm">
        <div className="mb-4 flex justify-between text-xl">
          <span>Total</span>
          <strong className="text-rose-400">₹{cartTotal}</strong>
        </div>
        {checkoutError && <p className="mb-3 text-sm text-red-500">⚠️ {checkoutError}</p>}
        <div className="flex gap-2">
          <button onClick={clearCart} className={`${softBtn} flex-1`}>Clear Cart</button>
          <button onClick={checkout} disabled={placing} className={`${primaryBtn} flex-[2]`}>
            {placing ? 'Placing order...' : 'Checkout'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- PAGE: Order history ( /orders ) ---------- */
function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getOrders()
      .then(setOrders)
      .catch((err) => setError(err.message === 'Failed to fetch' ? 'Cannot reach the server.' : err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-pink-100 border-t-rose-400" />
      </div>
    );
  }

  if (error) return <div className="py-20 text-center text-red-600">⚠️ {error}</div>;

  if (orders.length === 0) {
    return (
      <div className="py-20 text-center">
        <div className="text-6xl">📦</div>
        <h2 className="mt-3 mb-2 text-2xl font-bold">No orders yet</h2>
        <Link to="/" className="text-rose-400 hover:underline">← Go shopping</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="mb-5 text-2xl font-extrabold text-slate-800">Your Orders</h2>

      <div className="space-y-4">
        {orders.map((o) => (
          <div key={o.id} className="rounded-3xl border border-pink-100 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-800">Order #{o.id}</h3>
                <p className="text-xs text-slate-400">
                  {new Date(o.created_at.replace(' ', 'T') + 'Z').toLocaleString()}
                </p>
              </div>
              <strong className="text-lg text-rose-400">₹{o.total}</strong>
            </div>

            <ul className="space-y-1 text-sm text-slate-600">
              {o.items.map((it) => (
                <li key={it.product_id} className="flex justify-between">
                  <span>{it.img} {it.name} × {it.qty}</span>
                  <span>₹{it.price * it.qty}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- 404 ---------- */
function NotFound() {
  return (
    <div className="py-20 text-center">
      <h2 className="mb-3 text-3xl font-bold">404 – Page not found</h2>
      <Link to="/" className="text-rose-400 hover:underline">← Back to shop</Link>
    </div>
  );
}

/* ---------- ROUTES ---------- */
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<ShopPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}