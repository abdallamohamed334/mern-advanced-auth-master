import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PhotographersPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedGovernorate, setSelectedGovernorate] = useState("all");
  const [selectedCity, setSelectedCity] = useState("all");
  const [priceRange, setPriceRange] = useState(5000);
  const [filteredPhotographers, setFilteredPhotographers] = useState([]);

  // محافظات مصر والمدن التابعة لها
  const governorates = {
    "all": { name: "كل المحافظات", cities: ["كل المدن"] },
    "القاهرة": { 
      name: "القاهرة", 
      cities: ["كل المدن", "المعادي", "مدينة نصر", "مصر الجديدة", "الزمالك", "الدقي", "المهندسين", "الزيتون", "شبرا", "العباسية", "المرج", "المطرية"] 
    },
    "الجيزة": { 
      name: "الجيزة", 
      cities: ["كل المدن", "الدقي", "المهندسين", "فيصل", "الأهرام", "العمرانية", "البدرشين", "الصف", "أوسيم", "إمبابة", "كرداسة"] 
    },
    "الإسكندرية": { 
      name: "الإسكندرية", 
      cities: ["كل المدن", "سموحة", "المنتزه", "العصافرة", "اللبان", "الجمرك", "المنشية", "كامب شيزار", "السيوف", "المنتزه", "الظاهرية"] 
    },
    "القليوبية": { 
      name: "القليوبية", 
      cities: ["كل المدن", "بنها", "شبرا الخيمة", "القناطر الخيرية", "الخانكة", "قليوب", "كفر شكر", "الخصوص"] 
    },
    "الغربية": { 
      name: "الغربية", 
      cities: ["كل المدن", "طنطا", "المحلة الكبرى", "زفتى", "سمنود", "بسيون", "قطور", "كفر الزيات"] 
    },
    "المنوفية": { 
      name: "المنوفية", 
      cities: ["كل المدن", "شبين الكوم", "منوف", "أشمون", "الباجور", "قويسنا", "بركة السبع", "تلا"] 
    },
    "الدقهلية": { 
      name: "الدقهلية", 
      cities: ["كل المدن", "المنصورة", "طلخا", "ميت غمر", "دكرنس", "أجا", "المنزلة", "بلقاس", "محلة دمنة"] 
    },
    "كفر الشيخ": { 
      name: "كفر الشيخ", 
      cities: ["كل المدن", "كفر الشيخ", "دسوق", "فوه", "مطوبس", "بلطيم", "الحامول", "سيدي سالم"] 
    },
    "الشرقية": { 
      name: "الشرقية", 
      cities: ["كل المدن", "الزقازيق", "بلبيس", "مشتول السوق", "أبو حماد", "ههيا", "فاقوس", "صان الحجر", "العاشر من رمضان"] 
    },
    "بورسعيد": { 
      name: "بورسعيد", 
      cities: ["كل المدن", "بورسعيد", "حي الضواحي", "حي الشرق", "حي الجنوب"] 
    },
    "الإسماعيلية": { 
      name: "الإسماعيلية", 
      cities: ["كل المدن", "الإسماعيلية", "فايد", "القنطرة شرق", "القنطرة غرب", "التل الكبير"] 
    },
    "السويس": { 
      name: "السويس", 
      cities: ["كل المدن", "السويس", "حي الأربعين", "حي عتاقة", "حي الجناين"] 
    },
    "شمال سيناء": { 
      name: "شمال سيناء", 
      cities: ["كل المدن", "العريش", "الشيخ زويد", "رفح", "بئر العبد"] 
    },
    "جنوب سيناء": { 
      name: "جنوب سيناء", 
      cities: ["كل المدن", "شرم الشيخ", "دهب", "نويبع", "طابا", "رأس سدر"] 
    },
    "البحر الأحمر": { 
      name: "البحر الأحمر", 
      cities: ["كل المدن", "الغردقة", "مرسى علم", "رأس غارب", "سفاجا"] 
    },
    "الوادي الجديد": { 
      name: "الوادي الجديد", 
      cities: ["كل المدن", "الخارجة", "الداخلة", "باريس", "موط", "الفرافرة"] 
    },
    "مطروح": { 
      name: "مطروح", 
      cities: ["كل المدن", "مرسى مطروح", "الحمام", "العلمين", "سيوة", "النجيلة"] 
    },
    "الأقصر": { 
      name: "الأقصر", 
      cities: ["كل المدن", "الأقصر", "القرنة", "إسنا", "البياضية", "الطود"] 
    },
    "أسوان": { 
      name: "أسوان", 
      cities: ["كل المدن", "أسوان", "كوم أمبو", "دراو", "نصر النوبة", "كلابشة"] 
    },
    "سوهاج": { 
      name: "سوهاج", 
      cities: ["كل المدن", "سوهاج", "جرجا", "أخميم", "البلينا", "المراغة", "جهينة"] 
    },
    "قنا": { 
      name: "قنا", 
      cities: ["كل المدن", "قنا", "قفط", "نقادة", "دشنا", "وقف"] 
    },
    "المنيا": { 
      name: "المنيا", 
      cities: ["كل المدن", "المنيا", "ملوي", "دير مواس", "مغاغة", "بني مزار", "مطاي"] 
    },
    "أسيوط": { 
      name: "أسيوط", 
      cities: ["كل المدن", "أسيوط", "ديروط", "القوصية", "أبنوب", "منفلوط", "البداري"] 
    },
    "الفيوم": { 
      name: "الفيوم", 
      cities: ["كل المدن", "الفيوم", "طامية", "سنورس", "إطسا", "يوسف الصديق"] 
    },
    "بنى سويف": { 
      name: "بنى سويف", 
      cities: ["كل المدن", "بني سويف", "الواسطى", "ناصر", "إهناسيا", "ببا", "الفشن"] 
    }
  };

  // بيانات المصورين في مصر
  const photographers = [
    {
      id: 1,
      name: "محمد أحمد",
      specialty: "تصوير الأفراح",
      experience: "8 سنين",
      rating: 4.9,
      reviews: 127,
      price: 2500,
      image: "https://images.unsplash.com/photo-1565464027194-7957a2295fb7?w=300",
      category: "wedding",
      governorate: "القاهرة",
      city: "المعادي",
      portfolio: [
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400",
        "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=400",
        "https://images.unsplash.com/photo-1549451371-64aa98a6f660?w=400"
      ],
      description: "مصور محترف متخصص في تصوير حفلات الزفاف والمناسبات الكبيرة بخبرة تزيد عن 8 سنين في المعادي",
      equipment: ["Canon EOS R5", "Sony A7III", "عدسات متعددة", "إضاءة احترافية"],
      contact: "01001234567",
      languages: ["عربي", "إنجليزي"],
      deliveryTime: "3-5 أيام"
    },
    {
      id: 2,
      name: "سارة محمود",
      specialty: "تصوير المؤتمرات والفعاليات",
      experience: "6 سنين",
      rating: 4.8,
      reviews: 89,
      price: 1800,
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300",
      category: "events",
      governorate: "الجيزة",
      city: "المهندسين",
      portfolio: [
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400",
        "https://images.unsplash.com/photo-1549451371-64aa98a6f660?w=400",
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400"
      ],
      description: "مصورة محترفة متخصصة في تغطية المؤتمرات والفعاليات الرسمية والندوات في منطقة المهندسين",
      equipment: ["Sony A7IV", "معدات بث مباشر", "مايكروفونات", "حامل ثلاثي"],
      contact: "01001234568",
      languages: ["عربي", "إنجليزي", "فرنساوي"],
      deliveryTime: "2-4 أيام"
    },
    {
      id: 3,
      name: "خالد الفيومي",
      specialty: "تصوير الطبيعة والفنون",
      experience: "10 سنين",
      rating: 5.0,
      reviews: 156,
      price: 3500,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
      category: "art",
      governorate: "الإسكندرية",
      city: "سموحة",
      portfolio: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400",
        "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=400"
      ],
      description: "فنان تصوير محترف متخصص في التصوير الفني والطبيعة والمناظر الخلابة في الإسكندرية",
      equipment: ["Nikon Z7", "عدسات ماكرو", "فلاتر احترافية", "طائرة بدون طيار"],
      contact: "01001234569",
      languages: ["عربي", "إنجليزي"],
      deliveryTime: "5-7 أيام"
    },
    {
      id: 4,
      name: "فاطمة حسن",
      specialty: "تصوير الأطفال والعائلات",
      experience: "5 سنين",
      rating: 4.7,
      reviews: 94,
      price: 1200,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300",
      category: "family",
      governorate: "الغربية",
      city: "طنطا",
      portfolio: [
        "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400",
        "https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=400",
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400"
      ],
      description: "مصورة متخصصة في تصوير الأطفال والعائلات مع قدرة مميزة على التعامل مع الصغار في طنطا",
      equipment: ["Canon EOS R6", "إضاءة ناعمة", "ديكورات متنوعة", "ألعاب وأدوات"],
      contact: "01001234570",
      languages: ["عربي"],
      deliveryTime: "3-5 أيام"
    },
    {
      id: 5,
      name: "أحمد السعيد",
      specialty: "تصوير المنتجات والإعلانات",
      experience: "7 سنين",
      rating: 4.8,
      reviews: 112,
      price: 2800,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300",
      category: "commercial",
      governorate: "الدقهلية",
      city: "المنصورة",
      portfolio: [
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400",
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400",
        "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400"
      ],
      description: "مصور إعلانات محترف متخصص في تصوير المنتجات والمواد التسويقية في المنصورة",
      equipment: ["استوديو كامل", "إضاءة احترافية", "خلفيات متعددة", "معدات تحرير"],
      contact: "01001234571",
      languages: ["عربي", "إنجليزي"],
      deliveryTime: "4-6 أيام"
    },
    {
      id: 6,
      name: "نورة عبد الرحمن",
      specialty: "تصوير الأزياء والموضة",
      experience: "4 سنين",
      rating: 4.6,
      reviews: 67,
      price: 2200,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300",
      category: "fashion",
      governorate: "القاهرة",
      city: "مدينة نصر",
      portfolio: [
        "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400",
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400",
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400"
      ],
      description: "مصورة أزياء محترفة مع خبرة في مجال الموضة والتقطيعات الإبداعية في مدينة نصر",
      equipment: ["Sony A7III", "إضاءة استوديو", "خلفيات فنية", "معدات ما بعد الإنتاج"],
      contact: "01001234572",
      languages: ["عربي", "إنجليزي", "إيطالي"],
      deliveryTime: "3-5 أيام"
    },
    {
      id: 7,
      name: "محمود العزازي",
      specialty: "تصوير الأفراح",
      experience: "12 سنة",
      rating: 4.9,
      reviews: 203,
      price: 3000,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
      category: "wedding",
      governorate: "الجيزة",
      city: "الدقي",
      portfolio: [
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400",
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400"
      ],
      description: "مصور أفراح بخبرة 12 سنة، متخصص في تصوير لحظات الزفاف بطريقة إبداعية في الدقي",
      equipment: ["Canon EOS R6", "عدسات احترافية", "إضاءة متحركة", "طائرة درون"],
      contact: "01001234573",
      languages: ["عربي", "إنجليزي"],
      deliveryTime: "5-7 أيام"
    },
    {
      id: 8,
      name: "ياسمين فؤاد",
      specialty: "تصوير الحمل والمواليد",
      experience: "6 سنين",
      rating: 4.8,
      reviews: 145,
      price: 1500,
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300",
      category: "family",
      governorate: "الإسكندرية",
      city: "المنتزه",
      portfolio: [
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
        "https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=400"
      ],
      description: "مصورة متخصصة في تصوير فترات الحمل والمواليد بدقة عالية في المنتزه",
      equipment: ["Nikon Z6", "إضاءة ناعمة", "ديكورات أطفال", "خلفيات مخصصة"],
      contact: "01001234574",
      languages: ["عربي", "إنجليزي"],
      deliveryTime: "4-6 أيام"
    }
  ];

  // التصنيفات
  const categories = [
    { id: "all", name: "الكل", count: photographers.length },
    { id: "wedding", name: "تصوير الأفراح", count: photographers.filter(p => p.category === "wedding").length },
    { id: "events", name: "الفعاليات", count: photographers.filter(p => p.category === "events").length },
    { id: "family", name: "العائلات", count: photographers.filter(p => p.category === "family").length },
    { id: "commercial", name: "إعلانات", count: photographers.filter(p => p.category === "commercial").length },
    { id: "fashion", name: "أزياء", count: photographers.filter(p => p.category === "fashion").length },
    { id: "art", name: "فنون", count: photographers.filter(p => p.category === "art").length }
  ];

  // فلترة المصورين
  useEffect(() => {
    const filtered = photographers.filter(photographer => {
      const matchesCategory = selectedCategory === "all" || photographer.category === selectedCategory;
      const matchesGovernorate = selectedGovernorate === "all" || photographer.governorate === selectedGovernorate;
      const matchesCity = selectedCity === "all" || selectedCity === "كل المدن" || photographer.city === selectedCity;
      const matchesPrice = photographer.price <= priceRange;
      
      return matchesCategory && matchesGovernorate && matchesCity && matchesPrice;
    });
    setFilteredPhotographers(filtered);
  }, [selectedCategory, selectedGovernorate, selectedCity, priceRange]);

  // إعادة تعيين الفلاتر
  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedGovernorate("all");
    setSelectedCity("all");
    setPriceRange(5000);
  };

  // عند تغيير المحافظة، إعادة تعيين المدينة
  const handleGovernorateChange = (gov) => {
    setSelectedGovernorate(gov);
    setSelectedCity("all");
  };

  const handleBookPhotographer = (photographerId) => {
    // هنا بتكون عملية الحجز
    alert(`هيتم حجز المصور رقم ${photographerId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-blue-600 mb-4"
          >
            <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            رجوع
          </button>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">المصورين المحترفين في مصر</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              اختار من بين أفضل المصورين المحترفين في كل محافظات مصر لتوثيق مناسباتك بأعلى جودة
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* فلترة المحافظة */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">المحافظة</label>
              <select
                value={selectedGovernorate}
                onChange={(e) => handleGovernorateChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {Object.keys(governorates).map((gov) => (
                  <option key={gov} value={gov}>
                    {governorates[gov].name}
                  </option>
                ))}
              </select>
            </div>

            {/* فلترة المدينة */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">المدينة</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {governorates[selectedGovernorate]?.cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* فلترة السعر */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                السعر: لحد {priceRange.toLocaleString()} جنيه
              </label>
              <input
                type="range"
                min="500"
                max="5000"
                step="100"
                value={priceRange}
                onChange={(e) => setPriceRange(parseInt(e.target.value))}
                className="w-full mb-2"
              />
              <div className="flex justify-between text-gray-600 text-sm">
                <span>500</span>
                <span>5,000</span>
              </div>
            </div>

            {/* زر إعادة التعيين */}
            <div className="flex items-end">
              <button 
                onClick={resetFilters}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition-colors"
              >
                مسح الفلاتر
              </button>
            </div>
          </div>

          {/* تصنيفات التخصص */}
          <div className="mt-6">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Photographers Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              المصورين المتاحين ({filteredPhotographers.length})
            </h2>
            <p className="text-gray-600 mt-1">لاقينا {filteredPhotographers.length} مصور يناسب معايير البحث بتاعتك</p>
          </div>
        </div>

        {filteredPhotographers.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <svg className="w-24 h-24 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">مفيش مصورين في التصنيف ده</h3>
            <p className="text-gray-600">جرب تغيير الفلاتر عشان تظهرلك نتايج أكتر</p>
            <button 
              onClick={resetFilters}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              مسح الفلاتر
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPhotographers.map((photographer) => (
              <motion.div
                key={photographer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow"
              >
                {/* Photographer Image */}
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={photographer.image} 
                    alt={photographer.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                    {photographer.city}، {photographer.governorate}
                  </div>
                  <div className="absolute top-4 right-4 bg-yellow-400 text-white px-2 py-1 rounded text-sm font-bold">
                    {photographer.rating} ★
                  </div>
                </div>

                {/* Photographer Info */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{photographer.name}</h3>
                      <p className="text-blue-600 font-medium">{photographer.specialty}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-gray-500 text-sm mb-1">({photographer.reviews} تقييم)</div>
                      <p className="text-green-600 font-bold text-lg">{photographer.price.toLocaleString()} جنيه</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">{photographer.description}</p>
                  
                  {/* Experience & Languages */}
                  <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      خبرة: {photographer.experience}
                    </div>
                    <div className="text-blue-600">
                      {photographer.languages.join("، ")}
                    </div>
                  </div>

                  {/* Equipment */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm">المعدات:</h4>
                    <div className="flex flex-wrap gap-1">
                      {photographer.equipment.slice(0, 3).map((item, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                          {item}
                        </span>
                      ))}
                      {photographer.equipment.length > 3 && (
                        <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                          +{photographer.equipment.length - 3} أكتر
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Portfolio Preview */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm">شغلات قديمة:</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {photographer.portfolio.map((img, index) => (
                        <img 
                          key={index}
                          src={img} 
                          alt={`شغل ${index + 1}`}
                          className="w-full h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() => window.open(img, '_blank')}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Delivery Time */}
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <span>مدة التسليم: {photographer.deliveryTime}</span>
                    <span className="text-blue-600">{photographer.contact}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button 
                      onClick={() => handleBookPhotographer(photographer.id)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
                    >
                      احجز دلوقتي
                    </button>
                    <button className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">{photographers.length}+</div>
              <div className="text-gray-600">مصور محترف</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">24+</div>
              <div className="text-gray-600">محافظة</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">4.8</div>
              <div className="text-gray-600">متوسط التقييم</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">1000+</div>
              <div className="text-gray-600">حجز ناجح</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotographersPage;