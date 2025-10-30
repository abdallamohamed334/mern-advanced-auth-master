import mongoose from 'mongoose';
import dotenv from 'dotenv';
import WeddingVenue from '../models/WeddingVenue.js';

dotenv.config();

const sampleVenues = [
  {
    name: "قاعة نور الزفاف",
    type: "قاعة أفراح",
    category: "فاخرة",
    governorate: "القاهرة",
    city: "المعادي",
    capacity: 300,
    price: "25000",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400",
    images: [
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800"
    ],
    features: ["تكييف مركزي", "ديكورات فاخرة", "شاشة عرض", "نظام صوتي متكامل", "مواقف سيارات", "خدمة WiFi"],
    description: "قاعة فاخرة بتصميم عصري وأناقة لا تضاهى، مثالية لحفلات الزفاف والمناسبات الكبيرة في قلب المعادي.",
    available: true,
    rating: 4.8,
    contact: "01001234567",
    email: "crystal@venues.com",
    address: "شارع 9، المعادي، القاهرة",
    amenities: ["واي فاي مجاني", "مواقف سيارات", "تكييف مركزي", "مصلى", "مطبخ مجهز"],
    rules: ["ممنوع التدخين", "الالتزام بموعد نهاية الحفل", "الحجز المسبق مطلوب"],
    weddingSpecific: {
      brideRoom: true,
      photography: true,
      catering: true,
      decoration: true,
      maxGuests: 300
    }
  },
  {
    name: "Legend Wedding Hall",
    type: "قاعة أفراح",
    category: "فاخرة",
    governorate: "الغربية",
    city: "طنطا",
    capacity: 400,
    price: "35000",
    image: "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSweeAqkBMiyLQBzr0g-LUcjaqC-_Mk9l3Rnm5U3b8VTBfDLFuHgc4RDu0X1s9nfRRp6p42D9s5JmaXVPq0NmcE7N7Cxg8SCNjlAh4pzT24uSWbHLqH6lRJwU7uktm5o_iKAuY_z=s680-w680-h510-rw",
    images: [
      "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSwxIuT8-849JP3reGwwzytiI_56NUdVXt8-cMy7sRBCE6ygWBZYscJDgmJ1cjIMl8FA_Zgwuo8On-Sbax5ja_rKxPQOnB8DQO1UPbiJHoVPlBlRGruaGbqrPv9oVb670s8t-QXlOA=s680-w680-h510-rw",
      "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSyPUN0wio_IRKeDQ62tkl1EKR05QieXkPMktNatA89yj_ytNo5GVCYl4RygkUiWbca_ByACtz9OKnIj4YPKlOAwgXkKs0d9IUPeTk7-ix7qRXiQqaJQzwWZhoCisoB5JUYOVH__=s680-w680-h510-rw"
    ],
    features: ["تصميم فاخر", "إضاءة LED", "خدمة طعام 5 نجوم", "بار كوكتيل", "شاشات بلازما"],
    description: "قاعة ذهبية بلمسات من الفخامة والأناقة، مصممة خصيصاً للعرسان الذين يبحثون عن التميز.",
    available: true,
    rating: 4.9,
    contact: "01001234568",
    email: "golden@venues.com",
    address: "المهندسين، الجيزة",
    amenities: ["خدمة طعام 5 نجوم", "بار كوكتيل", "شاشات عرض", "تكييف مركزي"],
    rules: ["دفع عربون 30%", "تأكيد الحجز قبل 48 ساعة"],
    weddingSpecific: {
      brideRoom: true,
      photography: true,
      catering: true,
      decoration: true,
      maxGuests: 400
    }
  },
    {
    name: "جرين بالاس طنطا",
    type: "قاعة أفراح",
    category: "فاخرة",
    governorate: "الغربية",
    city: "طنطا",
    capacity: 300,
    price: "35000",
    image: "https://lh3.googleusercontent.com/p/AF1QipP0oIMiwKgfxxI5ljxF5vFAj6omPJU91lhk0I6s=s680-w680-h510-rw",
    images: [
      "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSyOtx33s11qih85FQjtDdzSl5VO90vTuk8cIeFwCi7-bevaoMNN07hSf3Cu-oMSTtW8-EJN7ROu8e0NuKcgZYnNBhGsWmUfvREuhgwsUKAf_hcc01IyUEwi1yLcVoejlsEG1Tki=s680-w680-h510-rw",
      "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSz4t6_Y27g3WqMrPa7DfuVI9sFcv5cKSbZV_pruqsz0j3PqGXxPIjbkEjVmm3HvA0APPODAHiUq-zcmMMSd1C-8Am3dWTyZwyF4IVzzeZexL1bcpHz8ZTxW0sY4-j92k-kVDgiOZB1CkoM=s680-w680-h510-rw",
      "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSzNIgKklHTmMUEjepjhaG0IIfRC7ENgHgizY1RjngFDyE43cDjzCSb35PqpR2zSBKIGInrbx34UvBnuHoJnroWoT-CnFRvYRJHy2qGuBxsgZhyKyhkH9PAe2Sgq5C8B58I_sTepVwTl4OZj=s680-w680-h510-rw"
    ],
    features: ["تصميم فاخر", "إضاءة LED", "خدمة طعام 5 نجوم", "بار كوكتيل", "شاشات بلازما"],
    description: "قاعة ذهبية بلمسات من الفخامة والأناقة، مصممة خصيصاً للعرسان الذين يبحثون عن التميز.",
    available: true,
    rating: 4.9,
    contact: "01007389996",
    email: "golden@venues.com",
    address: "الجلاء، طنطا (قسم 2)، قسم ثان طنطا، محافظة الغربية",
    amenities: ["خدمة طعام 5 نجوم", "بار كوكتيل", "شاشات عرض", "تكييف مركزي"],
    rules: ["دفع عربون 30%", "تأكيد الحجز قبل 48 ساعة"],
    weddingSpecific: {
      brideRoom: true,
      photography: true,
      catering: true,
      decoration: true,
      maxGuests: 400
    }
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect("mongodb+srv://tallaey445_db_user:KSFUyc7tmkHQnsEb@cluster0.pxplox6.mongodb.net/?appName=Cluster0");
    
    // مسح البيانات القديمة
    await WeddingVenue.deleteMany({});
    console.log('🗑️  Old data cleared');
    
    // إضافة البيانات الجديدة
    await WeddingVenue.insertMany(sampleVenues);
    console.log('✅ Database seeded successfully with wedding venues');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();