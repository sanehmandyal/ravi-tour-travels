import axiosClient from './axiosClient';

const STORAGE_KEY = 'rtt_custom_bookings';

const defaultBookings = [
  {
    _id: 'bk-1',
    bookingNumber: 'RTT-2026-108',
    customerName: 'Aarav Sharma',
    phone: '+91 98160 44211',
    email: 'aarav.sharma@gmail.com',
    service: 'Dharamshala - Dalhousie (4 Days)',
    vehicleType: 'Innova Crysta (7+1)',
    totalAmount: 18500,
    bookingStatus: 'Confirmed',
    travelDate: new Date(Date.now() + 86400000 * 2).toISOString(),
    createdAt: new Date().toISOString()
  },
  {
    _id: 'bk-2',
    bookingNumber: 'RTT-2026-109',
    customerName: 'Vikram Malhotra',
    phone: '+91 98721 88390',
    email: 'vikram.m@gmail.com',
    service: 'Manali - Rohtang Pass Special',
    vehicleType: 'Toyota Fortuner 4x4',
    totalAmount: 26000,
    bookingStatus: 'Confirmed',
    travelDate: new Date(Date.now() + 86400000 * 4).toISOString(),
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString()
  },
  {
    _id: 'bk-3',
    bookingNumber: 'RTT-2026-110',
    customerName: 'Priya Sundaram',
    phone: '+91 94180 55122',
    email: 'priya.sundaram@yahoo.com',
    service: 'Shimla - Kufri - Narkanda Tour',
    vehicleType: 'Maruti Suzuki Dzire',
    totalAmount: 12000,
    bookingStatus: 'Confirmed',
    travelDate: new Date(Date.now() + 86400000 * 6).toISOString(),
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    _id: 'bk-4',
    bookingNumber: 'RTT-2026-111',
    customerName: 'Sunil Mehta',
    phone: '+91 98051 33290',
    email: 'sunil.mehta@corp.in',
    service: 'Chandigarh to Kangra One-Way Drop',
    vehicleType: 'Maruti Suzuki Ertiga',
    totalAmount: 7500,
    bookingStatus: 'Completed',
    travelDate: new Date(Date.now() - 86400000 * 2).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString()
  },
  {
    _id: 'bk-5',
    bookingNumber: 'RTT-2026-112',
    customerName: 'Dr. Rajesh Khanna',
    phone: '+91 98165 77102',
    email: 'rajesh.khanna@med.org',
    service: 'Kangra Valley & Bir Paragliding Tour',
    vehicleType: 'Innova Hycross Hybrid',
    totalAmount: 15500,
    bookingStatus: 'Pending',
    travelDate: new Date(Date.now() + 86400000 * 8).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString()
  }
];

const getLocalBookings = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Error reading local bookings:', e);
  }
  return defaultBookings;
};

const saveLocalBookings = (list) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent('rtt_bookings_updated', { detail: list }));
  } catch (e) {
    console.warn('Error saving local bookings:', e);
  }
};

export const bookingApi = {
  create: async (bookingData) => {
    const list = getLocalBookings();
    const newBooking = {
      ...bookingData,
      _id: `bk-custom-${Date.now()}`,
      bookingNumber: `RTT-2026-${Math.floor(100 + Math.random() * 900)}`,
      bookingStatus: 'Pending',
      paymentStatus: 'Pending',
      createdAt: new Date().toISOString()
    };
    const updated = [newBooking, ...list];
    saveLocalBookings(updated);

    try {
      await axiosClient.post('/bookings', bookingData);
    } catch (e) {}
    return { success: true, message: 'Booking request placed successfully!', data: newBooking };
  },

  getAll: async (params = {}) => {
    try {
      const res = await axiosClient.get('/bookings', { params });
      if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
        const local = getLocalBookings();
        const extraLocal = local.filter(b => !res.data.some(remote => remote._id === b._id));
        const merged = [...extraLocal, ...res.data];
        return { success: true, data: merged, pagination: { total: merged.length, totalPages: 1, page: 1 } };
      }
    } catch (err) {}

    let list = getLocalBookings();
    if (params.status && params.status !== 'All') {
      list = list.filter(b => b.bookingStatus?.toLowerCase() === params.status?.toLowerCase());
    }
    if (params.search) {
      const q = params.search.toLowerCase();
      list = list.filter(b =>
        b.customerName?.toLowerCase().includes(q) ||
        b.bookingNumber?.toLowerCase().includes(q) ||
        b.phone?.toLowerCase().includes(q) ||
        b.service?.toLowerCase().includes(q)
      );
    }
    return {
      success: true,
      data: list,
      pagination: { total: list.length, totalPages: Math.ceil(list.length / (params.limit || 12)) || 1, page: params.page || 1 }
    };
  },

  getById: async (id) => {
    try {
      const res = await axiosClient.get(`/bookings/${id}`);
      if (res && res.success && res.data) return res;
    } catch (e) {}
    const list = getLocalBookings();
    const found = list.find(b => b._id === id || b.bookingNumber === id);
    if (found) return { success: true, data: found };
    return { success: false, message: 'Booking not found' };
  },

  updateStatus: async (id, statusData) => {
    const list = getLocalBookings();
    const updated = list.map(b => (b._id === id ? { ...b, ...statusData } : b));
    saveLocalBookings(updated);

    try {
      await axiosClient.put(`/bookings/${id}/status`, statusData);
    } catch (e) {}
    const found = updated.find(b => b._id === id);
    return { success: true, data: found };
  },

  delete: async (id) => {
    const list = getLocalBookings();
    const filtered = list.filter(b => b._id !== id);
    saveLocalBookings(filtered);

    try {
      await axiosClient.delete(`/bookings/${id}`);
    } catch (e) {}
    return { success: true, message: 'Booking deleted successfully' };
  }
};

export default bookingApi;
