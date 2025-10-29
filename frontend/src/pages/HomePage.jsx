import { motion } from "framer-motion";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const CompanyHomePage = () => {
  const { user, logout } = useAuthStore();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  const handlePlayVideo = () => {
    setIsVideoPlaying(true);
  };

  // أنواع الحجز المتاحة
  const bookingTypes = [
    {
      id: 1,
      title: "قاعات أفراح",
      description: "لحفلات الزفاف والمناسبات الكبيرة",
      icon: "💒",
      color: "from-purple-400 to-pink-400",
      bgColor: "bg-white",
      borderColor: "border-purple-100",
      route: "/wedding-halls"
    },
    {
      id: 2,
      title: "أماكن أعياد ميلاد",
      description: "لحفلات الأطفال والمناسبات الصغيرة",
      icon: "🎁",
      color: "from-blue-400 to-cyan-400",
      bgColor: "bg-white",
      borderColor: "border-blue-100",
      route: "/birthday-places"
    },
    {
      id: 3,
      title: "كافيهات",
      description: "لللقاءات العائلية والاجتماعات",
      icon: "🏪",
      color: "from-green-400 to-emerald-400",
      bgColor: "bg-white",
      borderColor: "border-green-100",
      route: "/cafes"
    },
    {
      id: 4,
      title: "قاعات مؤتمرات",
      description: "للالقاءات الرسمية والندوات",
      icon: "🎤",
      color: "from-orange-400 to-red-400",
      bgColor: "bg-white",
      borderColor: "border-orange-100",
      route: "/conference-halls"
    },
    {
      id: 5,
      title: "مصورين",
      description: "مصورين محترفين لجميع المناسبات",
      icon: "📸",
      color: "from-indigo-400 to-purple-400",
      bgColor: "bg-white",
      borderColor: "border-indigo-100",
      route: "/photographers"
    }
  ];

  // بيانات المصورين
  const photographers = [
    {
      id: 1,
      name: "محمد أحمد",
      specialty: "تصوير الأفراح",
      experience: "8 سنوات",
      rating: 4.9,
      price: "1500 ريال",
      image: "https://images.unsplash.com/photo-1565464027194-7957a2295fb7?w=300",
      portfolio: ["https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400", "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=400"]
    },
    {
      id: 2,
      name: "سارة الخالد",
      specialty: "تصوير المؤتمرات",
      experience: "6 سنوات",
      rating: 4.8,
      price: "1200 ريال",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300",
      portfolio: ["https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400", "https://images.unsplash.com/photo-1549451371-64aa98a6f660?w=400"]
    },
    {
      id: 3,
      name: "خالد الفهد",
      specialty: "تصوير الطبيعة",
      experience: "10 سنوات",
      rating: 5.0,
      price: "2000 ريال",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
      portfolio: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400", "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400"]
    }
  ];

  // قاعات الأفراح
  const weddingHalls = [
    {
      id: 1,
      name: "قاعة نور الزفاف",
      capacity: "500 شخص",
      location: "الرياض - حي العليا",
      price: "25,000 ريال",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400",
      features: ["تصميم فاخر", "إضاءة متطورة", "خدمات طعام", "مواقف سيارات"]
    },
    {
      id: 2,
      name: "قالة ليالي الغربية",
      capacity: "300 شخص",
      location: "جدة - حي الصفا",
      price: "18,000 ريال",
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400",
      features: ["ديكور عربي", "حديقة خارجية", "قاعة رجال منفصلة", "خدمات فندقية"]
    },
    {
      id: 3,
      name: "قاعة القصواء",
      capacity: "400 شخص",
      location: "الدمام - حي الثقبة",
      price: "22,000 ريال",
      image: "https://images.unsplash.com/photo-1549451371-64aa98a6f660?w=400",
      features: ["مسرح متكامل", "شاشات عرض", "خدمات إضافية", "تصميم عصري"]
    }
  ];

  // قاعات المؤتمرات
  const conferenceHalls = [
    {
      id: 1,
      name: "مركز المؤتمرات الدولي",
      capacity: "1000 شخص",
      location: "الرياض - حي الملقا",
      price: "15,000 ريال",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400",
      features: ["تجهيزات تقنية متكاملة", "ترجمة فورية", "خدمات إدارية", "WiFi عالي السرعة"]
    },
    {
      id: 2,
      name: "قاعة الأعمال",
      capacity: "200 شخص",
      location: "جدة - حي الشرفية",
      price: "8,000 ريال",
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400",
      features: ["قاعات فرعية", "خدمات استقبال", "تسجيل صوتي", "عروض تقديمية"]
    },
    {
      id: 3,
      name: "مركز الندوات",
      capacity: "150 شخص",
      location: "الخبر - حي الراكة",
      price: "6,000 ريال",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400",
      features: ["تصميم دائري", "تفاعل مباشر", "تسجيل فيديو", "خدمات ترجمة"]
    }
  ];

  // بيانات فريق العمل
  const teamMembers = [
    {
      id: 1,
      name: "أحمد محمد",
      position: "المدير التنفيذي",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
      description: "مؤسس المنصة بخبرة تزيد عن 15 عاماً في مجال تنظيم الفعاليات"
    },
    {
      id: 2,
      name: "فاطمة علي",
      position: "مديرة العمليات",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300",
      description: "متخصصة في تنسيق الحفلات والمناسبات بخبرة 10 سنوات"
    },
    {
      id: 3,
      name: "خالد إبراهيم",
      position: "مدير التسويق",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300",
      description: "خبير في التسويق الرقمي وبناء العلامات التجارية"
    },
    {
      id: 4,
      name: "سارة عبدالله",
      position: "مستشارة العملاء",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300",
      description: "متخصصة في خدمة العملاء وتلبية احتياجاتهم"
    }
  ];

  // إحصائيات الشركة
  const companyStats = [
    { number: "500+", label: "مكان متاح" },
    { number: "10,000+", label: "عميل راضي" },
    { number: "50+", label: "مدينة" },
    { number: "5+", label: "سنوات خبرة" }
  ];

  // التنقل للصفحة المتخصصة
  const handleNavigateToCategory = (route) => {
    navigate(route);
  };

  // التنقل للقسم المحدد
  const handleNavigateToSection = (section) => {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 w-full">
      {/* Navigation */}
      <nav className="bg-white bg-opacity-95 backdrop-filter backdrop-blur-lg border-b border-gray-100 sticky top-0 z-50 w-full">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-blue-500 cursor-pointer" onClick={() => handleNavigateToSection("home")}>
                منصة الحجوزات
              </h1>
            </div>
            
            <div className="hidden md:flex space-x-8">
              {["home", "photographers", "wedding-halls", "conference-halls", "team", "gallery", "contact"].map((section) => (
                <button 
                  key={section}
                  onClick={() => handleNavigateToSection(section)}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    activeSection === section ? "text-blue-500 font-semibold" : "text-gray-600 hover:text-blue-500"
                  }`}
                >
                  {section === "home" && "الرئيسية"}
                  {section === "photographers" && "المصورين"}
                  {section === "wedding-halls" && "قاعات الأفراح"}
                  {section === "conference-halls" && "قاعات المؤتمرات"}
                  {section === "team" && "فريق العمل"}
                  {section === "gallery" && "معرض الصور"}
                  {section === "contact" && "اتصل بنا"}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <div className="hidden md:flex items-center space-x-3 bg-blue-50 px-4 py-2 rounded-full">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-600">{user.email}</p>
                    </div>
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {user.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200"
                  >
                    تسجيل الخروج
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => navigate('/login')}
                    className="text-gray-600 hover:text-blue-500 text-sm font-medium"
                  >
                    تسجيل الدخول
                  </button>
                  <button 
                    onClick={() => navigate('/signup')}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200"
                  >
                    إنشاء حساب
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full py-20 lg:py-32 bg-gradient-to-r from-blue-500 to-indigo-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            منصة الحجوزات الرائدة
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
          >
            نوفر لك أفضل الأماكن والمصورين لحفلاتك ومناسباتك في جميع أنحاء المملكة
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button 
              onClick={() => document.getElementById('booking-types').scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-blue-500 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold text-lg transition-colors"
            >
              ابدأ الحجز الآن
            </button>
            <button 
              onClick={handlePlayVideo}
              className="border-2 border-white hover:bg-white hover:text-blue-500 px-8 py-3 rounded-full font-semibold text-lg transition-colors"
            >
              شاهد فيديو تعريفي
            </button>
          </motion.div>

          {/* الصور تحت الأزرار */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            {/* صورة تحت زر "ابدأ الحجز الآن" */}
            <div className="text-center">
              <div className="bg-white rounded-2xl p-4 shadow-lg inline-block">
                <img 
                  src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400" 
                  alt="حجز الأماكن"
                  className="w-64 h-48 object-cover rounded-xl mx-auto mb-4 shadow-md"
                />
                <p className="text-gray-700 font-medium">أفضل الأماكن بانتظارك</p>
              </div>
            </div>

            {/* صورة تحت زر "شاهد فيديو تعريفي" */}
            <div className="text-center">
              <div className="bg-white rounded-2xl p-4 shadow-lg inline-block">
                <img 
                  src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400" 
                  alt="فيديو تعريفي"
                  className="w-64 h-48 object-cover rounded-xl mx-auto mb-4 shadow-md"
                />
                <p className="text-gray-700 font-medium">تعرف على خدماتنا</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Booking Types Section */}
      <section id="booking-types" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              ما نوع الحجز الذي تبحث عنه؟
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              اختر من بين أنواع الحجوزات المتاحة لدينا وابحث عن المكان المثالي لمناسبتك
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {bookingTypes.map((type) => (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: type.id * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavigateToCategory(type.route)}
                className={`cursor-pointer rounded-2xl p-6 border transition-all duration-300 ${type.bgColor} ${type.borderColor} hover:shadow-xl h-full flex flex-col group`}
              >
                <div className="text-5xl mb-4 flex-grow-0 transform group-hover:scale-110 transition-transform duration-300">
                  {type.icon}
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{type.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{type.description}</p>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className={`w-16 h-1 bg-gradient-to-r ${type.color} rounded-full`}></div>
                  <span className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors">
                    اكتشف المزيد →
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Sections */}
      {activeSection === "photographers" && (
        <PhotographersSection 
          photographers={photographers}
          onNavigateToCategory={handleNavigateToCategory}
        />
      )}

      {activeSection === "wedding-halls" && (
        <WeddingHallsSection 
          weddingHalls={weddingHalls}
          onNavigateToCategory={handleNavigateToCategory}
        />
      )}

      {activeSection === "conference-halls" && (
        <ConferenceHallsSection 
          conferenceHalls={conferenceHalls}
          onNavigateToCategory={handleNavigateToCategory}
        />
      )}

      {activeSection === "team" && (
        <TeamSection teamMembers={teamMembers} />
      )}

      {activeSection === "gallery" && (
        <GallerySection onNavigateToCategory={handleNavigateToCategory} />
      )}

      {activeSection === "contact" && (
        <ContactSection />
      )}

      {/* Footer */}
      <Footer 
        bookingTypes={bookingTypes}
        onNavigateToSection={handleNavigateToSection}
        onNavigateToCategory={handleNavigateToCategory}
      />

      {/* Video Modal */}
      {isVideoPlaying && (
        <VideoModal onClose={() => setIsVideoPlaying(false)} />
      )}
    </div>
  );
};

// Photographers Section
const PhotographersSection = ({ photographers, onNavigateToCategory }) => (
  <section className="py-16 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">المصورون المحترفون</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          اختر من بين أفضل المصورين المحترفين لتوثيق مناسباتك بأعلى جودة
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {photographers.map((photographer) => (
          <motion.div
            key={photographer.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: photographer.id * 0.1 }}
            className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100"
          >
            <div className="h-64 overflow-hidden">
              <img 
                src={photographer.image} 
                alt={photographer.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{photographer.name}</h3>
                  <p className="text-blue-500 font-medium">{photographer.specialty}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-yellow-400">★</span>
                    <span className="text-gray-700 font-semibold">{photographer.rating}</span>
                  </div>
                  <p className="text-green-500 font-bold">{photographer.price}</p>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">خبرة: {photographer.experience}</p>
              
              <div className="grid grid-cols-2 gap-2 mb-4">
                {photographer.portfolio.map((img, index) => (
                  <img 
                    key={index}
                    src={img} 
                    alt={`عمل ${index + 1}`}
                    className="w-full h-20 object-cover rounded-lg"
                  />
                ))}
              </div>
              
              <button 
                onClick={() => onNavigateToCategory("/photographers")}
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-full font-semibold transition-colors"
              >
                احجز الآن
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// Wedding Halls Section
const WeddingHallsSection = ({ weddingHalls, onNavigateToCategory }) => (
  <section className="py-16 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">قاعات الأفراح</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          اكتشف أفضل قاعات الأفراح الفاخرة والمميزة لحفل زفافك
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {weddingHalls.map((hall) => (
          <motion.div
            key={hall.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: hall.id * 0.1 }}
            className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100"
          >
            <div className="h-56 overflow-hidden">
              <img 
                src={hall.image} 
                alt={hall.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{hall.name}</h3>
              <div className="flex justify-between items-center mb-3">
                <p className="text-gray-600">السعة: {hall.capacity}</p>
                <p className="text-purple-500 font-bold">{hall.price}</p>
              </div>
              <p className="text-gray-600 text-sm mb-4">{hall.location}</p>
              
              <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">المميزات:</h4>
                <div className="flex flex-wrap gap-2">
                  {hall.features.map((feature, index) => (
                    <span key={index} className="bg-purple-50 text-purple-700 text-xs px-2 py-1 rounded-full">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              
              <button 
                onClick={() => onNavigateToCategory("/wedding-halls")}
                className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-full font-semibold transition-colors"
              >
                احجز القاعة
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// Conference Halls Section
const ConferenceHallsSection = ({ conferenceHalls, onNavigateToCategory }) => (
  <section className="py-16 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">قاعات المؤتمرات</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          قاعات مجهزة بأحدث التقنيات لعقد مؤتمراتك وندواتك باحترافية
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {conferenceHalls.map((hall) => (
          <motion.div
            key={hall.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: hall.id * 0.1 }}
            className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100"
          >
            <div className="h-56 overflow-hidden">
              <img 
                src={hall.image} 
                alt={hall.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{hall.name}</h3>
              <div className="flex justify-between items-center mb-3">
                <p className="text-gray-600">السعة: {hall.capacity}</p>
                <p className="text-orange-500 font-bold">{hall.price}</p>
              </div>
              <p className="text-gray-600 text-sm mb-4">{hall.location}</p>
              
              <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">التجهيزات:</h4>
                <div className="flex flex-wrap gap-2">
                  {hall.features.map((feature, index) => (
                    <span key={index} className="bg-orange-50 text-orange-700 text-xs px-2 py-1 rounded-full">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              
              <button 
                onClick={() => onNavigateToCategory("/conference-halls")}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-full font-semibold transition-colors"
              >
                احجز القاعة
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// Team Section Component
const TeamSection = ({ teamMembers }) => (
  <section className="py-16 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">فريق العمل</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          فريقنا المتميز من الخبراء والمتخصصين جاهز لخدمتكم وتقديم أفضل الحلول
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: member.id * 0.1 }}
            className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100"
          >
            <div className="h-64 overflow-hidden">
              <img 
                src={member.image} 
                alt={member.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
              <p className="text-blue-500 font-medium mb-3">{member.position}</p>
              <p className="text-gray-600 text-sm">{member.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// Gallery Section Component
const GallerySection = ({ onNavigateToCategory }) => (
  <section className="py-16 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">معرض الصور</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          استعرض بعض الصور من الأماكن والفعاليات التي نقدمها
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400", route: "/wedding-halls" },
          { img: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400", route: "/birthday-places" },
          { img: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400", route: "/wedding-halls" },
          { img: "https://images.unsplash.com/photo-1549451371-64aa98a6f660?w=400", route: "/conference-halls" },
          { img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400", route: "/conference-halls" },
          { img: "https://images.unsplash.com/photo-1565464027194-7957a2295fb7?w=400", route: "/photographers" }
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="rounded-2xl overflow-hidden h-40 cursor-pointer"
            onClick={() => onNavigateToCategory(item.route)}
          >
            <img 
              src={item.img} 
              alt={`صورة ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// Contact Section Component
const ContactSection = () => (
  <section className="py-16 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">اتصل بنا</h2>
          <p className="text-lg text-gray-600 mb-8">
            نحن هنا لمساعدتك! لا تتردد في التواصل معنا لأي استفسار أو طلب
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">العنوان</h3>
                <p className="text-gray-600">المملكة العربية السعودية - الرياض - حي العليا</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">الهاتف</h3>
                <p className="text-gray-600">+966 11 123 4567</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">البريد الإلكتروني</h3>
                <p className="text-gray-600">info@booking-platform.com</p>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gray-50 rounded-2xl p-8 shadow-md"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-6">أرسل رسالة</h3>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الاسم</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="أدخل اسمك"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="أدخل بريدك الإلكتروني"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الموضوع</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="موضوع الرسالة"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الرسالة</label>
              <textarea 
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="اكتب رسالتك هنا..."
              ></textarea>
            </div>
            <button 
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-full font-semibold transition-colors"
            >
              إرسال الرسالة
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  </section>
);

// Footer Component
const Footer = ({ bookingTypes, onNavigateToSection, onNavigateToCategory }) => (
  <footer className="bg-gray-800 text-white py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4 cursor-pointer" onClick={() => onNavigateToSection("home")}>
            منصة الحجوزات
          </h3>
          <p className="text-gray-400">
            الوجهة الأولى لحجز قاعات المناسبات والفعاليات في المملكة العربية السعودية
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">روابط سريعة</h4>
          <ul className="space-y-2 text-gray-400">
            <li>
              <button onClick={() => onNavigateToSection("home")} className="hover:text-white transition-colors">
                الرئيسية
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateToSection("photographers")} className="hover:text-white transition-colors">
                المصورين
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateToSection("wedding-halls")} className="hover:text-white transition-colors">
                قاعات الأفراح
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateToSection("conference-halls")} className="hover:text-white transition-colors">
                قاعات المؤتمرات
              </button>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">أنواع الحجوزات</h4>
          <ul className="space-y-2 text-gray-400">
            {bookingTypes.map((type) => (
              <li key={type.id}>
                <button 
                  onClick={() => onNavigateToCategory(type.route)}
                  className="hover:text-white transition-colors text-right w-full"
                >
                  {type.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">تابعنا</h4>
          <div className="flex space-x-4">
            <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
              <span>ف</span>
            </a>
            <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors">
              <span>ت</span>
            </a>
            <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-pink-500 transition-colors">
              <span>إن</span>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
        <p>© 2023 منصة الحجوزات. جميع الحقوق محفوظة.</p>
      </div>
    </div>
  </footer>
);

// Video Modal Component
const VideoModal = ({ onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white rounded-2xl p-8 w-full max-w-4xl"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">فيديو تعريفي عن منصتنا</h3>
        <button
          onClick={onClose}
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
);

export default CompanyHomePage;