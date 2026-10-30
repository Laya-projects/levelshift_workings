import { createContext, useContext, useEffect, useState } from 'react';

// LOCAL DATA - mimics database tables
const MOCK_PRODUCTS = [
    { id: 1, name: 'Wireless Headphones', price: 2999, category: 'Electronics', rating: 4.5, img: '🎧' },
    { id: 2, name: 'Ergonomic Keyboard', price: 4500, category: 'Electronics', rating: 4.7, img: '⌨️' },
    { id: 3, name: 'Stainless Steel Bottle', price: 1200, category: 'Lifestyle', rating: 4.2, img: '🧴' },
    { id: 4, name: 'Leather Backpack', price: 3800, category: 'Fashion', rating: 4.6, img: '🎒' },
    { id: 5, name: 'Smart Fitness Watch', price: 5499, category: 'Electronics', rating: 4.4, img: '⌚' },
    { id: 6, name: 'Running Sneakers', price: 6200, category: 'Fashion', rating: 4.8, img: '👟' },
];

// MOCK FETCH - simulates database delay / failure
const fetchProductsFromDatabase = (shouldFail = false) =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail) reject(new Error('Database connection timeout. Failed to fetch shop items.'));
            else resolve(MOCK_PRODUCTS);
        }, 1500);
    });

const ShopContext = createContext(null);

export function ShopProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // cart = [{ ...product, qty }]
    const [cart, setCart] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('cart')) || [];
        } catch {
            return [];
        }
    });
    const [addingId, setAddingId] = useState(null);
    const [toast, setToast] = useState('');

    const loadShopData = async (forceFail = false) => {
        setLoading(true);
        setError(null);
        try {
            setProducts(await fetchProductsFromDatabase(forceFail));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadShopData(false);
    }, []);

    // Persist cart
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // Auto-hide toast
    useEffect(() => {
        if (!toast) return;
        const t = setTimeout(() => setToast(''), 2000);
        return () => clearTimeout(t);
    }, [toast]);

    // CART ACTIONS
    const addToCart = async (product) => {
        setAddingId(product.id);
        await new Promise((resolve) => setTimeout(resolve, 600)); // fake server lag
        setCart((prev) => {
            const existing = prev.find((i) => i.id === product.id);
            if (existing) return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
            return [...prev, { ...product, qty: 1 }];
        });
        setAddingId(null);
        setToast(`Added ${product.name} to your cart!`);
    };

    const changeQty = (id, delta) =>
        setCart((prev) =>
            prev
                .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
                .filter((i) => i.qty > 0)
        );

    const removeFromCart = (id) => setCart((prev) => prev.filter((i) => i.id !== id));
    const clearCart = () => setCart([]);

    const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
    const cartTotal = cart.reduce((sum, i) => sum + i.qty * i.price, 0);

    const value = {
        products, loading, error, loadShopData,
        cart, cartCount, cartTotal, addingId,
        addToCart, changeQty, removeFromCart, clearCart,
        toast,
    };

    return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export const useShop = () => useContext(ShopContext);