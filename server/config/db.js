import mongoose from 'mongoose';
import User from '../models/User.js';
import WebsiteSetting from '../models/WebsiteSetting.js';

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb+srv://sanehmandyal_db_user:KvGLMRqlhhJNroRL@cluster0.wjzihrm.mongodb.net/rinku_tour_travels';
    const conn = await mongoose.connect(mongoUri);
    console.log(`[MongoDB] Connected successfully to host: ${conn.connection.host}, database: ${conn.connection.name}`);

    // Auto-seed default admin if not existing
    try {
      const email = (process.env.ADMIN_EMAIL || 'admin@ravitravels.com').trim().toLowerCase();
      const password = process.env.ADMIN_PASSWORD || 'Admin@12345';
      const adminUser = await User.findOne({ $or: [{ email }, { email: 'admin@rinkutravels.com' }, { email: 'ravitourtravels@gmail.com' }] });
      if (!adminUser) {
        await User.create({
          name: 'Ravi (Super Admin)',
          email,
          password,
          role: 'superadmin',
          isActive: true
        });
        console.log(`[MongoDB] Initialized default admin account: ${email}`);
      } else if (adminUser.name?.includes('Rinku')) {
        adminUser.name = 'Ravi (Super Admin)';
        await adminUser.save();
      }
    } catch (seedErr) {
      console.warn('[MongoDB] Admin auto-seed warning:', seedErr.message);
    }

    // Auto-migrate WebsiteSetting to Amb Near Bus Stand and ravitourtravels@gmail.com
    try {
      let settings = await WebsiteSetting.findOne();
      if (!settings) {
        await WebsiteSetting.create({});
      } else {
        let changed = false;
        if (!settings.email || settings.email.includes('rinku') || settings.email === 'info@ravitravels.com') {
          settings.email = 'ravitourtravels@gmail.com';
          changed = true;
        }
        if (!settings.address || settings.address.includes('Kangra') || !settings.address.includes('Bus Stand') || !settings.address.includes('Una') || settings.address === 'Amb, Himachal Pradesh 177203, India') {
          settings.address = 'Near Bus Stand, Amb, Una, Himachal Pradesh 177203, India';
          changed = true;
        }
        if (!settings.areasServed || !settings.areasServed.includes('Bus Stand') || settings.areasServed.startsWith('Kangra')) {
          settings.areasServed = 'Amb (Near Bus Stand), Una District, Kangra, Dharamshala, McLeodGanj, Bir Billing, Dalhousie, Manali, Shimla, Chandigarh & All Himachal';
          changed = true;
        }
        if (!settings.serviceName || settings.serviceName.includes('Kangra') || settings.serviceName.includes('Rinku')) {
          settings.serviceName = 'Ravi Tour & Travels';
          changed = true;
        }
        if (!settings.googleMapsUrl || settings.googleMapsUrl.includes('Kangra')) {
          settings.googleMapsUrl = 'https://www.google.com/maps?q=Bus+Stand+Amb,+Una,+Himachal+Pradesh+177203';
          changed = true;
        }
        if (!settings.googleReviewsUrl || settings.googleReviewsUrl.includes('Kangra')) {
          settings.googleReviewsUrl = 'https://www.google.com/search?q=Ravi+Tour+and+Travels+Amb+Himachal#lrd=0x0:0x0,1,,,';
          changed = true;
        }
        if (settings.facebook && settings.facebook.includes('rinku')) {
          settings.facebook = 'https://facebook.com/ravitourtravels';
          changed = true;
        }
        if (settings.instagram && settings.instagram.includes('rinku')) {
          settings.instagram = 'https://instagram.com/ravitourtravels';
          changed = true;
        }
        if (settings.youtube && settings.youtube.includes('rinku')) {
          settings.youtube = 'https://youtube.com/@ravitourtravels';
          changed = true;
        }
        if (changed) {
          await settings.save();
          console.log('[MongoDB] WebsiteSetting migrated with updated contact and Amb Bus Stand details.');
        }
      }
    } catch (settingErr) {
      console.warn('[MongoDB] WebsiteSetting migration warning:', settingErr.message);
    }
  } catch (error) {
    console.error(`[MongoDB] Connection error: ${error.message}`);
    console.error('Note: Ensure MongoDB Atlas IP Access List includes 0.0.0.0/0 (Allow access from anywhere).');
    if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
      process.exit(1);
    }
  }
};

export default connectDB;
