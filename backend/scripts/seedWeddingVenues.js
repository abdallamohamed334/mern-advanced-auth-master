import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

// هنا تضيف القاعة اللي عايزها
const newVenue = {
  name: "قاعة السراج AL SERAG - Wedding hall", // غير الاسم هنا
  type: "قاعة_أفراح",
  category: "فاخرة",
  governorate: "الغربية",
  city: "السنطه",
  capacity: 250,
  price: 30000,
  image: "https://plus.unsplash.com/premium_photo-1761827497586-2876ff7548e8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&q=60&w=500",
  images: ["https://lh3.googleusercontent.com/gps-cs-s/AG0ilSyGto1t5xdJCUJqRQ8U4fvYs01bfB9R_nFix7QVxaei9viB0_317EMHlBHuSGLA4l_PFh_RRjfv7LxmQhZYru6wBYkIkFLiIAvmWR8IC7eP2SUwIP9kNMYc3O2ixPRkd6xQJq6vtw=s680-w680-h510-rw", "https://lh3.googleusercontent.com/p/AF1QipNlA6z96gUARapnCb-pDV9b8r01_y6MBWBWtxSV=s680-w680-h510-rw","https://lh3.googleusercontent.com/ggs/AF1QipN1KPwsiv8VLL8IM_iPnRvhryvW7fHfTfPCV3-l=m18","https://lh3.googleusercontent.com/ggs/AF1QipMkRekHZim8rLI9RgygvU7XST6Wp33n3SjgoIVu=m18"],
  features: ["اضاءة ممتازه", "تنظيم علي اعلي مستوي"],
  description: "استداد تام لإقامة حفلات الزفاف والخطوبة وكتب الكتاب والمؤتمرات للحجز والاستعلام 01095952888 01555255352 ",
  available: true,
  rating: 4.5,
  contact: "01095952888",
  email: "email@example.com",
  address: "بجوار ماما نونا والنساجون الشرقيون وامام مول نصار، طريق طنطا زفتي - السنطة، محافظة الغربية",
  amenities: ["مرافق1", "مرافق2"],
  rules: ["شرط1", "شرط2"],
  weddingSpecific: {
    brideRoom: true,
    photography: true,
    catering: true,
    decoration: true,
    maxGuests: 250,
  },
};

const addSingleVenue = async () => {
  try {
    console.log("🔍 Checking if venue already exists...");
    
    // التأكد من أن القاعة مش موجودة بالفعل
    const existingVenue = await prisma.weddingVenue.findFirst({
      where: { name: newVenue.name }
    });

    if (existingVenue) {
      console.log("⚠️ Venue already exists in the database!");
      process.exit(0);
    }

    console.log(`🌱 Adding new venue: ${newVenue.name}`);

    // إضافة القاعة الجديدة
    await prisma.weddingVenue.create({
      data: newVenue
    });

    console.log("✅ Venue added successfully!");
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error adding venue:", error);
    process.exit(1);
  }
};

addSingleVenue();