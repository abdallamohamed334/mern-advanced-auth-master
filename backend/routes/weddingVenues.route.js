import express from 'express';
import WeddingVenue from '../models/WeddingVenue.js';

const router = express.Router();

// GET جميع قاعات الأفراح
router.get('/', async (req, res) => {
  try {
    const {
      governorate,
      city,
      category,
      minPrice,
      maxPrice,
      minCapacity,
      page = 1,
      limit = 10
    } = req.query;

    let query = {};

    if (governorate && governorate !== 'all') {
      query.governorate = governorate;
    }

    if (city && city !== 'all' && city !== 'كل المدن') {
      query.city = city;
    }

    if (category && category !== 'all') {
      query.category = category;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseInt(minPrice);
      if (maxPrice) query.price.$lte = parseInt(maxPrice);
    }

    if (minCapacity) {
      query.capacity = { $gte: parseInt(minCapacity) };
    }

    const venues = await WeddingVenue.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await WeddingVenue.countDocuments(query);

    res.json({
      venues,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET قاعة محددة بالـ ID
router.get('/:id', async (req, res) => {
  try {
    const venue = await WeddingVenue.findById(req.params.id);
    if (!venue) {
      return res.status(404).json({ message: 'القاعة غير موجودة' });
    }
    res.json(venue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET المحافظات المتاحة
router.get('/meta/governorates', async (req, res) => {
  try {
    const governorates = await WeddingVenue.distinct('governorate');
    res.json(governorates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET المدن المتاحة في محافظة محددة
router.get('/meta/cities/:governorate', async (req, res) => {
  try {
    const cities = await WeddingVenue.distinct('city', {
      governorate: req.params.governorate
    });
    res.json(cities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// استخدم export default
export default router;