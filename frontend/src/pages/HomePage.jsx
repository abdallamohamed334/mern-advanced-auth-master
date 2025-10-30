import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate, useLocation } from "react-router-dom";

const CompanyHomePage = () => {
  const { user, logout } = useAuthStore();
  const [activeSection, setActiveSection] = useState("home");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showBackButton, setShowBackButton] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
      color: "from-purple-400 to-pink-400",
      bgColor: "bg-white dark:bg-gray-800",
      borderColor: "border-purple-100 dark:border-purple-900",
      route: "/wedding-halls"
    },
    {
      id: 2,
      title: "أماكن أعياد ميلاد",
      description: "لحفلات الأطفال والمناسبات الصغيرة",
      icon: "🎁",
      color: "from-blue-400 to-cyan-400",
      bgColor: "bg-white dark:bg-gray-800",
      borderColor: "border-blue-100 dark:border-blue-900",
      route: "/birthday-places"
    },
    {
      id: 3,
      title: "ديكورات",
      description: "لللقاءات العائلية والاجتماعات",
      icon: "🏪",
      color: "from-green-400 to-emerald-400",
      bgColor: "bg-white dark:bg-gray-800",
      borderColor: "border-green-100 dark:border-green-900",
      route: "/decorations"
    },
    {
      id: 4,
      title: "قاعات مؤتمرات",
      description: "للالقاءات الرسمية والندوات",
      icon: "🎤",
      color: "from-orange-400 to-red-400",
      bgColor: "bg-white dark:bg-gray-800",
      borderColor: "border-orange-100 dark:border-orange-900",
      route: "/conference-halls"
    },
    {
      id: 5,
      title: "مصورين",
      description: "مصورين محترفين لجميع المناسبات",
      icon: "📸",
      color: "from-indigo-400 to-purple-400",
      bgColor: "bg-white dark:bg-gray-800",
      borderColor: "border-indigo-100 dark:border-indigo-900",
      route: "/photographers"
    }
  ];

  // إحصائيات الشركة
  const companyStats = [
    { number: "500+", label: "مكان متاح" },
    { number: "100+", label: "عميل راضي" },
    { number: "20+", label: "مدينة" },
    { number: "5+", label: "سنوات خبرة" }
  ];

  // التحقق إذا كانت الصفحة الحالية هي الصفحة الرئيسية
  useEffect(() => {
    setShowBackButton(location.pathname !== "/");
  }, [location.pathname]);

  // تحميل وضع الدارك مود من localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, []);

  // حفظ وضع الدارك مود في localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // تبديل وضع الدارك مود
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // التنقل للصفحة المتخصصة مع تأثير الرجوع
  const handleNavigateToCategory = (route) => {
    // تأثير الرجوع عند الضغط
    const button = event?.currentTarget;
    if (button) {
      button.style.transform = "scale(0.95)";
      
      setTimeout(() => {
        button.style.transform = "scale(1)";
        navigate(route);
      }, 150);
    } else {
      navigate(route);
    }
  };

  // التنقل للقسم المحدد مع تأثير الرجوع
  const handleNavigateToSection = (section) => {
    setActiveSection(section);
    setShowMobileMenu(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // إغلاق القائمة المتنقلة
  const handleCloseMobileMenu = () => {
    setShowMobileMenu(false);
  };

  // الرجوع للصفحة السابقة
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 w-full transition-colors duration-300">
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 bg-opacity-95 dark:bg-opacity-95 backdrop-filter backdrop-blur-lg border-b border-gray-100 dark:border-gray-700 sticky top-0 z-50 w-full transition-colors duration-300">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              {/* زر الرجوع */}
              <AnimatePresence>
                {showBackButton && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    onClick={handleBack}
                    className="w-10 h-10 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors duration-200 active:scale-95"
                  >
                    <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </motion.button>
                )}
              </AnimatePresence>

                <h1 onClick={() => handleNavigateToSection("home")} className="cursor-pointer">
                  <img
                    src="/evento.png"
                    alt="Evento Logo"
                    className="h-20 w-auto"
                  />
                </h1>



            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {["home", "services", "about", "contact"].map((section) => (
                <button 
                  key={section}
                  onClick={() => handleNavigateToSection(section)}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    activeSection === section 
                      ? "text-blue-500 dark:text-blue-400 font-semibold" 
                      : "text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                  }`}
                >
                  {section === "home" && "الرئيسية"}
                  {section === "services" && "خدماتنا"}
                  {section === "about" && "من نحن"}
                  {section === "contact" && "اتصل بنا"}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              {/* زر الدارك مود */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 active:scale-95"
              >
                {darkMode ? (
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>

              <div className="hidden md:flex items-center space-x-4">
                {user ? (
                  <>
                    <div className="hidden md:flex items-center space-x-3 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-full">
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-300">{user.email}</p>
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
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 text-sm font-medium"
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
        </div>

        {/* Mobile Navigation Slider */}
        <AnimatePresence>
          {showMobileMenu && (
            <>
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                onClick={handleCloseMobileMenu}
              />
              
              {/* Slider */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed inset-y-0 right-0 w-80 max-w-full bg-white dark:bg-gray-800 shadow-2xl z-50 md:hidden flex flex-col"
              >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-blue-50 dark:bg-blue-900/20">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">E</span>
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-800 dark:text-white">ايفنتو</h2>
                      <p className="text-xs text-gray-600 dark:text-gray-300">منصة الحجوزات</p>
                    </div>
                  </div>
                  <button
                    onClick={handleCloseMobileMenu}
                    className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 hover:bg-white dark:hover:bg-gray-700 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 overflow-y-auto py-4">
                  <div className="space-y-2 px-4">
                    {[
                      { id: "home", name: "الرئيسية", icon: "🏠" },
                      { id: "services", name: "خدماتنا", icon: "🎯" },
                      { id: "about", name: "من نحن", icon: "👥" },
                      { id: "contact", name: "اتصل بنا", icon: "📞" }
                    ].map((section) => (
                      <button
                        key={section.id}
                        onClick={() => handleNavigateToSection(section.id)}
                        className={`w-full text-right px-4 py-4 rounded-xl transition-all duration-200 flex items-center justify-between ${
                          activeSection === section.id 
                            ? "bg-blue-500 text-white shadow-lg" 
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-500 dark:hover:text-blue-400"
                        }`}
                      >
                        <span className="text-lg">{section.icon}</span>
                        <span className="font-medium text-lg">{section.name}</span>
                      </button>
                    ))}
                  </div>

                  {/* Dark Mode Toggle in Mobile Menu */}
                  <div className="mt-6 px-4">
                    <button
                      onClick={toggleDarkMode}
                      className="w-full text-right px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 flex items-center justify-between"
                    >
                      <span className="text-lg">{darkMode ? "☀️" : "🌙"}</span>
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {darkMode ? "الوضع النهاري" : "الوضع الليلي"}
                      </span>
                    </button>
                  </div>

                  {/* Booking Types in Mobile Menu */}
                  <div className="mt-6 px-4">
                    <h3 className="text-right text-gray-600 dark:text-gray-400 font-medium mb-4 text-lg">أنواع الحجوزات</h3>
                    <div className="space-y-3">
                      {bookingTypes.slice(0, 3).map((type) => (
                        <button
                          key={type.id}
                          onClick={() => {
                            handleCloseMobileMenu();
                            handleNavigateToCategory(type.route);
                          }}
                          className="w-full text-right px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-500 transition-colors duration-200 flex items-center justify-between group active:scale-95"
                        >
                          <span className="text-xl transform group-hover:scale-110 transition-transform">
                            {type.icon}
                          </span>
                          <div className="text-left">
                            <p className="font-medium text-gray-800 dark:text-gray-200 group-hover:text-blue-500">{type.title}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{type.description}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* User Section in Mobile */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                  {user ? (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">
                            {user.name.charAt(0)}
                          </span>
                        </div>
                        <div className="text-right flex-1">
                          <p className="text-sm font-bold text-gray-900 dark:text-white">{user.name}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-300">{user.email}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => {
                          handleCloseMobileMenu();
                          handleLogout();
                        }}
                        className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200 flex items-center justify-center space-x-2 active:scale-95"
                      >
                        <span>تسجيل الخروج</span>
                        <span>🚪</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <button 
                        onClick={() => {
                          handleCloseMobileMenu();
                          navigate('/login');
                        }}
                        className="w-full text-gray-700 dark:text-gray-300 hover:text-blue-500 px-4 py-3 rounded-xl text-sm font-medium transition-colors border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 flex items-center justify-center space-x-2 active:scale-95"
                      >
                        <span>تسجيل الدخول</span>
                        <span>🔑</span>
                      </button>
                      <button 
                        onClick={() => {
                          handleCloseMobileMenu();
                          navigate('/signup');
                        }}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200 flex items-center justify-center space-x-2 active:scale-95"
                      >
                        <span>إنشاء حساب</span>
                        <span>👤</span>
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full py-20 lg:py-32 bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-600 dark:to-indigo-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            منصة ايفنتو الرائدة
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
          >
            نوفر لك أفضل الأماكن والمصورين لحفلاتك ومناسباتك في جميع محافظات مصر
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button 
              onClick={() => document.getElementById('booking-types').scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-blue-500 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold text-lg transition-colors active:scale-95"
            >
              ابدأ الحجز الآن
            </button>
            <button 
              onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-white hover:bg-white hover:text-blue-500 px-8 py-3 rounded-full font-semibold text-lg transition-colors active:scale-95"
            >
              تعرف على خدماتنا
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
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg inline-block">
                <img 
                  src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400" 
                  alt="حجز الأماكن"
                  className="w-64 h-48 object-cover rounded-xl mx-auto mb-4 shadow-md"
                />
                <p className="text-gray-700 dark:text-gray-300 font-medium">أفضل الأماكن بانتظارك</p>
              </div>
            </div>

            {/* صورة تحت زر "تعرف على خدماتنا" */}
            <div className="text-center">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg inline-block">
                <img 
                  src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400" 
                  alt="خدماتنا"
                  className="w-64 h-48 object-cover rounded-xl mx-auto mb-4 shadow-md"
                />
                <p className="text-gray-700 dark:text-gray-300 font-medium">تعرف على خدماتنا</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {companyStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-blue-500 dark:text-blue-400 mb-2">{stat.number}</div>
                <div className="text-lg text-gray-600 dark:text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Types Section */}
      <section id="booking-types" className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              ما نوع الحجز الذي تبحث عنه؟
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
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
                onClick={(e) => handleNavigateToCategory(type.route)}
                className={`cursor-pointer rounded-2xl p-6 border transition-all duration-300 ${type.bgColor} ${type.borderColor} hover:shadow-xl dark:hover:shadow-2xl h-full flex flex-col group active:scale-95`}
              >
                <div className="text-5xl mb-4 flex-grow-0 transform group-hover:scale-110 transition-transform duration-300">
                  {type.icon}
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">{type.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{type.description}</p>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className={`w-16 h-1 bg-gradient-to-r ${type.color} rounded-full`}></div>
                  <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                    اكتشف المزيد →
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">لماذا تختار منصتنا؟</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              نقدم لك تجربة حجز فريدة ومميزة مع أفضل الخدمات وأعلى معايير الجودة
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "⚡",
                title: "حجز سريع وسهل",
                description: "عملية حجز مبسطة ومباشرة توفر وقتك وجهدك"
              },
              {
                icon: "💰",
                title: "أسعار تنافسية",
                description: "عروض وأسعار مناسبة تناسب جميع الميزانيات"
              },
              {
                icon: "⭐",
                title: "جودة مضمونة",
                description: "جميع الأماكن والمصورين مختارين بعناية فائقة"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="text-center p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl shadow-md"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">كيف تعمل المنصة؟</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              خطوات بسيطة تفصلك عن حجز مكانك المثالي
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "اختر نوع الحجز", description: "اختر من بين أنواع الحجوزات المتاحة" },
              { step: "2", title: "تصفح الخيارات", description: "استعرض الأماكن أو المصورين المتاحين" },
              { step: "3", title: "احجز موعدك", description: "اختر التاريخ والوقت المناسبين" },
              { step: "4", title: "استمتع بمناسبتك", description: "استلم تأكيد الحجز واستمتع بمناسبتك" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center relative"
              >
                <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{item.description}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-blue-200 dark:bg-blue-800"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">ماذا يقول عملاؤنا؟</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              آراء عملائنا تهمنا ونسعى دائماً لتقديم الأفضل
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "أحمد السعد",
                role: "عميل - حفل زفاف",
                comment: "تجربة رائعة مع المنصة، ساعدتني في إيجاد القاعة المثالية لحفل زفافي بكل سهولة",
                rating: 5
              },
              {
                name: "فاطمة الناصر",
                role: "عميلة - مؤتمر عمل",
                comment: "خدمة ممتازة ومحترفة، أنصح الجميع باستخدام المنصة لحجز قاعات المؤتمرات",
                rating: 5
              },
              {
                name: "محمد القحطاني",
                role: "عميل - تصوير مناسبات",
                comment: "المصور الذي حجزته من خلال المنصة كان محترفاً جداً، والنتائج كانت مذهلة",
                rating: 4
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-gray-50 dark:bg-gray-700 p-6 rounded-2xl shadow-sm"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-lg ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}>
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{testimonial.comment}</p>
                <div>
                  <p className="font-bold text-gray-800 dark:text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer 
        bookingTypes={bookingTypes}
        onNavigateToSection={handleNavigateToSection}
        onNavigateToCategory={handleNavigateToCategory}
        darkMode={darkMode}
      />
    </div>
  );
};

// Footer Component
const Footer = ({ bookingTypes, onNavigateToSection, onNavigateToCategory, darkMode }) => (
  <footer className="bg-gray-800 dark:bg-gray-900 text-white py-12 transition-colors duration-300">
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
              <button onClick={() => onNavigateToSection("services")} className="hover:text-white transition-colors">
                خدماتنا
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateToSection("about")} className="hover:text-white transition-colors">
                من نحن
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateToSection("contact")} className="hover:text-white transition-colors">
                اتصل بنا
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
                  className="hover:text-white transition-colors text-right w-full active:scale-95"
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
            <a href="#" className="w-10 h-10 bg-gray-700 dark:bg-gray-600 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors active:scale-95">
              <span>ف</span>
            </a>
            <a href="#" className="w-10 h-10 bg-gray-700 dark:bg-gray-600 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors active:scale-95">
              <span>ت</span>
            </a>
            <a href="#" className="w-10 h-10 bg-gray-700 dark:bg-gray-600 rounded-full flex items-center justify-center hover:bg-pink-500 transition-colors active:scale-95">
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

export default CompanyHomePage;