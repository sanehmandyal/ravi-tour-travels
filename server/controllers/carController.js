import Car from '../models/Car.js';

// @desc    Get all cars / fleet models
// @route   GET /api/cars
// @access  Public
export const getCars = async (req, res, next) => {
  try {
    const filter = {};
    // If not requested by admin, default to available only
    if (req.query.all !== 'true') {
      filter.isAvailable = true;
    }
    if (req.query.category && req.query.category !== 'All') {
      filter.category = req.query.category;
    }

    const cars = await Car.find(filter).sort({ order: 1, createdAt: -1 });
    res.status(200).json({
      success: true,
      count: cars.length,
      data: cars
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single car
// @route   GET /api/cars/:id
// @access  Public
export const getCarById = async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ success: false, message: 'Car model not found' });
    }
    res.status(200).json({
      success: true,
      data: car
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new car model
// @route   POST /api/cars
// @access  Private/Admin
export const createCar = async (req, res, next) => {
  try {
    const car = await Car.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Car model added to fleet successfully',
      data: car
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update car model
// @route   PUT /api/cars/:id
// @access  Private/Admin
export const updateCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const car = await Car.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!car) {
      return res.status(404).json({ success: false, message: 'Car model not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Car model updated successfully',
      data: car
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete car model
// @route   DELETE /api/cars/:id
// @access  Private/Admin
export const deleteCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const car = await Car.findByIdAndDelete(id);
    if (!car) {
      return res.status(404).json({ success: false, message: 'Car model not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Car model deleted from fleet successfully'
    });
  } catch (error) {
    next(error);
  }
};
