import express from "express";
import prisma from "../db/db.js";

const router = express.Router();

// ✅ GET جميع قاعات الأفراح
router.get("/", async (req, res) => {
  try {
    const {
      governorate,
      city,
      category,
      minPrice,
      maxPrice,
      minCapacity,
      page = 1,
      limit = 10,
    } = req.query;

    const filters = {};

    if (governorate && governorate !== "all") {
      filters.governorate = governorate;
    }

    if (city && city !== "all" && city !== "كل المدن") {
      filters.city = city;
    }

    if (category && category !== "all") {
      filters.category = category;
    }

    // ✅ تصحيح مشكلة السعر - تحويل price لـ numeric في الفلاتر
    if (minPrice || maxPrice) {
      filters.AND = filters.AND || [];
      
      if (minPrice) {
        filters.AND.push({
          price: {
            gte: minPrice // بيكون string علشان العمود text في DB
          }
        });
      }
      
      if (maxPrice) {
        filters.AND.push({
          price: {
            lte: maxPrice
          }
        });
      }
    }

    if (minCapacity) {
      filters.capacity = { gte: parseInt(minCapacity) };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    const [venues, total] = await Promise.all([
      prisma.weddingVenue.findMany({
        where: filters,
        skip,
        take,
        orderBy: { createdAt: "desc" },
      }),
      prisma.weddingVenue.count({ where: filters }),
    ]);

    res.json({
      venues,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total,
    });
  } catch (error) {
    console.error("Error fetching venues:", error);
    res.status(500).json({ message: error.message });
  }
});

// ✅ GET قاعة محددة بالـ ID
router.get("/:id", async (req, res) => {
  try {
    const venue = await prisma.weddingVenue.findUnique({
      where: { id: req.params.id }, // ✅ تصحيح لأن الـ ID بيكون UUID
    });

    if (!venue) {
      return res.status(404).json({ message: "القاعة غير موجودة" });
    }

    res.json(venue);
  } catch (error) {
    console.error("Error fetching venue:", error);
    res.status(500).json({ message: error.message });
  }
});

// ✅ GET المحافظات المتاحة
router.get("/meta/governorates", async (req, res) => {
  try {
    const governorates = await prisma.weddingVenue.findMany({
      distinct: ["governorate"],
      select: { governorate: true },
      where: { governorate: { not: null } } // ✅ إضافة filter للأمان
    });

    res.json(governorates.map((g) => g.governorate).filter(Boolean));
  } catch (error) {
    console.error("Error fetching governorates:", error);
    res.status(500).json({ message: error.message });
  }
});

// ✅ GET المدن المتاحة في محافظة محددة
router.get("/meta/cities/:governorate", async (req, res) => {
  try {
    const cities = await prisma.weddingVenue.findMany({
      where: { 
        governorate: req.params.governorate,
        city: { not: null } // ✅ إضافة filter للأمان
      },
      distinct: ["city"],
      select: { city: true },
    });

    res.json(cities.map((c) => c.city).filter(Boolean));
  } catch (error) {
    console.error("Error fetching cities:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;