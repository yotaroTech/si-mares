const API_BASE = import.meta.env.VITE_API_URL || 'http://nkwswcscokogs4k4wwkwoc04.76.13.5.41.sslip.io/api/v1';

function getSessionId() {
  let sid = localStorage.getItem('si_session_id');
  if (!sid) {
    sid = crypto.randomUUID();
    localStorage.setItem('si_session_id', sid);
  }
  return sid;
}

async function request(path, options = {}) {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Session-ID': getSessionId(),
    ...options.headers,
  };

  const token = localStorage.getItem('si_token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Network error' }));
    throw { status: res.status, ...error };
  }

  if (res.status === 204) return null;
  return res.json();
}

// Public API
export const api = {
  // Storefront
  getHome: () => request('/storefront/home'),
  getSettings: () => request('/storefront/settings'),

  // Products
  getProducts: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/products${qs ? '?' + qs : ''}`);
  },
  getProduct: (slug) => request(`/products/${slug}`),

  // Categories & Collections
  getCategories: () => request('/categories'),
  getCollections: () => request('/collections'),

  // Search
  search: (q) => request(`/search?q=${encodeURIComponent(q)}`),

  // Cart
  getCart: () => request('/cart'),
  addToCart: (product_variant_id, quantity = 1) =>
    request('/cart', { method: 'POST', body: JSON.stringify({ product_variant_id, quantity }) }),
  updateCartItem: (id, quantity) =>
    request(`/cart/${id}`, { method: 'PUT', body: JSON.stringify({ quantity }) }),
  removeCartItem: (id) =>
    request(`/cart/${id}`, { method: 'DELETE' }),
  clearCart: () =>
    request('/cart', { method: 'DELETE' }),
  mergeCart: () =>
    request('/cart/merge', { method: 'POST', body: JSON.stringify({ session_id: getSessionId() }) }),

  // Auth
  register: (data) =>
    request('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  login: (email, password) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  logout: () =>
    request('/auth/logout', { method: 'POST' }),
  getUser: () => request('/auth/user'),
  updateProfile: (data) =>
    request('/auth/user', { method: 'PUT', body: JSON.stringify(data) }),

  // Wishlist
  getWishlist: () => request('/wishlist'),
  toggleWishlist: (product_id) =>
    request('/wishlist/toggle', { method: 'POST', body: JSON.stringify({ product_id }) }),

  // Orders
  createOrder: (data) =>
    request('/orders', { method: 'POST', body: JSON.stringify(data) }),
  getOrders: () => request('/orders'),
  getOrder: (orderNumber) => request(`/orders/${orderNumber}`),

  // Coupons
  validateCoupon: (code, subtotal) =>
    request('/coupons/validate', { method: 'POST', body: JSON.stringify({ code, subtotal }) }),

  // Newsletter
  subscribe: (email, name) =>
    request('/newsletter/subscribe', { method: 'POST', body: JSON.stringify({ email, name }) }),

  // Shipping
  getShippingZones: () => request('/shipping-zones'),

  // Pages
  getPage: (slug) => request(`/pages/${slug}`),
};
