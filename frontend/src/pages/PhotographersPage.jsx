import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const PhotographersPage = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");
  const [priceRange, setPriceRange] = useState(10000);
  const [selectedGovernorate, setSelectedGovernorate] = useState("all");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedPhotographer, setSelectedPhotographer] = useState(null);
  const [filteredPhotographers, setFilteredPhotographers] = useState([]);
  const [currentView, setCurrentView] = useState("list");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [photographers, setPhotographers] = useState([]);
  const [dataSource, setDataSource] = useState("");

  // محافظات مصر والمدن التابعة لها
  const governorates = {
    "all": { name: "كل المحافظات", cities: ["كل المدن"] },
    "القاهرة": { 
      name: "القاهرة", 
      cities: ["كل المدن", "المعادي", "مدينة نصر", "مصر الجديدة", "الزمالك", "الدقي", "المهندسين", "الزيتون", "شبرا", "العباسية"] 
    },
    "الجيزة": { 
      name: "الجيزة", 
      cities: ["كل المدن", "الدقي", "المهندسين", "فيصل", "الأهرام", "العمرانية", "البدرشين", "الصف", "أوسيم"] 
    },
    "الإسكندرية": { 
      name: "الإسكندرية", 
      cities: ["كل المدن", "سموحة", "المنتزه", "العصافرة", "اللبان", "الجمرك", "المنشية", "كامب شيزار", "السيوف"] 
    },
    "القليوبية": { 
      name: "القليوبية", 
      cities: ["كل المدن", "بنها", "شبرا الخيمة", "القناطر الخيرية", "الخانكة", "قليوب", "كفر شكر"] 
    },
    "الغربية": { 
      name: "الغربية", 
      cities: ["كل المدن", "طنطا", "المحلة الكبرى", "زفتى", "سمنود", "بسيون", "قطور"] 
    },
    "المنوفية": { 
      name: "المنوفية", 
      cities: ["كل المدن", "شبين الكوم", "منوف", "أشمون", "الباجور", "قويسنا", "بركة السبع"] 
    },
    "الدقهلية": { 
      name: "الدقهلية", 
      cities: ["كل المدن", "المنصورة", "طلخا", "ميت غمر", "دكرنس", "أجا", "المنزلة", "بلقاس"] 
    },
    "كفر الشيخ": { 
      name: "كفر الشيخ", 
      cities: ["كل المدن", "كفر الشيخ", "دسوق", "فوه", "مطوبس", "بلطيم", "الحامول"] 
    },
    "الشرقية": { 
      name: "الشرقية", 
      cities: ["كل المدن", "الزقازيق", "بلبيس", "مشتول السوق", "أبو حماد", "ههيا", "فاقوس", "صان الحجر"] 
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

  // جلب البيانات من الـ API
  useEffect(() => {
    const fetchPhotographers = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('🔄 جاري جلب بيانات المصورين من API...');
        
        const response = await fetch('http://localhost:5000/api/photographers', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (response.ok) {
          const data = await response.json();
          console.log('✅ تم جلب بيانات المصورين بنجاح:', data);
          
          if (data.photographers && data.photographers.length > 0) {
            setPhotographers(data.photographers);
            setDataSource("api");
            console.log(`🎉 تم تحميل ${data.photographers.length} مصور من الـ API`);
          } else {
            throw new Error('لا توجد بيانات للمصورين في الـ API');
          }
        } else {
          throw new Error(`فشل في جلب البيانات: ${response.status}`);
        }
      } catch (err) {
        console.error('❌ خطأ في جلب بيانات المصورين:', err.message);
        setDataSource("error");
        setError(`تعذر الاتصال بالخادم: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotographers();
  }, []);

  // فلترة المصورين
  useEffect(() => {
    console.log('🔄 جاري فلترة المصورين...', photographers.length);
    
    const filtered = photographers.filter(photographer => {
      const matchesSpecialty = activeFilter === "all" || photographer.specialty === activeFilter;
      const matchesPrice = parseInt(photographer.price) <= priceRange;
      const matchesGovernorate = selectedGovernorate === "all" || photographer.governorate === selectedGovernorate;
      const matchesCity = selectedCity === "all" || selectedCity === "كل المدن" || photographer.city === selectedCity;
      
      return matchesSpecialty && matchesPrice && matchesGovernorate && matchesCity;
    });
    
    setFilteredPhotographers(filtered);
    console.log('✅ تمت الفلترة:', filtered.length, 'مصور');
  }, [activeFilter, priceRange, selectedGovernorate, selectedCity, photographers]);

  const handleBackToHome = () => {
    navigate("/");
  };

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

  const resetFilters = () => {
    setActiveFilter("all");
    setSelectedGovernorate("all");
    setSelectedCity("all");
    setPriceRange(10000);
  };

  const handlePhotographerClick = (photographer) => {
    setSelectedPhotographer(photographer);
    setCurrentView("details");
  };

  const handleBackToList = () => {
    setCurrentView("list");
    setSelectedPhotographer(null);
  };

  const handleGovernorateChange = (gov) => {
    setSelectedGovernorate(gov);
    setSelectedCity("all");
  };

  // الحجز عبر الواتساب
  const handleBookPhotographer = (photographer) => {
    const message = `مرحبا، أنا مهتم بالحجز للتصوير\nالاسم: ${photographer.name}\nالتخصص: ${photographer.specialty}\nالسعر: ${photographer.price} جنيه\nالخبرة: ${photographer.experience} سنوات`;
    const whatsappUrl = `https://wa.me/${photographer.contact}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // صفحة تفاصيل المصور مع السلايدر
  const PhotographerDetails = ({ photographer }) => {
    const [selectedImage, setSelectedImage] = useState(0);
    const [bookingData, setBookingData] = useState({
      date: '',
      eventType: '',
      hours: 4
    });
    const [bookingLoading, setBookingLoading] = useState(false);
    const [autoSlide, setAutoSlide] = useState(true);

    // Auto slide functionality
    useEffect(() => {
      if (!autoSlide || !photographer.portfolio || photographer.portfolio.length <= 1) return;

      const interval = setInterval(() => {
        setSelectedImage((prev) => 
          prev === photographer.portfolio.length - 1 ? 0 : prev + 1
        );
      }, 5000);

      return () => clearInterval(interval);
    }, [autoSlide, photographer.portfolio]);

    const nextImage = () => {
      if (photographer.portfolio && photographer.portfolio.length > 0) {
        setSelectedImage(prev => 
          prev === photographer.portfolio.length - 1 ? 0 : prev + 1
        );
      }
    };

    const prevImage = () => {
      if (photographer.portfolio && photographer.portfolio.length > 0) {
        setSelectedImage(prev => 
          prev === 0 ? photographer.portfolio.length - 1 : prev - 1
        );
      }
    };

    const handleBookingSubmit = async (e) => {
      e.preventDefault();
      setBookingLoading(true);
      
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        handleBookPhotographer(photographer);
      } catch (err) {
        alert('حدث خطأ أثناء إرسال طلب الحجز. يرجى المحاولة مرة أخرى.');
      } finally {
        setBookingLoading(false);
      }
    };

    if (!photographer) {
      return (
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="text-5xl mb-4">😕</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">المصور غير موجود</h1>
            <button 
              onClick={handleBackToList}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              العودة للقائمة
            </button>
          </div>
        </div>
      );
    }

    const images = photographer.portfolio || [photographer.profileImage];
    const hasMultipleImages = images.length > 1;

    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <button
                onClick={handleBackToList}
                className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
              >
                <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                العودة للقائمة
              </button>
              <h1 className="text-2xl font-bold text-gray-900">تفاصيل المصور</h1>
              <div className="w-8"></div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Images Gallery with Slider */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Main Image Slider */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl overflow-hidden h-96 lg:h-[500px] bg-gray-100 relative group">
                {/* Main Image */}
                <img 
                  src={images[selectedImage]} 
                  alt={photographer.name}
                  className="w-full h-full object-cover transition-opacity duration-500"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800";
                  }}
                />
                
                {/* Navigation Arrows */}
                {hasMultipleImages && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}

                {/* Image Counter */}
                {hasMultipleImages && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                    {selectedImage + 1} / {images.length}
                  </div>
                )}

                {/* Auto Slide Toggle */}
                {hasMultipleImages && (
                  <div className="absolute top-4 right-4">
                    <button
                      onClick={() => setAutoSlide(!autoSlide)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        autoSlide 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-500 text-white'
                      }`}
                    >
                      {autoSlide ? 'التلقائي: تشغيل' : 'التلقائي: إيقاف'}
                    </button>
                  </div>
                )}

                {/* Image Dots Indicator */}
                {hasMultipleImages && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          index === selectedImage 
                            ? 'bg-white scale-125' 
                            : 'bg-white bg-opacity-50 hover:bg-opacity-70'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Thumbnails Slider */}
              {hasMultipleImages && (
                <div className="mt-4">
                  <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImage === index 
                            ? 'border-blue-500 scale-105' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <img 
                          src={image} 
                          alt={`${photographer.name} ${index + 1}`}
                          className="w-20 h-16 object-cover"
                          onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=200";
                          }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Info Sidebar */}
            <div className="space-y-4">
              {/* Profile Info */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={photographer.profileImage} 
                    alt={photographer.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{photographer.name}</h2>
                    <p className="text-blue-600 font-medium">{photographer.specialty}</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>التقييم:</span>
                    <span className="font-medium">{renderStars(photographer.rating)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>الخبرة:</span>
                    <span className="font-medium">{photographer.experience} سنة</span>
                  </div>
                  <div className="flex justify-between">
                    <span>المكان:</span>
                    <span className="font-medium">{photographer.city}، {photographer.governorate}</span>
                  </div>
                  {hasMultipleImages && (
                    <div className="flex justify-between">
                      <span>عدد الصور:</span>
                      <span className="font-medium">{images.length} صورة</span>
                    </div>
                  )}
                </div>
                
                <div className="mt-4 text-2xl font-bold text-green-600">
                  {parseInt(photographer.price)?.toLocaleString() || photographer.price} جنيه
                </div>
                
                <button 
                  onClick={() => handleBookPhotographer(photographer)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold mt-4 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893 0-3.176-1.24-6.165-3.495-8.411"/>
                  </svg>
                  احجز على الواتساب
                </button>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">معلومات عن {photographer.name}</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">{photographer.description}</p>
                
                {/* Services */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">الخدمات المقدمة</h3>
                  <div className="flex flex-wrap gap-2">
                    {photographer.services?.map((service, index) => (
                      <span key={index} className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Equipment */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">المعدات المستخدمة</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {photographer.equipment?.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Photography Specific Details */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">تفاصيل الخدمة</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="text-center bg-gray-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{photographer.photographySpecific?.hoursCoverage || 0}</div>
                      <div className="text-gray-600 text-sm">ساعات التغطية</div>
                    </div>
                    <div className="text-center bg-gray-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{photographer.photographySpecific?.numberOfPhotos || 0}</div>
                      <div className="text-gray-600 text-sm">عدد الصور</div>
                    </div>
                    <div className="text-center bg-gray-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{photographer.photographySpecific?.editingTime || 0}</div>
                      <div className="text-gray-600 text-sm">أيام التحرير</div>
                    </div>
                  </div>
                </div>

                {/* Packages */}
                {photographer.packages && photographer.packages.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">الباقات المتاحة</h3>
                    <div className="space-y-4">
                      {photographer.packages.map((pkg, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-gray-900">{pkg.name}</h4>
                            <span className="text-green-600 font-bold">{pkg.price.toLocaleString()} جنيه</span>
                          </div>
                          <p className="text-gray-600 text-sm mb-3">{pkg.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {pkg.features?.map((feature, idx) => (
                              <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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
                      <div className="text-sm text-gray-500">التليفون</div>
                      <div className="font-medium text-gray-900">{photographer.contact}</div>
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
                      <div className="text-sm text-gray-500">الإيميل</div>
                      <div className="font-medium text-gray-900">{photographer.email}</div>
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
                      <div className="font-medium text-gray-900">{photographer.address}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              {photographer.socialMedia && (
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">وسائل التواصل</h3>
                  <div className="space-y-3">
                    {photographer.socialMedia.instagram && (
                      <a 
                        href={`https://instagram.com/${photographer.socialMedia.instagram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-gray-700 hover:text-pink-600 transition-colors"
                      >
                        <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                          <span className="text-pink-600 font-bold text-sm">IG</span>
                        </div>
                        <span>إنستجرام</span>
                      </a>
                    )}
                    {photographer.socialMedia.facebook && (
                      <a 
                        href={`https://facebook.com/${photographer.socialMedia.facebook}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors"
                      >
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-bold text-sm">FB</span>
                        </div>
                        <span>فيسبوك</span>
                      </a>
                    )}
                    {photographer.socialMedia.website && (
                      <a 
                        href={photographer.socialMedia.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-gray-700 hover:text-purple-600 transition-colors"
                      >
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-purple-600 font-bold text-sm">WWW</span>
                        </div>
                        <span>الموقع الإلكتروني</span>
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Quick Booking Form */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">طلب حجز سريع</h3>
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">التاريخ</label>
                    <input 
                      type="date" 
                      value={bookingData.date}
                      onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">نوع المناسبة</label>
                    <select 
                      value={bookingData.eventType}
                      onChange={(e) => setBookingData({...bookingData, eventType: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">اختر نوع المناسبة</option>
                      <option value="زفاف">زفاف</option>
                      <option value="خطوبة">خطوبة</option>
                      <option value="حفل">حفل</option>
                      <option value="تصوير شخصي">تصوير شخصي</option>
                      <option value="تصوير عائلي">تصوير عائلي</option>
                      <option value="تصوير منتجات">تصوير منتجات</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">عدد الساعات</label>
                    <select 
                      value={bookingData.hours}
                      onChange={(e) => setBookingData({...bookingData, hours: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value={2}>2 ساعات</option>
                      <option value={4}>4 ساعات</option>
                      <option value={6}>6 ساعات</option>
                      <option value={8}>8 ساعات</option>
                      <option value={10}>10 ساعات</option>
                    </select>
                  </div>
                  <button 
                    type="submit"
                    disabled={bookingLoading}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors disabled:bg-gray-400 flex items-center justify-center gap-2"
                  >
                    {bookingLoading ? 'جاري التوجيه...' : 'احجز على الواتساب'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render based on current view
  if (currentView === "details" && selectedPhotographer) {
    return <PhotographerDetails photographer={selectedPhotographer} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 w-full">
      {/* Navigation */}
      <nav className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50 w-full">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-blue-600">المصورين المحترفين في مصر</h1>
            </div>
            
            <div className="hidden md:flex space-x-8">
              <button 
                onClick={handleBackToHome}
                className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                الصفحة الرئيسية
              </button>
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
                        {user.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={logout}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                  >
                    تسجيل الخروج
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => navigate('/login')}
                    className="text-gray-600 hover:text-blue-600 text-sm font-medium"
                  >
                    تسجيل الدخول
                  </button>
                  <button 
                    onClick={() => navigate('/signup')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                  >
                    اعمل حساب
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full py-20 lg:py-32 bg-gradient-to-r from-blue-600 to-indigo-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            المصورين المحترفين في مصر
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
          >
            اكتشف أفضل المصورين المحترفين في كل محافظات مصر لتوثيق مناسباتك
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            onClick={() => document.getElementById('photographers-section').scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
          >
            شوف المصورين
          </motion.button>
        </div>
      </section>

      {/* فلترة وعرض المصورين */}
      <section id="photographers-section" className="py-12 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* رسالة مصدر البيانات */}
          {dataSource === "api" && photographers.length > 0 && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="text-green-600 mr-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-green-800 font-medium">✅ متصل بقاعدة البيانات</p>
                  <p className="text-green-700 text-sm">يتم عرض البيانات الحقيقية من الخادم</p>
                </div>
              </div>
            </div>
          )}

          {/* رسالة الخطأ */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="text-red-600 mr-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-red-800 font-medium">❌ خطأ في الاتصال</p>
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              </div>
            </div>
          )}

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
                      مسح الفلاتر
                    </button>
                  </div>
                  
                  {/* فلترة المحافظة */}
                  <div className="mb-6">
                    <h4 className="text-gray-900 font-medium mb-3">المحافظة</h4>
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
                  <div className="mb-6">
                    <h4 className="text-gray-900 font-medium mb-3">المدينة</h4>
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

                  {/* فلترة التخصص */}
                  <div className="mb-6">
                    <h4 className="text-gray-900 font-medium mb-3">التخصص</h4>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {["all", "تصوير أفراح", "تصوير طبيعي", "تصوير فني", "تصوير تقليدي", "تصوير حديث"].map((specialty) => (
                        <button
                          key={specialty}
                          onClick={() => setActiveFilter(specialty)}
                          className={`w-full text-right px-3 py-2 rounded-lg transition-colors duration-200 ${
                            activeFilter === specialty
                              ? 'bg-blue-600 text-white'
                              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                          }`}
                        >
                          {specialty === "all" ? "كل التخصصات" : specialty}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* فلترة السعر */}
                  <div className="mb-6">
                    <h4 className="text-gray-900 font-medium mb-3">السعر: لحد {priceRange.toLocaleString()} جنيه</h4>
                    <input
                      type="range"
                      min="500"
                      max="10000"
                      step="100"
                      value={priceRange}
                      onChange={(e) => setPriceRange(parseInt(e.target.value))}
                      className="w-full mb-2"
                    />
                    <div className="flex justify-between text-gray-600 text-sm">
                      <span>500</span>
                      <span>10,000</span>
                    </div>
                  </div>

                  {/* إحصائيات */}
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">إحصائيات البحث</h4>
                    <div className="space-y-1 text-sm text-blue-700">
                      <div>المصورين المتاحين: <span className="font-bold">{filteredPhotographers.length}</span></div>
                      <div>مجموع المصورين: <span className="font-bold">{photographers.length}</span></div>
                      <div>مصدر البيانات: <span className="font-bold">{dataSource === "api" ? "قاعدة البيانات" : "..."}</span></div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* شبكة عرض المصورين */}
              <div className="lg:w-3/4 p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      المصورين المتاحين ({filteredPhotographers.length})
                    </h3>
                    <p className="text-gray-600 mt-1">
                      {dataSource === "api" 
                        ? `بيانات حقيقية من قاعدة البيانات - ${photographers.length} مصور` 
                        : "جاري تحميل البيانات..."}
                    </p>
                  </div>
                </div>

                {loading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">جاري تحميل المصورين من قاعدة البيانات...</p>
                  </div>
                ) : filteredPhotographers.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-5xl mb-4">🔍</div>
                    <h3 className="text-xl font-bold text-gray-700 mb-2">مفيش نتايج</h3>
                    <p className="text-gray-600">جرب تغيير الفلاتر عشان تظهرلك نتايج أكتر</p>
                    <button 
                      onClick={resetFilters}
                      className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      مسح الفلاتر
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredPhotographers.map((photographer) => (
                      <motion.div
                        key={photographer._id || photographer.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.02 }}
                        className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden cursor-pointer transition-all h-full flex flex-col hover:border-blue-300 hover:shadow-lg"
                        onClick={() => handlePhotographerClick(photographer)}
                      >
                        <div className="relative h-48 flex-shrink-0">
                          <img 
                            src={photographer.profileImage} 
                            alt={photographer.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                            {photographer.price.toLocaleString()} جنيه
                          </div>
                          <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded text-xs">
                            {photographer.city}
                          </div>
                          <div className="absolute bottom-4 right-4 bg-white bg-opacity-90 px-2 py-1 rounded">
                            {renderStars(photographer.rating)}
                          </div>
                        </div>
                        
                        <div className="p-4 flex-grow flex flex-col">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-lg font-bold text-gray-900">{photographer.name}</h4>
                            <span className="text-blue-600 text-sm bg-blue-50 px-2 py-1 rounded">
                              {photographer.experience} سنة
                            </span>
                          </div>
                          <p className="text-blue-600 font-medium mb-2">{photographer.specialty}</p>
                          <p className="text-gray-600 text-sm mb-3">{photographer.city}، {photographer.governorate}</p>
                          <div className="flex flex-wrap gap-1 mb-4 flex-grow">
                            {photographer.services?.slice(0, 3).map((service, index) => (
                              <span
                                key={index}
                                className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                              >
                                {service}
                              </span>
                            ))}
                            {photographer.services?.length > 3 && (
                              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                                +{photographer.services.length - 3} أكتر
                              </span>
                            )}
                          </div>
                          <div className="mt-auto flex gap-2">
                            <button 
                              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium text-sm transition-colors"
                            >
                              شوف التفاصيل
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
        </div>
      </section>
    </div>
  );
};

export default PhotographersPage;