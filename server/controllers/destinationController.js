import mongoose from 'mongoose';
import Destination from '../models/Destination.js';
import Package from '../models/Package.js';
import { createSlug } from '../utils/slugify.js';

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

    res.status(200).json({
      success: true,
      data: destinations,
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

    res.status(200).json({
      success: true,
      data: {
        ...destination.toObject(),
        recommendedPackages: packages,
        relatedDestinations
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
