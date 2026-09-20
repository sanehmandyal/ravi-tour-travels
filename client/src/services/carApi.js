import axiosClient from './axiosClient';
import { defaultCars } from '../data/defaultCars';

const STORAGE_KEY = 'rtt_custom_cars';

const enrichCarWithExactImage = (car) => {
  if (!car) return car;
  const match = defaultCars.find(
    dc => dc._id === car._id || (dc.name && car.name && dc.name.toLowerCase().includes(car.name.toLowerCase().split(' ')[0]))
  );
  if (match) {
    // If the car image is missing or is an old unsplash generic stock photo, replace with exact authentic photo
    const isOldGenericImage = !car.image || car.image.includes('images.unsplash.com');
    return {
      ...car,
      image: isOldGenericImage ? match.image : car.image
    };
  }
  return car;
};

const getLocalCars = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map(enrichCarWithExactImage);
      }
    }
  } catch (e) {
    console.warn('Error reading local cars:', e);
  }
  return defaultCars;
};

const saveLocalCars = (list) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent('rtt_cars_updated', { detail: list }));
  } catch (e) {
    console.warn('Error saving local cars:', e);
  }
};

export const carApi = {
  getAll: async (params = {}) => {
    try {
      const res = await axiosClient.get('/cars', { params });
      if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
        // If local storage has admin modifications, merge them so custom edits are preserved
        const local = getLocalCars();
        // Keep any custom created cars that may not exist in backend
        const extraLocal = local.filter(c => !res.data.some(b => b._id === c._id));
        const merged = [...res.data.map(b => {
          const localMatch = local.find(l => l._id === b._id);
          const item = localMatch ? { ...b, ...localMatch } : b;
          return enrichCarWithExactImage(item);
        }), ...extraLocal.map(enrichCarWithExactImage)];
        return { success: true, data: merged };
      }
    } catch (err) {
      // Backend unreachable or offline - use resilient local data
    }

    let list = getLocalCars();
    if (params.category && params.category !== 'All') {
      list = list.filter(c => c.category === params.category);
    }
    if (params.search) {
      const q = params.search.toLowerCase();
      list = list.filter(c =>
        c.name?.toLowerCase().includes(q) ||
        c.category?.toLowerCase().includes(q) ||
        c.description?.toLowerCase().includes(q)
      );
    }

    return { success: true, data: list.map(enrichCarWithExactImage) };
  },

  getById: async (id) => {
    try {
      const res = await axiosClient.get(`/cars/${id}`);
      if (res && res.success && res.data) {
        return { success: true, data: enrichCarWithExactImage(res.data) };
      }
    } catch (err) {}

    const list = getLocalCars();
    const found = list.find(c => c._id === id);
    if (found) {
      return { success: true, data: enrichCarWithExactImage(found) };
    }
    return { success: false, message: 'Vehicle not found' };
  },

  create: async (data) => {
    const list = getLocalCars();
    const newCar = {
      ...data,
      _id: `car-custom-${Date.now()}`,
      isAvailable: data.isAvailable !== undefined ? data.isAvailable : true,
      features: Array.isArray(data.features)
        ? data.features
        : (typeof data.features === 'string' ? data.features.split(',').map(s => s.trim()).filter(Boolean) : []),
      createdAt: new Date().toISOString()
    };
    const updated = [newCar, ...list];
    saveLocalCars(updated);

    try {
      await axiosClient.post('/cars', data);
    } catch (e) {
      // Local save preserved
    }
    return { success: true, data: newCar };
  },

  update: async (id, data) => {
    const list = getLocalCars();
    const updated = list.map(c => {
      if (c._id === id) {
        const features = Array.isArray(data.features)
          ? data.features
          : (typeof data.features === 'string' ? data.features.split(',').map(s => s.trim()).filter(Boolean) : c.features);
        return { ...c, ...data, features };
      }
      return c;
    });
    saveLocalCars(updated);

    try {
      await axiosClient.put(`/cars/${id}`, data);
    } catch (e) {
      // Local update preserved
    }
    const updatedItem = updated.find(c => c._id === id);
    return { success: true, data: updatedItem };
  },

  delete: async (id) => {
    const list = getLocalCars();
    const filtered = list.filter(c => c._id !== id);
    saveLocalCars(filtered);

    try {
      await axiosClient.delete(`/cars/${id}`);
    } catch (e) {
      // Local delete preserved
    }
    return { success: true, message: 'Vehicle removed from fleet' };
  }
};

export default carApi;
