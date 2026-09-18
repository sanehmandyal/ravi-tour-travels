import axiosClient from './axiosClient';

const STORAGE_KEY = 'rtt_custom_inquiries';

const defaultInquiries = [
  {
    _id: 'inq-1',
    name: 'Amitabh Deshmukh',
    phone: '+91 98200 44910',
    email: 'amitabh.d@gmail.com',
    subject: 'Spiti Valley 6-Day Tour',
    message: 'Need 12-seater Tempo Traveller for 6 days family trip to Spiti Valley & Kinnaur. Please share quote.',
    status: 'Contacted',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString()
  },
  {
    _id: 'inq-2',
    name: 'Neha Kapoor',
    phone: '+91 97112 55901',
    email: 'neha.k@outlook.com',
    subject: 'Airport Pickup to McLeodGanj',
    message: 'Looking for Innova Crysta pickup from Gaggal Airport to McLeodGanj and local sightseeing.',
    status: 'New',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString()
  },
  {
    _id: 'inq-3',
    name: 'Col. Sanjeev Nair',
    phone: '+91 94191 22849',
    email: 'sanjeev.nair@indianarmy.in',
    subject: 'Complete Himachal 8 Days Tour',
    message: 'Complete Himachal 8 days tour inquiry for 4 adults (Dharamshala, Manali, Shimla).',
    status: 'Resolved',
    createdAt: new Date(Date.now() - 86400000).toISOString()
  }
];

const getLocalInquiries = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Error reading local inquiries:', e);
  }
  return defaultInquiries;
};

const saveLocalInquiries = (list) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent('rtt_inquiries_updated', { detail: list }));
  } catch (e) {
    console.warn('Error saving local inquiries:', e);
  }
};

export const inquiryApi = {
  create: async (data) => {
    const list = getLocalInquiries();
    const newInquiry = {
      ...data,
      _id: `inq-custom-${Date.now()}`,
      status: 'New',
      createdAt: new Date().toISOString()
    };
    const updated = [newInquiry, ...list];
    saveLocalInquiries(updated);

    try {
      await axiosClient.post('/inquiries', data);
    } catch (e) {
      // Local save preserved
    }
    return { success: true, message: 'Inquiry submitted successfully!', data: newInquiry };
  },

  getAll: async (params = {}) => {
    try {
      const res = await axiosClient.get('/inquiries', { params });
      if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
        const local = getLocalInquiries();
        const extraLocal = local.filter(i => !res.data.some(b => b._id === i._id));
        const merged = [...extraLocal, ...res.data];
        return { success: true, data: merged };
      }
    } catch (err) {}

    let list = getLocalInquiries();
    if (params.status && params.status !== 'All') {
      list = list.filter(i => i.status?.toLowerCase() === params.status?.toLowerCase());
    }
    if (params.search) {
      const q = params.search.toLowerCase();
      list = list.filter(i =>
        i.name?.toLowerCase().includes(q) ||
        i.phone?.toLowerCase().includes(q) ||
        i.message?.toLowerCase().includes(q) ||
        i.subject?.toLowerCase().includes(q)
      );
    }
    return { success: true, data: list };
  },

  update: async (id, data) => {
    const list = getLocalInquiries();
    const updated = list.map(i => (i._id === id ? { ...i, ...data } : i));
    saveLocalInquiries(updated);

    try {
      await axiosClient.put(`/inquiries/${id}`, data);
    } catch (e) {}
    const found = updated.find(i => i._id === id);
    return { success: true, data: found };
  },

  delete: async (id) => {
    const list = getLocalInquiries();
    const filtered = list.filter(i => i._id !== id);
    saveLocalInquiries(filtered);

    try {
      await axiosClient.delete(`/inquiries/${id}`);
    } catch (e) {}
    return { success: true, message: 'Inquiry deleted successfully' };
  }
};

export default inquiryApi;
