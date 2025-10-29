import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";

const BookingHomePage = () => {
  const { user, logout } = useAuthStore();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [selectedBookingType, setSelectedBookingType] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [priceRange, setPriceRange] = useState(20000);
  const [locationFilter, setLocationFilter] = useState("all");
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [currentView, setCurrentView] = useState("home"); // "home", "details"

  const handlePlayVideo = () => {
    setIsVideoPlaying(true);
  };

  const handleLogout = () => {
    logout();
  };

  // أنواع الحجز المتاحة
  const bookingTypes = [
    {
      id: 1,
      title: "قاعات أفراح",
      description: "لحفلات الزفاف والمناسبات الكبيرة",
      icon: "💒",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    },
    {
      id: 2,
      title: "أماكن أعياد ميلاد",
      description: "لحفلات الأطفال والمناسبات الصغيرة",
      icon: "🎁",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      id: 3,
      title: "كافيهات",
      description: "لللقاءات العائلية والاجتماعات",
      icon: "🏪",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      id: 4,
      title: "قاعات مؤتمرات",
      description: "للالقاءات الرسمية والندوات",
      icon: "🎤",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200"
    }
  ];

  // بيانات الأماكن (جميع الأنواع)
  const allVenues = [
    // قاعات أفراح - 8 قاعات
    {
      id: 1,
      name: "القاعة الكريستالية",
      type: "قاعة أفراح",
      category: "فاخرة",
      location: "المدينة المنورة",
      capacity: 150,
      price: 5000,
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400",
      images: [
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800",
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800",
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800"
      ],
      features: ["تكييف مركزي", "ديكورات فاخرة", "شاشة عرض", "نظام صوتي متكامل", "مواقف سيارات", "خدمة WiFi"],
      description: "قاعة فاخرة بتصميم عصري وأناقة لا تضاهى، مثالية لحفلات الزفاف والمناسبات الكبيرة. تتميز بإطلالة رائعة وتجهيزات متكاملة.",
      available: true,
      bookingType: "قاعات أفراح",
      rating: 4.8,
      contact: "0550123456",
      email: "crystal@venues.com",
      address: "حي السلام، المدينة المنورة",
      amenities: ["واي فاي مجاني", "مواقف سيارات", "تكييف مركزي", "مصلى", "مطبخ مجهز"],
      rules: ["ممنوع التدخين", "الالتزام بموعد نهاية الحفل", "الحجز المسبق مطلوب"]
    },
    {
      id: 2,
      name: "حديقة الأفراح",
      type: "حديقة خارجية", 
      category: "طبيعية",
      location: "جدة",
      capacity: 200,
      price: 7000,
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400",
      images: [
        "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800",
        "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=800",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800"
      ],
      features: ["حديقة مورقة", "ملعب أطفال", "مظلات", "ألعاب نارية", "نوافير مائية", "إضاءة زينة"],
      description: "حديقة خلابة تصلح للحفلات الخارجية، تتميز بمساحات خضراء واسعة ومناظر طبيعية ساحرة.",
      available: true,
      bookingType: "قاعات أفراح",
      rating: 4.6,
      contact: "0550123457",
      email: "garden@venues.com",
      address: "حي الروضة، جدة",
      amenities: ["حديقة خارجية", "ملاعب أطفال", "مظلات", "ديكورات نباتية"],
      rules: ["الحجز قبل أسبوع على الأقل", "الالتزام بالتعليمات البيئية"]
    },
    {
      id: 3,
      name: "قاعة الذهبية",
      type: "قاعة أفراح",
      category: "فاخرة",
      location: "الرياض",
      capacity: 300,
      price: 12000,
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400",
      images: [
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800",
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800",
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800"
      ],
      features: ["تصميم فاخر", "إضاءة LED", "خدمة طعام 5 نجوم", "بار كوكتيل", "شاشات بلازما", "نظام صوت محترف"],
      description: "قاعة ذهبية بلمسات من الفخامة والأناقة، مصممة خصيصاً للعرسان الذين يبحثون عن التميز.",
      available: true,
      bookingType: "قاعات أفراح",
      rating: 4.9,
      contact: "0550123458",
      email: "golden@venues.com",
      address: "حي العليا، الرياض",
      amenities: ["خدمة طعام 5 نجوم", "بار كوكتيل", "شاشات عرض", "تكييف مركزي"],
      rules: ["دفع عربون 30%", "تأكيد الحجز قبل 48 ساعة"]
    },
    // ... باقي القاعات بنفس الهيكل
    {
      id: 4,
      name: "قاعة النخيل",
      type: "قاعة أفراح",
      category: "كلاسيكية",
      location: "مكة",
      capacity: 180,
      price: 6500,
      image: "https://images.unsplash.com/photo-1549451371-64aa98a6f660?w=400",
      images: [
        "https://images.unsplash.com/photo-1549451371-64aa98a6f660?w=800",
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800"
      ],
      features: ["تصميم عربي", "فناء خارجي", "موسيقى حية", "تجهيزات تقليدية"],
      description: "قاعة تجمع بين الأصالة والحداثة بتصميم عربي أصيل.",
      available: true,
      bookingType: "قاعات أفراح",
      rating: 4.5,
      contact: "0550123459",
      email: "palm@venues.com",
      address: "حي الزاهر، مكة",
      amenities: ["فناء خارجي", "ديكورات عربية", "موسيقى حية"],
      rules: ["الالتزام بالزي المحتشم"]
    }
  ];

  // المواقع المتاحة
  const locations = ["all", "المدينة المنورة", "جدة", "الرياض", "مكة", "الدمام", "الطائف"];

  // فلترة الأماكن
  useEffect(() => {
    const filtered = allVenues.filter(venue => {
      const matchesType = !selectedBookingType || venue.bookingType === selectedBookingType;
      const matchesCategory = activeFilter === "all" || venue.category === activeFilter;
      const matchesPrice = venue.price <= priceRange;
      const matchesLocation = locationFilter === "all" || venue.location === locationFilter;
      
      return matchesType && matchesCategory && matchesPrice && matchesLocation;
    });
    setFilteredVenues(filtered);
  }, [selectedBookingType, activeFilter, priceRange, locationFilter]);

  // العودة لاختيار النوع
  const handleBackToSelection = () => {
    setSelectedBookingType(null);
    setSelectedVenue(null);
    setActiveFilter("all");
    setLocationFilter("all");
    setPriceRange(20000);
    setCurrentView("home");
  };

  // عرض النجوم للتقييم
  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-sm ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
          >
            ★
          </span>
        ))}
        <span className="text-gray-600 text-sm mr-1">({rating})</span>
      </div>
    );
  };

  // إعادة تعيين الفلاتر
  const resetFilters = () => {
    setActiveFilter("all");
    setLocationFilter("all");
    setPriceRange(20000);
  };

  // عرض تفاصيل القاعة
  const handleVenueClick = (venue) => {
    setSelectedVenue(venue);
    setCurrentView("details");
  };

  // العودة لقائمة الأماكن
  const handleBackToList = () => {
    setCurrentView("list");
    setSelectedVenue(null);
  };

  // صفحة تفاصيل القاعة
  const VenueDetails = ({ venue }) => {
    const [selectedImage, setSelectedImage] = useState(0);

    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <button
                onClick={handleBackToList}
                className="flex items-center text-blue-600 hover:text-blue-700"
              >
                <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                العودة للقائمة
              </button>
              <h1 className="text-2xl font-bold text-gray-900">تفاصيل القاعة</h1>
              <div className="w-8"></div> {/* For balance */}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Images Gallery */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Main Image */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl overflow-hidden h-96 lg:h-[500px]">
                <img 
                  src={venue.images[selectedImage]} 
                  alt={venue.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Thumbnails */}
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {venue.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`rounded-lg overflow-hidden h-24 border-2 ${
                      selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${venue.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Quick Info */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {venue.price.toLocaleString()} ر.س
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>السعة:</span>
                    <span className="font-medium">{venue.capacity} شخص</span>
                  </div>
                  <div className="flex justify-between">
                    <span>المكان:</span>
                    <span className="font-medium">{venue.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>التقييم:</span>
                    <span className="font-medium">{renderStars(venue.rating)}</span>
                  </div>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold mt-4 transition-colors">
                  احجز الآن
                </button>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{venue.name}</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">{venue.description}</p>
                
                {/* Features */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">المميزات</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {venue.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">المرافق</h3>
                  <div className="flex flex-wrap gap-2">
                    {venue.amenities.map((amenity, index) => (
                      <span key={index} className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Rules */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">الشروط والأحكام</h3>
                  <div className="space-y-2">
                    {venue.rules.map((rule, index) => (
                      <div key={index} className="flex items-center gap-2 text-gray-600">
                        <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        {rule}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Info */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">معلومات التواصل</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">الهاتف</div>
                      <div className="font-medium text-gray-900">{venue.contact}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">البريد الإلكتروني</div>
                      <div className="font-medium text-gray-900">{venue.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">العنوان</div>
                      <div className="font-medium text-gray-900">{venue.address}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Form */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">طلب حجز</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">التاريخ</label>
                    <input 
                      type="date" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">الوقت</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option>06:00 مساءً - 10:00 مساءً</option>
                      <option>10:00 مساءً - 02:00 صباحاً</option>
                      <option>02:00 صباحاً - 06:00 صباحاً</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">عدد الأشخاص</label>
                    <input 
                      type="number" 
                      min="1"
                      max={venue.capacity}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors">
                    تأكيد الحجز
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render based on current view
  if (currentView === "details" && selectedVenue) {
    return <VenueDetails venue={selectedVenue} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 w-full">
      {/* Navigation */}
      <nav className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50 w-full">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-blue-600">منصة الحجوزات</h1>
            </div>
            
            <div className="hidden md:flex space-x-8">
              {['الرئيسية', 'الأماكن', 'من نحن', 'اتصل بنا'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  {item}
                </a>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <div className="hidden md:flex items-center space-x-3 bg-blue-50 px-4 py-2 rounded-lg">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-600">{user.email}</p>
                    </div>
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                  >
                    تسجيل الخروج
                  </button>
                </>
              ) : (
                <>
                  <button className="text-gray-600 hover:text-blue-600 text-sm font-medium">
                    تسجيل الدخول
                  </button>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                    إنشاء حساب
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* اختيار نوع الحجز */}
        {!selectedBookingType ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 w-full"
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              ما نوع الحجز الذي تبحث عنه؟
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              اختر من بين أنواع الحجوزات المتاحة لدينا وابحث عن المكان المثالي لمناسبتك
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl mx-auto">
              {bookingTypes.map((type) => (
                <motion.div
                  key={type.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedBookingType(type.title)}
                  className={`cursor-pointer rounded-2xl p-6 border-2 transition-all duration-300 ${type.bgColor} ${type.borderColor} hover:shadow-2xl h-full flex flex-col`}
                >
                  <div className="text-5xl mb-4 flex-grow-0">{type.icon}</div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{type.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{type.description}</p>
                  </div>
                  <div className={`w-16 h-1 bg-gradient-to-r ${type.color} rounded-full mx-auto mt-2`}></div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          /* عرض الأماكن بعد اختيار النوع */
          <div className="w-full">
            {/* Header مع زر العودة */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 w-full"
            >
              <div className="flex-1">
                <button
                  onClick={handleBackToSelection}
                  className="flex items-center text-blue-600 hover:text-blue-700 mb-4 text-lg"
                >
                  <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  العودة لاختيار نوع الحجز
                </button>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {selectedBookingType}
                </h1>
                <p className="text-gray-600 mt-2">
                  اختر المكان المناسب لمناسبتك من بين {allVenues.filter(v => v.bookingType === selectedBookingType).length} مكان متاح
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-3 flex-wrap">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold shadow-lg transition-all duration-200 flex items-center text-sm md:text-base"
                  onClick={() => document.getElementById('venues-section').scrollIntoView({ behavior: 'smooth' })}
                >
                  استعرض الأماكن
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-gray-300 hover:border-blue-400 text-gray-700 hover:text-blue-700 px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 text-sm md:text-base"
                  onClick={handlePlayVideo}
                >
                  شاهد فيديو تعريفي
                </motion.button>
              </div>
            </motion.div>

            {/* فلترة وعرض الأماكن */}
            <section id="venues-section" className="mt-8 w-full">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden w-full">
                <div className="flex flex-col lg:flex-row w-full">
                  {/* Filters Sidebar */}
                  <div className="lg:w-1/4 bg-gray-50 p-6 border-b lg:border-b-0 lg:border-r border-gray-200">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <div className="flex justify-between items-center mb-6">
                        <h3 className='text-xl font-semibold text-blue-600'>فلاتر البحث</h3>
                        <button 
                          onClick={resetFilters}
                          className="text-sm text-blue-600 hover:text-blue-700"
                        >
                          إعادة تعيين
                        </button>
                      </div>
                      
                      {/* فلترة الموقع */}
                      <div className="mb-6">
                        <h4 className="text-gray-900 font-medium mb-3">المدينة</h4>
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                          {locations.map((location) => (
                            <button
                              key={location}
                              onClick={() => setLocationFilter(location)}
                              className={`w-full text-right px-3 py-2 rounded-lg transition-colors duration-200 ${
                                locationFilter === location
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                              }`}
                            >
                              {location === "all" ? "جميع المدن" : location}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* فلترة النوع */}
                      <div className="mb-6">
                        <h4 className="text-gray-900 font-medium mb-3">التصنيف</h4>
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                          {["all", "فاخرة", "طبيعية", "كلاسيكية", "ترفيهية", "عائلية", "هادئ", "عصري", "متخصص", "رومانسي"].map((category) => (
                            <button
                              key={category}
                              onClick={() => setActiveFilter(category)}
                              className={`w-full text-right px-3 py-2 rounded-lg transition-colors duration-200 ${
                                activeFilter === category
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                              }`}
                            >
                              {category === "all" ? "جميع التصنيفات" : category}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* فلترة السعر */}
                      <div className="mb-6">
                        <h4 className="text-gray-900 font-medium mb-3">السعر: حتى {priceRange.toLocaleString()} ر.س</h4>
                        <input
                          type="range"
                          min="500"
                          max="20000"
                          step="500"
                          value={priceRange}
                          onChange={(e) => setPriceRange(parseInt(e.target.value))}
                          className="w-full mb-2"
                        />
                        <div className="flex justify-between text-gray-600 text-sm">
                          <span>500</span>
                          <span>20,000</span>
                        </div>
                      </div>

                      {/* إحصائيات */}
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium text-blue-800 mb-2">إحصائيات البحث</h4>
                        <div className="space-y-1 text-sm text-blue-700">
                          <div>الأماكن المتاحة: <span className="font-bold">{filteredVenues.length}</span></div>
                          <div>متوسط السعر: <span className="font-bold">
                            {filteredVenues.length > 0 
                              ? Math.round(filteredVenues.reduce((sum, v) => sum + v.price, 0) / filteredVenues.length).toLocaleString() 
                              : 0} ر.س
                          </span></div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* شبكة عرض الأماكن */}
                  <div className="lg:w-3/4 p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          الأماكن المتاحة ({filteredVenues.length})
                        </h3>
                        <p className="text-gray-600 mt-1">تم العثور على {filteredVenues.length} مكان يناسب معايير البحث</p>
                      </div>
                      <div className="flex gap-3">
                        <div className="text-gray-600 bg-gray-100 px-3 py-1 rounded-full text-sm">
                          السعة: {filteredVenues.reduce((min, v) => Math.min(min, v.capacity), Infinity)}-{filteredVenues.reduce((max, v) => Math.max(max, v.capacity), 0)} شخص
                        </div>
                      </div>
                    </div>

                    {filteredVenues.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="text-5xl mb-4">🔍</div>
                        <h3 className="text-xl font-bold text-gray-700 mb-2">لا توجد نتائج</h3>
                        <p className="text-gray-600">جرب تغيير الفلاتر للحصول على نتائج أكثر</p>
                        <button 
                          onClick={resetFilters}
                          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          إعادة تعيين الفلاتر
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredVenues.map((venue) => (
                          <motion.div
                            key={venue.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.02 }}
                            className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden cursor-pointer transition-all h-full flex flex-col hover:border-blue-300 hover:shadow-lg"
                            onClick={() => handleVenueClick(venue)}
                          >
                            <div className="relative h-48 flex-shrink-0">
                              <img 
                                src={venue.image} 
                                alt={venue.name}
                                className="w-full h-full object-cover"
                              />
                              {!venue.available && (
                                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                                  <span className="text-white font-bold bg-red-600 px-4 py-2 rounded-full">
                                    غير متاح
                                  </span>
                                </div>
                              )}
                              <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                {venue.price.toLocaleString()} ر.س
                              </div>
                              <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded text-xs">
                                {venue.location}
                              </div>
                              <div className="absolute bottom-4 right-4 bg-white bg-opacity-90 px-2 py-1 rounded">
                                {renderStars(venue.rating)}
                              </div>
                            </div>
                            
                            <div className="p-4 flex-grow flex flex-col">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="text-lg font-bold text-gray-900">{venue.name}</h4>
                                <span className="text-blue-600 text-sm bg-blue-50 px-2 py-1 rounded">
                                  {venue.capacity} شخص
                                </span>
                              </div>
                              <p className="text-gray-600 text-sm mb-3">{venue.type}</p>
                              <div className="flex flex-wrap gap-1 mb-4 flex-grow">
                                {venue.features.slice(0, 3).map((feature, index) => (
                                  <span
                                    key={index}
                                    className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                                  >
                                    {feature}
                                  </span>
                                ))}
                                {venue.features.length > 3 && (
                                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                                    +{venue.features.length - 3} أكثر
                                  </span>
                                )}
                              </div>
                              <div className="mt-auto flex gap-2">
                                <button 
                                  className={`flex-1 py-2 rounded-lg font-medium text-sm transition-colors ${
                                    venue.available 
                                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                  }`}
                                  disabled={!venue.available}
                                >
                                  {venue.available ? 'عرض التفاصيل' : 'غير متاح'}
                                </button>
                                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm transition-colors">
                                  ♡
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Video Modal */}
      {isVideoPlaying && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setIsVideoPlaying(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-8 w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">فيديو تعريفي عن منصتنا</h3>
              <button
                onClick={() => setIsVideoPlaying(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                <p className="text-gray-600">فيديو تعريفي عن منصة الحجوزات</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default BookingHomePage;