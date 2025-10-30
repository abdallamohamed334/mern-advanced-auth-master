import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Photographer from '../models/Photographer.js';

dotenv.config();

const samplePhotographers = [
  {
    name: "أحمد محمد",
    businessName: "استوديو أحلام للتصوير",
    type: "استوديو",
    specialty: "تصوير أفراح",
    experience: 8,
    governorate: "القاهرة",
    city: "المعادي",
    price: "5000",
    portfolio: [
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800"
    ],
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    services: ["تصوير قبل الزفاف", "تصوير حفل الزفاف", "تصوير ما بعد الحفل", "ألبوم كامل", "فيديو"],
    equipment: ["Canon EOS R5", "Sony A7III", "DJI Drone", "LED Lights", "Various Lenses"],
    description: "مصور محترف متخصص في تصوير الأفراح بأسلوب فني عصري، أمتلك خبرة 8 سنوات في توثيق أجمل اللحظات.",
    available: true,
    rating: 4.9,
    contact: "01001234567",
    email: "ahmed@photography.com",
    address: "شارع 9، المعادي، القاهرة",
    socialMedia: {
      instagram: "@ahmed_photography",
      facebook: "Ahmed Photography Studio",
      website: "www.ahmed-photo.com"
    },
    photographySpecific: {
      hoursCoverage: 8,
      numberOfPhotos: 500,
      digitalPhotos: true,
      printedPhotos: true,
      photoAlbum: true,
      videoCoverage: true,
      secondPhotographer: true,
      editingTime: 14,
      rawFiles: false
    },
    packages: [
      {
        name: "الباقة الأساسية",
        price: 3000,
        description: "تغطية أساسية للحفل مع عدد محدود من الصور",
        features: ["4 ساعات تصوير", "200 صورة معدلة", "صور رقمية", "تصوير فيديو أساسي"],
        hours: 4,
        photosCount: 200
      },
      {
        name: "الباقة المتكاملة",
        price: 5000,
        description: "تغطية شاملة لجميع مراحل الزفاف",
        features: ["8 ساعات تصوير", "500 صورة معدلة", "ألبوم فاخر", "فيديو احترافي", "مصور مساعد"],
        hours: 8,
        photosCount: 500
      }
    ]
  },
  {
    name: "مريم أحمد",
    businessName: "لحظات جميلة للتصوير",
    type: "فردي",
    specialty: "تصوير طبيعي",
    experience: 5,
    governorate: "الغربية",
    city: "طنطا",
    price: "3500",
    portfolio: [
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=800",
      "https://images.unsplash.com/photo-1445905595283-21f8ae8a33d2?w=800"
    ],
    profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400",
    services: ["تصوير قبل الزفاف", "تصوير حفل الزفاف", "ألبوم كامل"],
    equipment: ["Nikon Z6", "Canon 5D Mark IV", "Studio Lights", "Various Lenses"],
    description: "مصورة متخصصة في التصوير الطبيعي والأسلوب الرومانسي، أركز على التفاصيل والعواطف في كل صورة.",
    available: true,
    rating: 4.7,
    contact: "01001234568",
    email: "mariam@photography.com",
    address: "حي الشرق، طنطا، الغربية",
    socialMedia: {
      instagram: "@mariam_photography",
      facebook: "Mariam Photography",
      website: "www.mariam-photo.com"
    },
    photographySpecific: {
      hoursCoverage: 6,
      numberOfPhotos: 300,
      digitalPhotos: true,
      printedPhotos: true,
      photoAlbum: true,
      videoCoverage: false,
      secondPhotographer: false,
      editingTime: 10,
      rawFiles: true
    },
    packages: [
      {
        name: "الباقة البسيطة",
        price: 2000,
        description: "تغطية أساسية للحفل",
        features: ["3 ساعات تصوير", "150 صورة معدلة", "صور رقمية"],
        hours: 3,
        photosCount: 150
      },
      {
        name: "الباقة القياسية",
        price: 3500,
        description: "تغطية متوسطة مع ألبوم تذكاري",
        features: ["6 ساعات تصوير", "300 صورة معدلة", "ألبوم صغير", "صور رقمية"],
        hours: 6,
        photosCount: 300
      }
    ]
  },
  {
    name: "خالد محمود",
    businessName: "فنون التصوير الحديث",
    type: "شركة تصوير",
    specialty: "تصوير حديث",
    experience: 12,
    governorate: "القاهرة",
    city: "المهندسين",
    price: "7000",
    portfolio: [
      "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=800",
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800",
      "https://images.unsplash.com/photo-1445905595283-21f8ae8a33d2?w=800"
    ],
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    services: ["تصوير قبل الزفاف", "تصوير حفل الزفاف", "تصوير ما بعد الحفل", "ألبوم كامل", "فيديو", "درون"],
    equipment: ["Sony A7SIII", "Canon R6", "DJI Drone Pro", "Full Lighting Kit", "Multiple Lenses"],
    description: "شركة متخصصة في التصوير الحديث والعصري، نقدم حلولاً إبداعية شاملة بتقنيات متطورة وفريق عمل محترف.",
    available: true,
    rating: 4.9,
    contact: "01007389996",
    email: "khaled@photography.com",
    address: "شارع الهرم، المهندسين، الجيزة",
    socialMedia: {
      instagram: "@khaled_photography",
      facebook: "Khaled Photography Arts",
      website: "www.khaled-photo.com"
    },
    photographySpecific: {
      hoursCoverage: 10,
      numberOfPhotos: 700,
      digitalPhotos: true,
      printedPhotos: true,
      photoAlbum: true,
      videoCoverage: true,
      secondPhotographer: true,
      editingTime: 21,
      rawFiles: true
    },
    packages: [
      {
        name: "الباقة البرونزية",
        price: 4000,
        description: "تغطية احترافية أساسية",
        features: ["6 ساعات تصوير", "350 صورة معدلة", "فيديو أساسي", "صور رقمية"],
        hours: 6,
        photosCount: 350
      },
      {
        name: "الباقة الفضية",
        price: 7000,
        description: "تغطية شاملة مع إضافات متقدمة",
        features: ["10 ساعات تصوير", "700 صورة معدلة", "فيديو سينمائي", "تصوير بالدرون", "مصور مساعد"],
        hours: 10,
        photosCount: 700
      }
    ]
  },
  {
    name: "سارة عبد الله",
    businessName: "إبداع للتصوير",
    type: "فردي",
    specialty: "تصوير فني",
    experience: 6,
    governorate: "الإسكندرية",
    city: "سموحة",
    price: "4500",
    portfolio: [
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800",
      "https://images.unsplash.com/photo-1554080353-a576cf803bda?w=800",
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800"
    ],
    profileImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400",
    services: ["تصوير قبل الزفاف", "ألبوم كامل", "فيديو"], // ✅ غيرت الخدمات لتناسب الـ enum
    equipment: ["Fujifilm X-T4", "Vintage Lenses", "Creative Filters", "Studio Setup"],
    description: "مصورة فنية متخصصة في التصوير الإبداعي والفني، أقدم رؤية فنية مميزة لكل جلسة تصوير.",
    available: true,
    rating: 4.8,
    contact: "01005556677",
    email: "sara@photography.com",
    address: "حي سموحة، الإسكندرية",
    socialMedia: {
      instagram: "@sara_art_photo",
      facebook: "Sara Art Photography",
      website: "www.sara-art.com"
    },
    photographySpecific: {
      hoursCoverage: 4,
      numberOfPhotos: 100,
      digitalPhotos: true,
      printedPhotos: true,
      photoAlbum: true,
      videoCoverage: false,
      secondPhotographer: false,
      editingTime: 7,
      rawFiles: true
    },
    packages: [
      {
        name: "جلسة إبداعية",
        price: 2500,
        description: "جلسة تصوير إبداعية مميزة",
        features: ["3 ساعات تصوير", "50 صورة معدلة", "معالجة إبداعية", "صور رقمية"],
        hours: 3,
        photosCount: 50
      },
      {
        name: "باقة إبداعية شاملة",
        price: 4500,
        description: "باقة إبداعية متكاملة مع إخراج مميز",
        features: ["6 ساعات تصوير", "100 صورة معدلة", "ألبوم فني", "معالجة متقدمة"],
        hours: 6,
        photosCount: 100
      }
    ]
  },
  {
    name: "محمد السيد",
    businessName: "تراث للتصوير",
    type: "استوديو",
    specialty: "تصوير تقليدي",
    experience: 15,
    governorate: "الأقصر",
    city: "الأقصر",
    price: "6000",
    portfolio: [
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800",
      "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800"
    ],
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    services: ["تصوير حفل الزفاف", "ألبوم كامل", "فيديو"], // ✅ غيرت الخدمات لتناسب الـ enum
    equipment: ["Canon 5D Mark IV", "Traditional Props", "Historical Costumes", "Natural Lighting"],
    description: "مصور متخصص في التصوير التقليدي والتراثي، أحافظ على الأصالة والتراث في كل لقطة.",
    available: true,
    rating: 4.9,
    contact: "01008889900",
    email: "mohamed@photography.com",
    address: "شارع الكورنيش، الأقصر",
    socialMedia: {
      instagram: "@heritage_photos",
      facebook: "Heritage Photography",
      website: "www.heritage-photo.com"
    },
    photographySpecific: {
      hoursCoverage: 5,
      numberOfPhotos: 150,
      digitalPhotos: true,
      printedPhotos: true,
      photoAlbum: true,
      videoCoverage: false,
      secondPhotographer: false,
      editingTime: 10,
      rawFiles: false
    },
    packages: [
      {
        name: "جلسة تراثية",
        price: 3500,
        description: "جلسة تصوير تراثية تقليدية",
        features: ["4 ساعات تصوير", "80 صورة معدلة", "أزياء تقليدية", "صور رقمية"],
        hours: 4,
        photosCount: 80
      },
      {
        name: "باقة تراثية كاملة",
        price: 6000,
        description: "باقة تراثية شاملة بكل التفاصيل",
        features: ["8 ساعات تصوير", "150 صورة معدلة", "ألبوم فاخر", "إكسسوارات تراثية"],
        hours: 8,
        photosCount: 150
      }
    ]
  },
  {
    name: "فاطمة إبراهيم",
    businessName: "أضواء للتصوير",
    type: "فردي",
    specialty: "تصوير أفراح",
    experience: 7,
    governorate: "الجيزة",
    city: "الدقي",
    price: "4000",
    portfolio: [
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800"
    ],
    profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    services: ["تصوير قبل الزفاف", "تصوير حفل الزفاف", "ألبوم كامل"],
    equipment: ["Canon EOS R6", "Portable Flash", "Various Lenses", "Light Modifiers"],
    description: "مصورة أفراح محترفة، متخصصة في توثيق أجمل لحظات الزفاف بأسلوب عصري وأنيق.",
    available: true,
    rating: 4.7,
    contact: "01003334455",
    email: "fatma@photography.com",
    address: "حي الدقي، الجيزة",
    socialMedia: {
      instagram: "@fatma_lights",
      facebook: "Fatma Photography Lights",
      website: "www.fatma-lights.com"
    },
    photographySpecific: {
      hoursCoverage: 7,
      numberOfPhotos: 400,
      digitalPhotos: true,
      printedPhotos: true,
      photoAlbum: true,
      videoCoverage: false,
      secondPhotographer: false,
      editingTime: 12,
      rawFiles: false
    },
    packages: [
      {
        name: "باقة الأفراح الأساسية",
        price: 2500,
        description: "تغطية أساسية لحفل الزفاف",
        features: ["5 ساعات تصوير", "250 صورة معدلة", "ألبوم صغير", "صور رقمية"],
        hours: 5,
        photosCount: 250
      },
      {
        name: "باقة الأفراح المتكاملة",
        price: 4000,
        description: "تغطية متكاملة لحفل الزفاف",
        features: ["8 ساعات تصوير", "400 صورة معدلة", "ألبوم فاخر", "صور رقمية"],
        hours: 8,
        photosCount: 400
      }
    ]
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect("mongodb+srv://tallaey445_db_user:KSFUyc7tmkHQnsEb@cluster0.pxplox6.mongodb.net/?appName=Cluster0");
    
    // مسح البيانات القديمة
    await Photographer.deleteMany({});
    console.log('🗑️  Old photographers data cleared');
    
    // إضافة البيانات الجديدة
    await Photographer.insertMany(samplePhotographers);
    console.log('✅ Database seeded successfully with photographers');
    
    // عرض إحصائية سريعة
    const count = await Photographer.countDocuments();
    const specialties = await Photographer.distinct('specialty');
    const services = await Photographer.distinct('services');
    console.log(`📊 Total photographers in database: ${count}`);
    console.log(`🎯 Specialties: ${specialties.join(', ')}`);
    console.log(`🛠️  Available services: ${services.join(', ')}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();