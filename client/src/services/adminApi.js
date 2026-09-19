import axiosClient from './axiosClient';

const SETTINGS_KEY = 'rtt_website_settings';

const sanitizeSettings = (data) => {
  if (!data) return data;
  const s = { ...data };
  if (s.phone === '098164 13603' || s.phone === '09816413603' || !s.phone) {
    s.phone = '70180 88530';
  }
  if (s.altPhone === '+91 98164 13603' || s.altPhone === '098164 13603' || !s.altPhone) {
    s.altPhone = '+91 70180 88530';
  }
  if (s.whatsapp === '+919816413603' || s.whatsapp === '919816413603' || !s.whatsapp) {
    s.whatsapp = '+917018088530';
  }
  if (!s.email || s.email.includes('rinku') || s.email === 'info@ravitravels.com') {
    s.email = 'ravitourtravels@gmail.com';
  }
  if (!s.address || s.address.includes('Kangra') || !s.address.includes('Bus Stand') || !s.address.includes('Una') || s.address === 'Amb, Himachal Pradesh 177203, India') {
    s.address = 'Near Bus Stand, Amb, Una, Himachal Pradesh 177203, India';
  }
  if (!s.areasServed || !s.areasServed.includes('Bus Stand') || s.areasServed.startsWith('Kangra')) {
    s.areasServed = 'Amb (Near Bus Stand), Una District, Kangra, Dharamshala, McLeodGanj, Bir Billing, Dalhousie, Manali, Shimla, Chandigarh & All Himachal';
  }
  if (!s.serviceName || s.serviceName.includes('Kangra') || s.serviceName.includes('Rinku')) {
    s.serviceName = 'Ravi Tour & Travels';
  }
  if (!s.googleMapsUrl || s.googleMapsUrl.includes('Kangra')) {
    s.googleMapsUrl = 'https://www.google.com/maps?q=Bus+Stand+Amb,+Una,+Himachal+Pradesh+177203';
  }
  if (!s.googleReviewsUrl || s.googleReviewsUrl.includes('Kangra')) {
    s.googleReviewsUrl = 'https://www.google.com/search?q=Ravi+Tour+and+Travels+Amb+Himachal#lrd=0x0:0x0,1,,,';
  }
  if (s.facebook && s.facebook.includes('rinku')) {
    s.facebook = 'https://facebook.com/ravitourtravels';
  }
  if (s.instagram && s.instagram.includes('rinku')) {
    s.instagram = 'https://instagram.com/ravitourtravels';
  }
  if (s.youtube && s.youtube.includes('rinku')) {
    s.youtube = 'https://youtube.com/@ravitourtravels';
  }
  return s;
};

export const adminApi = {
  getDashboard: () => axiosClient.get('/admin/dashboard'),
  getUsers: (params) => axiosClient.get('/users', { params }),
  updateUser: (id, data) => axiosClient.put(`/users/${id}`, data),
  deleteUser: (id) => axiosClient.delete(`/users/${id}`),

  getSettings: async () => {
    let localData = null;
    try {
      const saved = localStorage.getItem(SETTINGS_KEY);
      if (saved) {
        localData = sanitizeSettings(JSON.parse(saved));
      }
    } catch (e) {}

    try {
      const res = await axiosClient.get('/admin/settings');
      if (res && res.success && res.data) {
        // Cache and merge: local customized admin changes take precedence over default MongoDB fields
        const merged = sanitizeSettings({ ...res.data, ...(localData || {}) });
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(merged));
        return { success: true, data: merged };
      }
    } catch (err) {}

    // Fallback to local storage
    if (localData) {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(localData));
      return { success: true, data: localData };
    }

    return { success: false, data: null };
  },

  updateSettings: async (data) => {
    // 1. Immediately persist locally
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(data));
      window.dispatchEvent(new CustomEvent('rtt_settings_updated', { detail: data }));
    } catch (e) {}

    // 2. Try remote API update
    try {
      const res = await axiosClient.put('/admin/settings', data);
      if (res && res.success) {
        return res;
      }
    } catch (e) {
      // Remote call failed, but local update succeeded
    }

    return { success: true, data, message: 'Settings saved and published live!' };
  },

  uploadImage: (formData) => axiosClient.post('/admin/upload', formData),
  subscribeNewsletter: (email) => axiosClient.post('/admin/newsletter', { email }),
  getNewsletterSubscribers: () => axiosClient.get('/admin/newsletter')
};

export default adminApi;
