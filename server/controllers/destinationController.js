import mongoose from 'mongoose';
import Destination from '../models/Destination.js';
import Package from '../models/Package.js';
import { createSlug } from '../utils/slugify.js';

const getExactDestinationImages = (name = '', slug = '') => {
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

const normalizeDestination = (dest) => {
  if (!dest) return dest;
  const doc = dest.toObject ? dest.toObject() : { ...dest };
  const exact = getExactDestinationImages(doc.name, doc.slug);
  const isGeneric = (url) => !url || 
    url.includes('photo-1507525428034-b723cf961d3e') || 
    url.includes('photo-1506744038136-46273834b3fb') ||
    url.includes('photo-1590766940554-634a7ed41450');

  if (isGeneric(doc.heroImage)) {
    doc.heroImage = exact.heroImage;
  }
  if (isGeneric(doc.featuredImage)) {
    doc.featuredImage = exact.featuredImage;
  }
  if (!Array.isArray(doc.images) || doc.images.length === 0 || doc.images.some(isGeneric)) {
    doc.images = exact.images;
  }
  return doc;
};

// @desc    Get all destinations with search, filter, pagination
// @route   GET /api/destinations
// @access  Public
export const getDestinations = async (req, res, next) => {
  try {
    const {
      search,
      region,
      state,
      featured,
      minPrice,
      maxPrice,
      sort,
      page = 1,
      limit = 12
    } = req.query;

    const query = { status: 'active' };

    // Search by name or state
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { state: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } }
      ];
    }

    // Region filter
    if (region && region !== 'All') {
      query.region = region;
    }

    // State filter
    if (state) {
      query.state = { $regex: state, $options: 'i' };
    }

    // Featured filter
    if (featured !== undefined) {
      query.featured = featured === 'true';
    }

    // Price range
    if (minPrice || maxPrice) {
      query.startingPrice = {};
      if (minPrice) query.startingPrice.$gte = Number(minPrice);
      if (maxPrice) query.startingPrice.$lte = Number(maxPrice);
    }

    // Sorting
    let sortOption = { createdAt: -1 };
    if (sort === 'price-asc') sortOption = { startingPrice: 1 };
    else if (sort === 'price-desc') sortOption = { startingPrice: -1 };
    else if (sort === 'name-asc') sortOption = { name: 1 };
    else if (sort === 'name-desc') sortOption = { name: -1 };

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const total = await Destination.countDocuments(query);
    const destinations = await Destination.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum);

    const normalizedDestinations = destinations.map(normalizeDestination);

    res.status(200).json({
      success: true,
      data: normalizedDestinations,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum) || 1
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single destination by slug
// @route   GET /api/destinations/:slug
// @access  Public
export const getDestinationBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const isId = mongoose.isValidObjectId(slug);
    const destination = isId
      ? await Destination.findById(slug)
      : await Destination.findOne({ slug });

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: 'Destination not found'
      });
    }

    // Fetch recommended packages for this destination
    const packages = await Package.find({
      destination: destination._id,
      status: 'published'
    }).limit(6);

    // Fetch related destinations in same region
    const relatedDestinations = await Destination.find({
      _id: { $ne: destination._id },
      region: destination.region,
      status: 'active'
    }).limit(4);

    const normalizedDest = normalizeDestination(destination);
    const normalizedRelated = relatedDestinations.map(normalizeDestination);

    res.status(200).json({
      success: true,
      data: {
        ...normalizedDest,
        recommendedPackages: packages,
        relatedDestinations: normalizedRelated
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new destination
// @route   POST /api/destinations
// @access  Private/Admin
export const createDestination = async (req, res, next) => {
  try {
    const { name } = req.body;
    const slug = req.body.slug || createSlug(name);

    // Check slug collision
    const existing = await Destination.findOne({ slug });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'A destination with this slug or name already exists'
      });
    }

    const destination = await Destination.create({
      ...req.body,
      slug
    });

    res.status(201).json({
      success: true,
      message: 'Destination created successfully',
      data: destination
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update destination
// @route   PUT /api/destinations/:id
// @access  Private/Admin
export const updateDestination = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (req.body.name && !req.body.slug) {
      req.body.slug = createSlug(req.body.name);
    }

    const isId = mongoose.isValidObjectId(id);
    const filter = isId ? { _id: id } : { slug: id };

    const destination = await Destination.findOneAndUpdate(filter, req.body, {
      new: true,
      runValidators: true
    });

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: 'Destination not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Destination updated successfully',
      data: destination
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete destination
// @route   DELETE /api/destinations/:id
// @access  Private/Admin
export const deleteDestination = async (req, res, next) => {
  try {
    const { id } = req.params;
    const isId = mongoose.isValidObjectId(id);
    const filter = isId ? { _id: id } : { slug: id };
    const destination = await Destination.findOneAndDelete(filter);

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: 'Destination not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Destination deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
