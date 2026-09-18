import axiosClient from './axiosClient';
import { defaultDestinations } from '../data/defaultDestinations';

const STORAGE_KEY = 'rtt_custom_destinations';

const getLocalDestinations = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Error reading local destinations:', e);
  }
  return defaultDestinations;
};

const saveLocalDestinations = (list) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent('rtt_destinations_updated', { detail: list }));
  } catch (e) {
    console.warn('Error saving local destinations:', e);
  }
};

const filterDestinationsLocally = (params = {}) => {
  let list = [...getLocalDestinations()];

  if (params.search) {
    const q = params.search.toLowerCase().trim();
    list = list.filter(d =>
      d.name?.toLowerCase().includes(q) ||
      d.description?.toLowerCase().includes(q) ||
      d.region?.toLowerCase().includes(q) ||
      d.tagline?.toLowerCase().includes(q)
    );
  }

  if (params.region && params.region !== 'All') {
    list = list.filter(d => d.region === params.region);
  }

  if (params.featured !== undefined) {
    const isFeat = Boolean(params.featured);
    list = list.filter(d => Boolean(d.featured || d.isFeatured) === isFeat);
  }

  if (params.minPrice) {
    list = list.filter(d => (d.startingPrice || d.estimatedBudget || 0) >= params.minPrice);
  }

  if (params.maxPrice) {
    list = list.filter(d => (d.startingPrice || d.estimatedBudget || 0) <= params.maxPrice);
  }

  return list;
};

export const destinationApi = {
  getAll: async (params = {}) => {
    try {
      const res = await axiosClient.get('/destinations', { params });
      if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
        const local = getLocalDestinations();
        // Merge backend data with local admin modifications
        const customItems = local.filter(d => String(d._id).startsWith('custom-dest-'));
        const merged = [
          ...customItems,
          ...res.data.map(b => {
            const localMatch = local.find(l => l._id === b._id || l.slug === b.slug);
            return localMatch ? { ...b, ...localMatch } : b;
          })
        ];
        const unique = Array.from(new Map(merged.map(item => [item.slug || item._id, item])).values());
        return {
          success: true,
          data: unique,
          pagination: {
            total: unique.length,
            page: params.page || 1,
            totalPages: 1,
            limit: params.limit || 50
          }
        };
      }
    } catch (err) {
      // Remote backend unreachable or returning 404 - fallback to rich local data
    }
    const filtered = filterDestinationsLocally(params);
    return {
      success: true,
      data: filtered,
      pagination: {
        total: filtered.length,
        page: params.page || 1,
        totalPages: 1,
        limit: params.limit || 50
      }
    };
  },

  getBySlug: async (slug) => {
    try {
      const res = await axiosClient.get(`/destinations/${slug}`);
      if (res && res.success && res.data) {
        const local = getLocalDestinations();
        const localMatch = local.find(l => l._id === res.data._id || l.slug === res.data.slug);
        return { success: true, data: localMatch ? { ...res.data, ...localMatch } : res.data };
      }
    } catch (err) {}

    const list = getLocalDestinations();
    const found = list.find(d => d.slug === slug || d._id === slug);
    if (found) {
      return { success: true, data: found };
    }
    return { success: false, message: 'Destination not found' };
  },

  getById: async (id) => {
    try {
      const res = await axiosClient.get(`/destinations/${id}`);
      if (res && res.success && res.data) {
        const local = getLocalDestinations();
        const localMatch = local.find(l => l._id === res.data._id || l.slug === res.data.slug);
        return { success: true, data: localMatch ? { ...res.data, ...localMatch } : res.data };
      }
    } catch (err) {}

    const list = getLocalDestinations();
    const found = list.find(d => d._id === id || d.slug === id);
    if (found) {
      return { success: true, data: found };
    }
    return { success: false, message: 'Destination not found' };
  },

  create: async (data) => {
    const list = getLocalDestinations();
    const newDest = {
      ...data,
      _id: `custom-dest-${Date.now()}`,
      slug: data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      rating: data.rating || 5.0,
      reviewsCount: data.reviewsCount || 1,
      featured: data.featured !== undefined ? data.featured : true,
      isFeatured: data.featured !== undefined ? data.featured : true,
      createdAt: new Date().toISOString()
    };
    const updated = [newDest, ...list];
    saveLocalDestinations(updated);

    try {
      await axiosClient.post('/destinations', data);
    } catch (e) {
      // API call failed, local save succeeded
    }
    return { success: true, data: newDest };
  },

  update: async (id, data) => {
    const list = getLocalDestinations();
    const updated = list.map(d => (d._id === id || d.slug === id ? { ...d, ...data } : d));
    saveLocalDestinations(updated);

    try {
      await axiosClient.put(`/destinations/${id}`, data);
    } catch (e) {
      // Local updated
    }
    const updatedItem = updated.find(d => d._id === id || d.slug === id);
    return { success: true, data: updatedItem };
  },

  delete: async (id) => {
    const list = getLocalDestinations();
    const filtered = list.filter(d => d._id !== id && d.slug !== id);
    saveLocalDestinations(filtered);

    try {
      await axiosClient.delete(`/destinations/${id}`);
    } catch (e) {
      // Local deleted
    }
    return { success: true, message: 'Destination deleted successfully' };
  }
};

export default destinationApi;
