import React, { createContext, useState, useEffect, useContext } from 'react';
import { adminApi } from '../services/adminApi';

const SETTINGS_KEY = 'rtt_website_settings';

const defaultSettings = {
  companyName: 'Ravi Tour & Travels',
  serviceName: 'Ravi Tour & Travels',
  tagline: '5.0 ★ Rated Himachal Tours & Luxury Cabs',
  heroTitle: 'Experience Majestic Himachal with Ravi Tour & Travels',
  heroSubtitle: 'Top-rated 5.0★ Google Verified Tour & Luxury Cab Service in Himachal Pradesh. Clean commercial cabs, hill-certified chauffeurs, and customized holiday packages.',
  heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80',
  logo: '/logo.jpg',
  phone: '70180 88530',
  altPhone: '+91 70180 88530',
  email: 'info@ravitravels.com',
  address: 'Near Bus Stand, Amb, Una, Himachal Pradesh 177203, India',
  areasServed: 'Amb (Near Bus Stand), Una District, Kangra, Dharamshala, McLeodGanj, Bir Billing, Dalhousie, Manali, Shimla, Chandigarh & All Himachal',
  googleRating: 5.0,
  googleReviewCount: 46,
  googleMapsUrl: 'https://www.google.com/maps?q=Bus+Stand+Amb,+Una,+Himachal+Pradesh+177203',
  googleReviewsUrl: 'https://www.google.com/search?q=Ravi+Tour+and+Travels+Amb+Himachal#lrd=0x0:0x0,1,,,',
  facebook: 'https://facebook.com/ravitourtravels',
  instagram: 'https://instagram.com/ravitourtravels',
  youtube: 'https://youtube.com/@ravitourtravels',
  whatsapp: '+917018088530',
  businessHours: '24 Hours Open (7 Days a Week)',
  experienceYears: '12+',
  happyTravelers: '10,000+',
  destinationCount: '50+',
  supportHours: '24/7'
};

const getInitialSettings = () => {
  try {
    const saved = localStorage.getItem(SETTINGS_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Migrate previous contact numbers and location
      if (parsed.phone === '098164 13603' || parsed.phone === '09816413603' || !parsed.phone) {
        parsed.phone = '70180 88530';
      }
      if (parsed.altPhone === '+91 98164 13603' || parsed.altPhone === '098164 13603' || !parsed.altPhone) {
        parsed.altPhone = '+91 70180 88530';
      }
      if (parsed.whatsapp === '+919816413603' || parsed.whatsapp === '919816413603' || !parsed.whatsapp) {
        parsed.whatsapp = '+917018088530';
      }
      if (!parsed.address || parsed.address.includes('Kangra') || !parsed.address.includes('Bus Stand') || !parsed.address.includes('Una')) {
        parsed.address = 'Near Bus Stand, Amb, Una, Himachal Pradesh 177203, India';
      }
      if (!parsed.areasServed || !parsed.areasServed.includes('Bus Stand')) {
        parsed.areasServed = 'Amb (Near Bus Stand), Una District, Kangra, Dharamshala, McLeodGanj, Bir Billing, Dalhousie, Manali, Shimla, Chandigarh & All Himachal';
      }
      const updated = { ...defaultSettings, ...parsed };
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
      return updated;
    }
  } catch (e) {}
  return defaultSettings;
};

const WebsiteContext = createContext({
  settings: defaultSettings,
  loading: false,
  updateSettingsState: () => {},
  refreshSettings: async () => {}
});

export const WebsiteProvider = ({ children }) => {
  const [settings, setSettings] = useState(getInitialSettings);
  const [loading, setLoading] = useState(false);

  const fetchSettings = async () => {
    try {
      const res = await adminApi.getSettings();
      if (res && res.success && res.data) {
        setSettings(prev => ({ ...prev, ...res.data }));
      }
    } catch (err) {
      console.warn('Using local settings cache:', err.message);
    }
  };

  useEffect(() => {
    fetchSettings();

    // Listen for real-time setting updates from Admin panel
    const handleSync = (e) => {
      if (e.detail) {
        setSettings(prev => ({ ...prev, ...e.detail }));
      } else {
        const cached = getInitialSettings();
        setSettings(cached);
      }
    };

    const handleStorage = (e) => {
      if (e.key === SETTINGS_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          setSettings(prev => ({ ...prev, ...parsed }));
        } catch {}
      }
    };

    window.addEventListener('rtt_settings_updated', handleSync);
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('rtt_settings_updated', handleSync);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const updateSettingsState = (newSettings) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      try {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
      } catch (e) {}
      window.dispatchEvent(new CustomEvent('rtt_settings_updated', { detail: updated }));
      return updated;
    });
  };

  return (
    <WebsiteContext.Provider value={{ settings, loading, updateSettingsState, refreshSettings: fetchSettings }}>
      {children}
    </WebsiteContext.Provider>
  );
};

export const useWebsite = () => {
  const context = useContext(WebsiteContext);
  if (!context) {
    return {
      settings: defaultSettings,
      loading: false,
      updateSettingsState: () => {},
      refreshSettings: async () => {}
    };
  }
  return context;
};
