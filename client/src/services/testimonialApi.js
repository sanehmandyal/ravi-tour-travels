import axiosClient from './axiosClient';
import { defaultTestimonials } from '../data/defaultTestimonials';

const STORAGE_KEY = 'rtt_custom_testimonials';

const getLocalTestimonials = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Error reading local testimonials:', e);
  }
  return defaultTestimonials;
};

const saveLocalTestimonials = (list) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent('rtt_testimonials_updated', { detail: list }));
  } catch (e) {
    console.warn('Error saving local testimonials:', e);
  }
};

export const testimonialApi = {
  getAll: async (params = {}) => {
    try {
      const res = await axiosClient.get('/testimonials', { params });
      if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
        const local = getLocalTestimonials();
        const extraLocal = local.filter(t => !res.data.some(b => b._id === t._id));
        const merged = [...res.data.map(b => {
          const localMatch = local.find(l => l._id === b._id);
          return localMatch ? { ...b, ...localMatch } : b;
        }), ...extraLocal];
        return { success: true, data: merged };
      }
    } catch (err) {}

    let list = getLocalTestimonials();
    if (params.status && params.status !== '') {
      list = list.filter(t => t.status === params.status);
    }
    return { success: true, data: list };
  },

  create: async (data) => {
    const list = getLocalTestimonials();
    const newTestimonial = {
      ...data,
      _id: `test-custom-${Date.now()}`,
      status: data.status || 'approved',
      rating: Number(data.rating) || 5,
      createdAt: new Date().toISOString()
    };
    const updated = [newTestimonial, ...list];
    saveLocalTestimonials(updated);

    try {
      await axiosClient.post('/testimonials', data);
    } catch (e) {}
    return { success: true, data: newTestimonial };
  },

  update: async (id, data) => {
    const list = getLocalTestimonials();
    const updated = list.map(t => (t._id === id ? { ...t, ...data } : t));
    saveLocalTestimonials(updated);

    try {
      await axiosClient.put(`/testimonials/${id}`, data);
    } catch (e) {}
    const updatedItem = updated.find(t => t._id === id);
    return { success: true, data: updatedItem };
  },

  delete: async (id) => {
    const list = getLocalTestimonials();
    const filtered = list.filter(t => t._id !== id);
    saveLocalTestimonials(filtered);

    try {
      await axiosClient.delete(`/testimonials/${id}`);
    } catch (e) {}
    return { success: true, message: 'Testimonial deleted successfully' };
  }
};

export default testimonialApi;
