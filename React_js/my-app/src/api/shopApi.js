const BASE_URL = 'http://localhost:3000/api';

export async function getProducts() {
    const res = await fetch(`${BASE_URL}/products`);
    if (!res.ok) throw new Error(`Server error (${res.status})`);
    return res.json();
}

export async function getProduct(id) {
    const res = await fetch(`${BASE_URL}/products/${id}`);
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`Server error (${res.status})`);
    return res.json();
}

export async function createOrder(items) {
    const res = await fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || `Server error (${res.status})`);
    return data;
}
export async function getOrders() {
    const res = await fetch(`${BASE_URL}/orders`);
    if (!res.ok) throw new Error(`Server error (${res.status})`);
    return res.json();
}