import { motion } from "framer-motion";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const CompanyHomePage = () => {
  const { user, logout } = useAuthStore();
  const [activeSection, setActiveSection] = useState("home");
  const navigate = useNavigate();

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

  // إحصائيات الشركة
  const companyStats = [
    { number: "500+", label: "مكان متاح" },
    { number: "100+", label: "عميل راضي" },
    { number: "20+", label: "مدينة" },
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
                Evento- ايفنتو
              </h1>
            </div>
            
            <div className="hidden md:flex space-x-8">
              {["home", "services", "about", "contact"].map((section) => (
                <button 
                  key={section}
                  onClick={() => handleNavigateToSection(section)}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    activeSection === section ? "text-blue-500 font-semibold" : "text-gray-600 hover:text-blue-500"
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
              className="bg-white text-blue-500 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold text-lg transition-colors"
            >
              ابدأ الحجز الآن
            </button>
            <button 
              onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-white hover:bg-white hover:text-blue-500 px-8 py-3 rounded-full font-semibold text-lg transition-colors"
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
              <div className="bg-white rounded-2xl p-4 shadow-lg inline-block">
                <img 
                  src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400" 
                  alt="حجز الأماكن"
                  className="w-64 h-48 object-cover rounded-xl mx-auto mb-4 shadow-md"
                />
                <p className="text-gray-700 font-medium">أفضل الأماكن بانتظارك</p>
              </div>
            </div>

            {/* صورة تحت زر "تعرف على خدماتنا" */}
            <div className="text-center">
              <div className="bg-white rounded-2xl p-4 shadow-lg inline-block">
                <img 
                  src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400" 
                  alt="خدماتنا"
                  className="w-64 h-48 object-cover rounded-xl mx-auto mb-4 shadow-md"
                />
                <p className="text-gray-700 font-medium">تعرف على خدماتنا</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
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
                <div className="text-4xl md:text-5xl font-bold text-blue-500 mb-2">{stat.number}</div>
                <div className="text-lg text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Types Section */}
      <section id="booking-types" className="py-16 bg-gray-50">
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

      {/* Services Section */}
      <section id="services" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">لماذا تختار منصتنا؟</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
                className="text-center p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-md"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">كيف تعمل المنصة؟</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
                <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-blue-200"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">ماذا يقول عملاؤنا؟</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
                className="bg-gray-50 p-6 rounded-2xl shadow-sm"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-lg ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4">{testimonial.comment}</p>
                <div>
                  <p className="font-bold text-gray-800">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
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
      />
    </div>
  );
};

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

export default CompanyHomePage;