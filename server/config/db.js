import mongoose from 'mongoose';
import User from '../models/User.js';

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
      const adminUser = await User.findOne({ $or: [{ email }, { email: 'admin@rinkutravels.com' }] });
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
  } catch (error) {
    console.error(`[MongoDB] Connection error: ${error.message}`);
    console.error('Note: Ensure MongoDB Atlas IP Access List includes 0.0.0.0/0 (Allow access from anywhere).');
    if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
      process.exit(1);
    }
  }
};

export default connectDB;
