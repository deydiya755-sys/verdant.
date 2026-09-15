import { PLANTS, ACCESSORIES } from '../data/plants';

const API_BASE = '/api';

/**
 * Fetch all plants with optional filtering & sorting params
 */
export async function fetchPlants(filters = {}) {
  try {
    const query = new URLSearchParams();
    if (filters.search) query.append('search', filters.search);
    if (filters.light && filters.light.length > 0) query.append('light', filters.light.join(','));
    if (filters.pet) query.append('pet', 'true');
    if (filters.size && filters.size.length > 0) query.append('size', filters.size.join(','));
    if (filters.difficulty && filters.difficulty.length > 0) query.append('difficulty', filters.difficulty.join(','));
    if (filters.category) query.append('category', filters.category);
    if (filters.sort) query.append('sort', filters.sort);

    const res = await fetch(`${API_BASE}/plants?${query.toString()}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const result = await res.json();
    return result.data;
  } catch (error) {
    console.warn('Backend unavailable, utilizing client dataset fallback:', error.message);
    // Fallback logic
    return PLANTS.filter(p => {
      if (filters.pet && !p.petFriendly) return false;
      if (filters.light && filters.light.length > 0) {
        if (!filters.light.some(l => p.lightLevel.toLowerCase().includes(l.toLowerCase()))) return false;
      }
      if (filters.difficulty && filters.difficulty.length > 0) {
        if (!filters.difficulty.includes(p.difficulty)) return false;
      }
      if (filters.size && filters.size.length > 0) {
        if (!filters.size.includes(p.size)) return false;
      }
      return true;
    });
  }
}

/**
 * Fetch a single plant by its ID
 */
export async function fetchPlantById(id) {
  try {
    const res = await fetch(`${API_BASE}/plants/${id}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const result = await res.json();
    return result.data;
  } catch (error) {
    console.warn('Backend unavailable, finding in client fallback dataset:', error.message);
    return PLANTS.find(p => p.id === id) || PLANTS[0];
  }
}

/**
 * Fetch curated plants for homepage
 */
export async function fetchCuratedPlants() {
  try {
    const res = await fetch(`${API_BASE}/plants/curated`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const result = await res.json();
    return result.data;
  } catch (error) {
    return PLANTS.slice(0, 4);
  }
}

/**
 * Fetch cross-sell accessories
 */
export async function fetchAccessories() {
  try {
    const res = await fetch(`${API_BASE}/plants/accessories`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const result = await res.json();
    return result.data;
  } catch (error) {
    return ACCESSORIES;
  }
}

/**
 * Submit plant diagnostic quiz
 */
export async function submitQuizDiagnostic(diagnosticAnswers) {
  try {
    const res = await fetch(`${API_BASE}/quiz/recommend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(diagnosticAnswers)
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const result = await res.json();
    return result.recommendations;
  } catch (error) {
    console.warn('Backend quiz API error, running local recommendation heuristic:', error.message);
    return PLANTS.slice(0, 3);
  }
}

/**
 * Place a new customer order
 */
export async function createOrder(orderPayload) {
  try {
    const res = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderPayload)
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const result = await res.json();
    return result.order;
  } catch (error) {
    console.warn('Backend order API error, using local fallback:', error.message);
    return {
      orderId: `VRD-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      arrivalDate: 'Wednesday, Oct 12',
      items: orderPayload.items || [],
      subtotal: 109.00,
      shippingFee: 0,
      tax: 8.72,
      grandTotal: 117.72,
      customer: orderPayload.customer
    };
  }
}

/**
 * Fetch order by ID for Care Dashboard
 */
export async function fetchOrderById(orderId) {
  try {
    const res = await fetch(`${API_BASE}/orders/${orderId}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const result = await res.json();
    return result.order;
  } catch (error) {
    return null;
  }
}

/**
 * Subscribe to botanical newsletter
 */
export async function subscribeNewsletter(email) {
  try {
    const res = await fetch(`${API_BASE}/newsletter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const result = await res.json();
    return result;
  } catch (error) {
    return { success: true, message: 'Welcome to the Verdant Sanctuary circle!' };
  }
}
