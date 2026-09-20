import axiosClient from './axiosClient';
import { defaultDestinations } from '../data/defaultDestinations';

const STORAGE_KEY = 'rtt_custom_destinations';

export const getExactDestinationImages = (name = '', slug = '') => {
  const q = `${name} ${slug}`.toLowerCase();
  if (q.includes('dharamshala') || q.includes('mcleod')) {
    return {
      heroImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      featuredImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      images: [
        'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=1200&q=80'
      ]
    };
  }
  if (q.includes('manali') || q.includes('solang') || q.includes('rohtang')) {
    return {
      heroImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
      featuredImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
      images: [
        'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1586351012965-861624544334?auto=format&fit=crop&w=1200&q=80'
      ]
    };
  }
  if (q.includes('dalhousie') || q.includes('khajjiar')) {
    return {
      heroImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Khajjiar_lake.jpg?width=1200',
      featuredImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Khajjiar_lake.jpg?width=1200',
      images: [
        'https://commons.wikimedia.org/wiki/Special:FilePath/Khajjiar_lake.jpg?width=1200',
        'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&w=1200&q=80'
      ]
    };
  }
  if (q.includes('bir') || q.includes('billing')) {
    return {
      heroImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bir-Billing.jpg?width=1200',
      featuredImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bir-Billing.jpg?width=1200',
      images: [
        'https://commons.wikimedia.org/wiki/Special:FilePath/Bir-Billing.jpg?width=1200',
        'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=1200&q=80'
      ]
    };
  }
  if (q.includes('shimla') || q.includes('kufri')) {
    return {
      heroImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Christ_Church_Shimla.jpg?width=1200',
      featuredImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Christ_Church_Shimla.jpg?width=1200',
      images: [
        'https://commons.wikimedia.org/wiki/Special:FilePath/Christ_Church_Shimla.jpg?width=1200',
        'https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=1200&q=80'
      ]
    };
  }
  if (q.includes('spiti') || q.includes('kaza')) {
    return {
      heroImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Key_Monastery,_Himachal_Pradesh.jpg?width=1200',
      featuredImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Key_Monastery,_Himachal_Pradesh.jpg?width=1200',
      images: [
        'https://commons.wikimedia.org/wiki/Special:FilePath/Key_Monastery,_Himachal_Pradesh.jpg?width=1200',
        'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80'
      ]
    };
  }
  if (q.includes('kasol') || q.includes('manikaran') || q.includes('tosh') || q.includes('parvati')) {
    return {
      heroImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Manikaran_Lake.jpg?width=1200',
      featuredImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Manikaran_Lake.jpg?width=1200',
      images: [
        'https://commons.wikimedia.org/wiki/Special:FilePath/Manikaran_Lake.jpg?width=1200',
        'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=80'
      ]
    };
  }
  if (q.includes('jibhi') || q.includes('tirthan')) {
    return {
      heroImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
      featuredImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
      images: [
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&w=1200&q=80'
      ]
    };
  }
  if (q.includes('kinnaur') || q.includes('kalpa') || q.includes('sangla') || q.includes('chitkul')) {
    return {
      heroImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Chitkul_the_last_village_of_India.jpg?width=1200',
      featuredImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Chitkul_the_last_village_of_India.jpg?width=1200',
      images: [
        'https://commons.wikimedia.org/wiki/Special:FilePath/Chitkul_the_last_village_of_India.jpg?width=1200',
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80'
      ]
    };
  }
  if (q.includes('palampur') || q.includes('baijnath')) {
    return {
      heroImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      featuredImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      images: [
        'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=1200&q=80'
      ]
    };
  }
  if (q.includes('kangra') || q.includes('jawala') || q.includes('chintpurni')) {
    return {
      heroImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Kangra_Fort_Himachal_Pradesh.jpg?width=1200',
      featuredImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Kangra_Fort_Himachal_Pradesh.jpg?width=1200',
      images: [
        'https://commons.wikimedia.org/wiki/Special:FilePath/Kangra_Fort_Himachal_Pradesh.jpg?width=1200',
        'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80'
      ]
    };
  }
  if (q.includes('kullu') || q.includes('naggar')) {
    return {
      heroImage: 'https://images.unsplash.com/photo-1586351012965-861624544334?auto=format&fit=crop&w=1200&q=80',
      featuredImage: 'https://images.unsplash.com/photo-1586351012965-861624544334?auto=format&fit=crop&w=1200&q=80',
      images: [
        'https://images.unsplash.com/photo-1586351012965-861624544334?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80'
      ]
    };
  }
  return {
    heroImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Khajjiar_lake.jpg?width=1200',
    featuredImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Khajjiar_lake.jpg?width=1200',
    images: ['https://commons.wikimedia.org/wiki/Special:FilePath/Khajjiar_lake.jpg?width=1200']
  };
};

const enrichDestinationWithExactImage = (dest) => {
  if (!dest) return dest;
  const exact = getExactDestinationImages(dest.name, dest.slug);
  const isGeneric = (url) => !url || 
    url.includes('photo-1507525428034-b723cf961d3e') || 
    url.includes('photo-1506744038136-46273834b3fb') ||
    url.includes('photo-1590766940554-634a7ed41450');

  const heroImage = isGeneric(dest.heroImage) ? exact.heroImage : (dest.heroImage || exact.heroImage);
  const featuredImage = isGeneric(dest.featuredImage) ? exact.featuredImage : (dest.featuredImage || exact.featuredImage);
  const images = Array.isArray(dest.images) && dest.images.length > 0 && !dest.images.some(isGeneric)
    ? dest.images
    : exact.images;

  return {
    ...dest,
    heroImage,
    featuredImage,
    images
  };
};

const getLocalDestinations = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map(enrichDestinationWithExactImage);
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
            const item = localMatch ? { ...b, ...localMatch } : b;
            return enrichDestinationWithExactImage(item);
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
      data: filtered.map(enrichDestinationWithExactImage),
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
        const item = localMatch ? { ...res.data, ...localMatch } : res.data;
        return { success: true, data: enrichDestinationWithExactImage(item) };
      }
    } catch (err) {}

    const list = getLocalDestinations();
    const found = list.find(d => d.slug === slug || d._id === slug);
    if (found) {
      return { success: true, data: enrichDestinationWithExactImage(found) };
    }
    return { success: false, message: 'Destination not found' };
  },

  getById: async (id) => {
    try {
      const res = await axiosClient.get(`/destinations/${id}`);
      if (res && res.success && res.data) {
        const local = getLocalDestinations();
        const localMatch = local.find(l => l._id === res.data._id || l.slug === res.data.slug);
        const item = localMatch ? { ...res.data, ...localMatch } : res.data;
        return { success: true, data: enrichDestinationWithExactImage(item) };
      }
    } catch (err) {}

    const list = getLocalDestinations();
    const found = list.find(d => d._id === id || d.slug === id);
    if (found) {
      return { success: true, data: enrichDestinationWithExactImage(found) };
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
