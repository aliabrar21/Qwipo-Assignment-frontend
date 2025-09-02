// src/services/api.js
const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";

async function parseJSONSafe(res) {
    const text = await res.text().catch(() => "");
    try {
        return text ? JSON.parse(text) : null;
    } catch {
        // return raw text when not JSON (helps debugging)
        return text;
    }
}

export async function getCustomers() {
    const res = await fetch(`${API_BASE}/customers`);
    const data = await parseJSONSafe(res);
    if (!res.ok) throw new Error(data?.error || data?.message || `Status ${res.status}`);
    return data;
}

export async function getCustomerById(id) {
    const res = await fetch(`${API_BASE}/customers/${id}`);
    const data = await parseJSONSafe(res);
    if (!res.ok) throw new Error(data?.error || data?.message || `Status ${res.status}`);
    return data;
}

export async function addCustomer(customer) {
    const res = await fetch(`${API_BASE}/customers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer),
    });

    const data = await parseJSONSafe(res);
    if (!res.ok) throw new Error(data?.error || data?.message || `Status ${res.status} - ${JSON.stringify(data)}`);
    return data;
}

export async function updateCustomer(id, customer) {
    const res = await fetch(`${API_BASE}/customers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer),
    });
    const data = await parseJSONSafe(res);
    if (!res.ok) throw new Error(data?.error || data?.message || `Status ${res.status}`);
    return data;
}

export async function deleteCustomer(id) {
    const res = await fetch(`${API_BASE}/customers/${id}`, { method: "DELETE" });
    const data = await parseJSONSafe(res);
    if (!res.ok) throw new Error(data?.error || data?.message || `Status ${res.status}`);
    return data;
}
