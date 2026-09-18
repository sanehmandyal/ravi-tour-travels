import mongoose from 'mongoose';

const websiteSettingSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      default: 'Ravi Tour & Travels'
    },
    serviceName: {
      type: String,
      default: 'Ravi Tour & Travels'
    },
    tagline: {
      type: String,
      default: '5.0 ★ Rated Himachal Tours & Luxury Cabs'
    },
    heroTitle: {
      type: String,
      default: 'Experience Majestic Himachal with Ravi Tour & Travels'
    },
    heroSubtitle: {
      type: String,
      default: 'Top-rated 5.0★ Google Verified Tour & Luxury Cab Service in Himachal Pradesh. Clean commercial cabs, hill-certified chauffeurs, and customized holiday packages.'
    },
    heroImage: {
      type: String,
      default: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80'
    },
    logo: {
      type: String,
      default: ''
    },
    phone: {
      type: String,
      default: '70180 88530'
    },
    altPhone: {
      type: String,
      default: '+91 70180 88530'
    },
    email: {
      type: String,
      default: 'info@ravitravels.com'
    },
    address: {
      type: String,
      default: 'Amb, Himachal Pradesh 177203, India'
    },
    areasServed: {
      type: String,
      default: 'Amb, Una, Kangra, Dharamshala, McLeodGanj, Bir Billing, Dalhousie, Manali, Shimla, Chandigarh & All Himachal'
    },
    googleRating: {
      type: Number,
      default: 5.0
    },
    googleReviewCount: {
      type: Number,
      default: 46
    },
    googleMapsUrl: {
      type: String,
      default: 'https://www.google.com/search?q=Kangra+Taxi+Service&kgmid=/g/11z20m60vx'
    },
    googleReviewsUrl: {
      type: String,
      default: 'https://www.google.com/search?q=Kangra+Taxi+Service&kgmid=/g/11z20m60vx#lrd=0x0:0x689176dcb32829ba,1,,,'
    },
    facebook: {
      type: String,
      default: 'https://facebook.com/ravitourtravels'
    },
    instagram: {
      type: String,
      default: 'https://instagram.com/ravitourtravels'
    },
    youtube: {
      type: String,
      default: 'https://youtube.com/@ravitourtravels'
    },
    whatsapp: {
      type: String,
      default: '+917018088530'
    },
    businessHours: {
      type: String,
      default: '24 Hours Open (7 Days a Week)'
    },
    experienceYears: {
      type: String,
      default: '12+'
    },
    happyTravelers: {
      type: String,
      default: '10,000+'
    },
    destinationCount: {
      type: String,
      default: '50+'
    },
    supportHours: {
      type: String,
      default: '24/7'
    }
  },
  { timestamps: true }
);

const WebsiteSetting = mongoose.model('WebsiteSetting', websiteSettingSchema);
export default WebsiteSetting;
