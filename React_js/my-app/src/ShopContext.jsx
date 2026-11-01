import { createContext, useContext, useEffect, useState } from 'react';

import { getProducts } from './api/shopApi.js';

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
            if (forceFail) throw new Error('Simulated server crash.');
            setProducts(await getProducts());
        } catch (err) {
            setError(
                err.message === 'Failed to fetch'
                    ? 'Cannot reach the server. Is it running on port 3000?'
                    : err.message
            );
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