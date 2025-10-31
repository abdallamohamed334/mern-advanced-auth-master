import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import VenueMap from "../components/VenueMap"; 


const WeddingHallsPage = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");
  const [priceRange, setPriceRange] = useState(50000);
  const [selectedGovernorate, setSelectedGovernorate] = useState("all");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [currentView, setCurrentView] = useState("list");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [weddingVenues, setWeddingVenues] = useState([]);
  const [dataSource, setDataSource] = useState("");
  
  // States for booking system
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingType, setBookingType] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [smsStatus, setSmsStatus] = useState("");

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
      cities: ["كل المدن", "طنطا", "المحلة الكبرى", "زفتى", "سمنود", "بسيون", "قطور","السنطه"] 
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

  // جلب البيانات من الـ API - معدل علشان PostgreSQL
  useEffect(() => {
    const fetchWeddingVenues = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('http://localhost:5000/api/wedding-venues', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (response.ok) {
          const data = await response.json();
          
          // التعديل علشان PostgreSQL بيكون الـ id مش _id
          if (data.venues && data.venues.length > 0) {
            const venuesWithId = data.venues.map(venue => ({
              ...venue,
              _id: venue.id || venue._id // علشان نحافظ على التوافق مع الكود الحالي
            }));
            
            setWeddingVenues(venuesWithId);
            setDataSource("api");
          } else {
            throw new Error('لا توجد بيانات في الـ API');
          }
        } else {
          throw new Error(`فشل في جلب البيانات: ${response.status}`);
        }
      } catch (err) {
        setDataSource("error");
        setError(`تعذر الاتصال بالخادم: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchWeddingVenues();
  }, []);

  // فلترة الأماكن
  useEffect(() => {
    const filtered = weddingVenues.filter(venue => {
      const matchesCategory = activeFilter === "all" || venue.category === activeFilter;
      const matchesPrice = parseInt(venue.price) <= priceRange;
      const matchesGovernorate = selectedGovernorate === "all" || venue.governorate === selectedGovernorate;
      const matchesCity = selectedCity === "all" || selectedCity === "كل المدن" || venue.city === selectedCity;
      
      return matchesCategory && matchesPrice && matchesGovernorate && matchesCity;
    });
    
    setFilteredVenues(filtered);
  }, [activeFilter, priceRange, selectedGovernorate, selectedCity, weddingVenues]);

  // دالة إرسال SMS
  const sendSMSNotification = async (phoneNumber, venueName, bookingType, userName) => {
    try {
      setSmsStatus("جاري إرسال الرسالة...");
      
      const message = bookingType === "inspection" 
        ? `عزيزي ${userName}، تم استلام طلب المعاينة الخاص بك لقاعة ${venueName}. طلبك قيد المعالجة وسنتواصل معك قريباً لتأكيد الموعد. شكراً لاختيارك منصتنا - ايفنتو`
        : `عزيزي ${userName}، تم استلام طلب الحجز الخاص بك لقاعة ${venueName}. طلبك قيد المعالجة وسنتواصل معك قريباً لتأكيد التفاصيل. شكراً لاختيارك منصتنا - ايفنتو`;

      // إرسال طلب SMS للخادم
      const response = await fetch('http://localhost:5000/api/send-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: phoneNumber,
          message: message,
          type: bookingType
        })
      });

      if (response.ok) {
        const result = await response.json();
        setSmsStatus("success");
        console.log('✅ تم إرسال SMS بنجاح:', result);
        return true;
      } else {
        throw new Error('فشل في إرسال الرسالة');
      }
    } catch (error) {
      console.error('❌ خطأ في إرسال SMS:', error);
      setSmsStatus("error");
      return false;
    }
  };

  // دالة إرسال إشعار للمالك
  const sendOwnerNotification = async (venue, bookingData, userName, phoneNumber) => {
    try {
      const ownerMessage = `طلب جديد: ${bookingType === "inspection" ? "معاينة" : "حجز"}
القاعة: ${venue.name}
العميل: ${userName}
الهاتف: ${phoneNumber}
${bookingType === "inspection" ? `موعد المعاينة: ${bookingData.inspectionDate} - ${bookingData.inspectionTime}` : `تاريخ الفرح: ${bookingData.date}`}`;

      // إرسال إشعار للمالك
      await fetch('http://localhost:5000/api/notify-owner', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: venue.ownerPhone, // رقم صاحب القاعة
          message: ownerMessage,
          venueId: venue.id || venue._id // استخدم id بدل _id
        })
      });
    } catch (error) {
      console.error('❌ خطأ في إرسال إشعار المالك:', error);
    }
  };

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
    setPriceRange(50000);
  };

  const handleVenueClick = (venue) => {
    setSelectedVenue(venue);
    setCurrentView("details");
  };

  const handleBackToList = () => {
    setCurrentView("list");
    setSelectedVenue(null);
  };

  const handleGovernorateChange = (gov) => {
    setSelectedGovernorate(gov);
    setSelectedCity("all");
  };

  // وظائف نظام الحجز
  const handleBookNow = (venue) => {
    setSelectedVenue(venue);
    setShowBookingModal(true);
    setBookingType("");
    setBookingSuccess(false);
    setSmsStatus("");
  };

  const closeBookingModal = () => {
    setShowBookingModal(false);
    setBookingType("");
    setBookingSuccess(false);
    setSmsStatus("");
  };

  // دالة الحجز - معدلة علشان PostgreSQL
  const handleBookingSubmit = async (bookingData) => {
    setBookingLoading(true);
    setSmsStatus("");
    
    try {
      // 1. أولاً إرسال SMS للعميل
      const smsSent = await sendSMSNotification(
        bookingData.phone,
        selectedVenue.name,
        bookingType,
        user?.name || bookingData.name || 'عميلنا الكريم'
      );

      if (!smsSent) {
        throw new Error('فشل في إرسال الرسالة النصية');
      }

      // 2. إرسال إشعار للمالك
      await sendOwnerNotification(selectedVenue, bookingData, user?.name || 'عميل', bookingData.phone);

      // 3. حفظ بيانات الحجز في قاعدة البيانات - التعديل علشان PostgreSQL
      const bookingResponse = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          venueId: selectedVenue.id || selectedVenue._id, // استخدم id بدل _id
          venueName: selectedVenue.name,
          type: bookingType,
          userName: user?.name || bookingData.name,
          userPhone: bookingData.phone,
          userEmail: bookingData.email,
          date: bookingType === "direct" ? bookingData.date : bookingData.inspectionDate,
          time: bookingType === "direct" ? bookingData.time : bookingData.inspectionTime,
          guests: bookingData.guests,
          notes: bookingData.notes,
          status: 'pending'
        })
      });

      if (!bookingResponse.ok) {
        throw new Error('فشل في حفظ بيانات الحجز');
      }

      setBookingSuccess(true);
      
      // رسائل نجاح مختلفة حسب نوع الحجز
      if (bookingType === "direct") {
        alert('🎉 تم إرسال طلب الحجز بنجاح! تم إرسال رسالة تأكيد لهاتفك. سنتواصل معك قريباً لتأكيد التفاصيل.');
      } else {
        alert('🔍 تم إرسال طلب المعاينة بنجاح! تم إرسال رسالة تأكيد لهاتفك. طلبك قيد المعالجة وسنتواصل معك قريباً.');
      }
      
      // إغلاق المودال بعد 3 ثواني
      setTimeout(() => {
        closeBookingModal();
      }, 3000);
      
    } catch (err) {
      console.error('خطأ في الحجز:', err);
      alert('❌ حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.');
    } finally {
      setBookingLoading(false);
    }
  };

  // مودال اختيار نوع الحجز
  const BookingTypeModal = () => {
    if (!showBookingModal || !selectedVenue) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl max-w-md w-full mx-auto"
        >
          {!bookingType ? (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">اختر نوع الحجز</h3>
                <button
                  onClick={closeBookingModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div 
                  onClick={() => setBookingType("direct")}
                  className="border-2 border-green-200 rounded-xl p-4 cursor-pointer hover:border-green-400 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                      <span className="text-2xl">🎉</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">حجز مباشر</h4>
                      <p className="text-sm text-gray-600">احجز القاعة مباشرة للفرح</p>
                    </div>
                  </div>
                </div>

                <div 
                  onClick={() => setBookingType("inspection")}
                  className="border-2 border-blue-200 rounded-xl p-4 cursor-pointer hover:border-blue-400 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <span className="text-2xl">🔍</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">طلب معاينة</h4>
                      <p className="text-sm text-gray-600">اطلب معاينة القاعة قبل الحجز + تأكيد برسالة SMS</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">معلومات القاعة</h4>
                <p className="text-sm text-gray-600">{selectedVenue.name}</p>
                <p className="text-sm text-gray-600">{selectedVenue.city}، {selectedVenue.governorate}</p>
                <p className="text-sm font-semibold text-purple-600">
                  {parseInt(selectedVenue.price)?.toLocaleString()} جنيه
                </p>
              </div>
            </div>
          ) : (
            <BookingForm 
              type={bookingType}
              venue={selectedVenue}
              onSubmit={handleBookingSubmit}
              onBack={() => setBookingType("")}
              loading={bookingLoading}
              success={bookingSuccess}
              smsStatus={smsStatus}
            />
          )}
        </motion.div>
      </div>
    );
  };

  // نموذج الحجز
  const BookingForm = ({ type, venue, onSubmit, onBack, loading, success, smsStatus }) => {
    const [formData, setFormData] = useState({
      date: '',
      time: '',
      guests: 1,
      inspectionDate: '',
      inspectionTime: '',
      notes: '',
      phone: '',
      email: user?.email || '',
      name: user?.name || ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formData);
    };

    if (success) {
      return (
        <div className="p-6 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">تم إرسال الطلب بنجاح!</h3>
          <p className="text-gray-600 mb-4">
            {type === "direct" 
              ? "تم إرسال طلب الحجز بنجاح وسنتواصل معك قريباً" 
              : "تم إرسال طلب المعاينة بنجاح وسنتواصل معك لتأكيد الموعد"}
          </p>
          
          {/* رسالة SMS */}
          <div className="bg-green-50 p-4 rounded-lg mb-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span className="text-green-800 font-medium">تم إرسال رسالة تأكيد إلى هاتفك</span>
            </div>
            <p className="text-sm text-green-700">
              {type === "inspection" 
                ? "طلبك قيد المعالجة وسنتواصل معك قريباً لتأكيد موعد المعاينة"
                : "طلبك قيد المعالجة وسنتواصل معك قريباً لتأكيد تفاصيل الحجز"}
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              {type === "direct" ? "حجز القاعة" : "طلب معاينة"}
            </h3>
            <p className="text-sm text-gray-600">{venue.name}</p>
          </div>
          <button
            onClick={onBack}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
        </div>

        {/* حالة إرسال SMS */}
        {smsStatus && (
          <div className={`p-3 rounded-lg mb-4 ${
            smsStatus === "success" ? "bg-green-50 text-green-700" : 
            smsStatus === "error" ? "bg-red-50 text-red-700" : 
            "bg-blue-50 text-blue-700"
          }`}>
            <div className="flex items-center gap-2">
              {smsStatus === "success" ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : smsStatus === "error" ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              ) : (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              )}
              <span className="text-sm">
                {smsStatus === "success" ? "تم إرسال الرسالة بنجاح" :
                 smsStatus === "error" ? "فشل في إرسال الرسالة" :
                 "جاري إرسال الرسالة..."}
              </span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* بيانات التواصل */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل *</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                placeholder="أدخل اسمك الكامل"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف *</label>
              <input 
                type="tel" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                placeholder="01XXXXXXXXX"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني *</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          {type === "direct" ? (
            <>
              {/* نموذج الحجز المباشر */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">تاريخ الفرح *</label>
                <input 
                  type="date" 
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">مدة الفرح *</label>
                <select 
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">اختر المدة</option>
                  <option value="4 ساعات (6:00 مساءً - 10:00 مساءً)">4 ساعات (6:00 مساءً - 10:00 مساءً)</option>
                  <option value="6 ساعات (6:00 مساءً - 12:00 منتصف الليل)">6 ساعات (6:00 مساءً - 12:00 منتصف الليل)</option>
                  <option value="8 ساعات (6:00 مساءً - 2:00 صباحاً)">8 ساعات (6:00 مساءً - 2:00 صباحاً)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">عدد المدعوين *</label>
                <input 
                  type="number" 
                  min="1"
                  max={venue.capacity}
                  value={formData.guests}
                  onChange={(e) => setFormData({...formData, guests: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">السعة القصوى: {venue.capacity} شخص</p>
              </div>
            </>
          ) : (
            <>
              {/* نموذج طلب المعاينة */}
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <div className="flex items-center gap-2 text-blue-800">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">سيتم إرسال رسالة تأكيد إلى هاتفك بعد تقديم الطلب</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">تاريخ المعاينة *</label>
                  <input 
                    type="date" 
                    value={formData.inspectionDate}
                    onChange={(e) => setFormData({...formData, inspectionDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الوقت *</label>
                  <select 
                    value={formData.inspectionTime}
                    onChange={(e) => setFormData({...formData, inspectionTime: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">اختر الوقت</option>
                    <option value="9:00 صباحاً - 12:00 ظهراً">9:00 صباحاً - 12:00 ظهراً</option>
                    <option value="12:00 ظهراً - 3:00 عصراً">12:00 ظهراً - 3:00 عصراً</option>
                    <option value="3:00 عصراً - 6:00 مساءً">3:00 عصراً - 6:00 مساءً</option>
                    <option value="6:00 مساءً - 9:00 مساءً">6:00 مساءً - 9:00 مساءً</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {/* ملاحظات إضافية */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ملاحظات إضافية</label>
            <textarea 
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="أي متطلبات أو استفسارات إضافية..."
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors disabled:bg-gray-400 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                جاري الإرسال...
              </>
            ) : (
              <>
                <span>{type === "direct" ? 'تأكيد الحجز' : 'إرسال طلب المعاينة'}</span>
                <span>{type === "direct" ? '🎉' : '🔍'}</span>
              </>
            )}
          </button>
        </form>
      </div>
    );
  };

  // صفحة تفاصيل القاعة مع السلايدر
  const VenueDetails = ({ venue }) => {
    const [selectedImage, setSelectedImage] = useState(0);
    const [autoSlide, setAutoSlide] = useState(true);

    // Auto slide functionality
    useEffect(() => {
      if (!autoSlide || !venue.images || venue.images.length <= 1) return;

      const interval = setInterval(() => {
        setSelectedImage((prev) => 
          prev === venue.images.length - 1 ? 0 : prev + 1
        );
      }, 5000);

      return () => clearInterval(interval);
    }, [autoSlide, venue.images]);

    const nextImage = () => {
      if (venue.images && venue.images.length > 0) {
        setSelectedImage(prev => 
          prev === venue.images.length - 1 ? 0 : prev + 1
        );
      }
    };

    const prevImage = () => {
      if (venue.images && venue.images.length > 0) {
        setSelectedImage(prev => 
          prev === 0 ? venue.images.length - 1 : prev - 1
        );
      }
    };

    if (!venue) {
      return (
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="text-5xl mb-4">😕</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">القاعة غير موجودة</h1>
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

    const images = venue.images || [venue.image];
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
              <h1 className="text-2xl font-bold text-gray-900">تفاصيل القاعة</h1>
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
                  alt={venue.name}
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
                          alt={`${venue.name} ${index + 1}`}
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
              {/* Thumbnails Grid for small screens */}
              {!hasMultipleImages && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="rounded-lg overflow-hidden h-32 bg-gray-100">
                    <img 
                      src={venue.image} 
                      alt={venue.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400";
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Quick Info */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {parseInt(venue.price)?.toLocaleString() || venue.price} جنيه
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>السعة:</span>
                    <span className="font-medium">{venue.capacity} شخص</span>
                  </div>
                  <div className="flex justify-between">
                    <span>المكان:</span>
                    <span className="font-medium">{venue.city}، {venue.governorate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>التقييم:</span>
                    <span className="font-medium">{renderStars(venue.rating)}</span>
                  </div>
                  {hasMultipleImages && (
                    <div className="flex justify-between">
                      <span>عدد الصور:</span>
                      <span className="font-medium">{images.length} صورة</span>
                    </div>
                  )}
                </div>
                <button 
                  onClick={() => handleBookNow(venue)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold mt-4 transition-colors disabled:bg-gray-400"
                  disabled={!venue.available}
                >
                  {venue.available ? 'احجز دلوقتي' : 'غير متاحة حالياً'}
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
                
                {/* Wedding Specific Features */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">مميزات خاصة بالأفراح</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${venue.weddingSpecific?.brideRoom ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <span className="text-gray-700">غرفة العروسة</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${venue.weddingSpecific?.photography ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <span className="text-gray-700">خدمة التصوير</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${venue.weddingSpecific?.catering ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <span className="text-gray-700">خدمة الأكل</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${venue.weddingSpecific?.decoration ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <span className="text-gray-700">الديكور</span>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">المميزات العامة</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {venue.features?.map((feature, index) => (
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
                    {venue.amenities?.map((amenity, index) => (
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
                    {venue.rules?.map((rule, index) => (
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
                      <div className="text-sm text-gray-500">التليفون</div>
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
                      <div className="text-sm text-gray-500">الإيميل</div>
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
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      <span className="mr-2">📍</span>
                          موقع القاعة على الخريطة
                    </h3>
                    <VenueMap 
                      venue={venue}
                      governorate={venue.governorate}
                      city={venue.city}
                    />
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-700 flex items-start gap-2">
                        <span className="text-blue-500 mt-0.5">💡</span>
                        <span>
                          <strong>نصيحة:</strong> استخدم الخريطة لتحديد موقع القاعة بدقة وتخطيط أفضل للوصول إلى حفل زفافك
                        </span>
                      </p>
                    </div>
                  </div>

              {/* Booking Button */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">الحجز</h3>
                <button 
                  onClick={() => handleBookNow(venue)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg font-semibold text-lg transition-colors disabled:bg-gray-400 flex items-center justify-center gap-2"
                  disabled={!venue.available}
                >
                  {venue.available ? (
                    <>
                      <span>احجز الآن</span>
                      <span>🎉</span>
                    </>
                  ) : (
                    'غير متاحة حالياً'
                  )}
                </button>
                <p className="text-sm text-gray-600 text-center mt-3">
                  اختر بين الحجز المباشر أو طلب معاينة
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render based on current view
  if (currentView === "details" && selectedVenue) {
    return (
      <>
        <VenueDetails venue={selectedVenue} />
        <BookingTypeModal />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 w-full">
      {/* Navigation */}
      <nav className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50 w-full">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-purple-600">قاعات الأفراح في مصر</h1>
            </div>
            
            <div className="hidden md:flex space-x-8">
              <button 
                onClick={handleBackToHome}
                className="text-gray-600 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                الصفحة الرئيسية
              </button>
            </div>

            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <div className="hidden md:flex items-center space-x-3 bg-purple-50 px-4 py-2 rounded-lg">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-600">{user.email}</p>
                    </div>
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
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
                    className="text-gray-600 hover:text-purple-600 text-sm font-medium"
                  >
                    تسجيل الدخول
                  </button>
                  <button 
                    onClick={() => navigate('/signup')}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
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
      <section className="relative w-full py-20 lg:py-32 bg-gradient-to-r from-purple-600 to-pink-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            قاعات الأفراح في مصر
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
          >
            اكتشف أفضل قاعات الأفراح في كل محافظات مصر
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            onClick={() => document.getElementById('venues-section').scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
          >
            شوف القاعات
          </motion.button>
        </div>
      </section>

      {/* فلترة وعرض الأماكن */}
      <section id="venues-section" className="py-12 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* رسالة مصدر البيانات */}
          {dataSource === "api" && weddingVenues.length > 0 && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="text-green-600 mr-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-green-800 font-medium">✅  قاعاتك الان متاحه</p>
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
                    <h3 className='text-xl font-semibold text-purple-600'>فلاتر البحث</h3>
                    <button 
                      onClick={resetFilters}
                      className="text-sm text-purple-600 hover:text-purple-700"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    >
                      {governorates[selectedGovernorate]?.cities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* فلترة النوع */}
                  <div className="mb-6">
                    <h4 className="text-gray-900 font-medium mb-3">نوع القاعة</h4>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {["all", "فاخرة", "طبيعية", "كلاسيكية", "عصرية", "اقتصادية"].map((category) => (
                        <button
                          key={category}
                          onClick={() => setActiveFilter(category)}
                          className={`w-full text-right px-3 py-2 rounded-lg transition-colors duration-200 ${
                            activeFilter === category
                              ? 'bg-purple-600 text-white'
                              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                          }`}
                        >
                          {category === "all" ? "كل الأنواع" : category}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* فلترة السعر */}
                  <div className="mb-6">
                    <h4 className="text-gray-900 font-medium mb-3">السعر: لحد {priceRange.toLocaleString()} جنيه</h4>
                    <input
                      type="range"
                      min="1000"
                      max="50000"
                      step="1000"
                      value={priceRange}
                      onChange={(e) => setPriceRange(parseInt(e.target.value))}
                      className="w-full mb-2"
                    />
                    <div className="flex justify-between text-gray-600 text-sm">
                      <span>1,000</span>
                      <span>50,000</span>
                    </div>
                  </div>

                  {/* إحصائيات */}
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-medium text-purple-800 mb-2">إحصائيات البحث</h4>
                    <div className="space-y-1 text-sm text-purple-700">
                      <div>القاعات المتاحة: <span className="font-bold">{filteredVenues.length}</span></div>
                      <div>مجموع القاعات: <span className="font-bold">{weddingVenues.length}</span></div>
                      <div>مصدر البيانات: <span className="font-bold">{dataSource === "api" ? "قاعدة البيانات" : "..."}</span></div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* شبكة عرض الأماكن */}
              <div className="lg:w-3/4 p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      قاعات الأفراح المتاحة ({filteredVenues.length})
                    </h3>
                    <p className="text-gray-600 mt-1">
                      {dataSource === "api" 
                        ? `بيانات حقيقية من قاعدة البيانات - ${weddingVenues.length} قاعة` 
                        : "جاري تحميل البيانات..."}
                    </p>
                  </div>
                </div>

                {loading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">جاري تحميل القاعات من قاعدة البيانات...</p>
                  </div>
                ) : filteredVenues.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-5xl mb-4">🔍</div>
                    <h3 className="text-xl font-bold text-gray-700 mb-2">مفيش نتايج</h3>
                    <p className="text-gray-600">جرب تغيير الفلاتر عشان تظهرلك نتايج أكتر</p>
                    <button 
                      onClick={resetFilters}
                      className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      مسح الفلاتر
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredVenues.map((venue) => (
                      <motion.div
                        key={venue.id || venue._id} // استخدم id بدل _id
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.02 }}
                        className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden cursor-pointer transition-all h-full flex flex-col hover:border-purple-300 hover:shadow-lg"
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
                                مش متاحة
                              </span>
                            </div>
                          )}
                          <div className="absolute top-4 left-4 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                            {parseInt(venue.price)?.toLocaleString()} جنيه
                          </div>
                          <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded text-xs">
                            {venue.city}
                          </div>
                          <div className="absolute bottom-4 right-4 bg-white bg-opacity-90 px-2 py-1 rounded">
                            {renderStars(venue.rating)}
                          </div>
                        </div>
                        
                        <div className="p-4 flex-grow flex flex-col">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-lg font-bold text-gray-900">{venue.name}</h4>
                            <span className="text-purple-600 text-sm bg-purple-50 px-2 py-1 rounded">
                              {venue.capacity} شخص
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-3">{venue.city}، {venue.governorate}</p>
                          <div className="flex flex-wrap gap-1 mb-4 flex-grow">
                            {venue.features?.slice(0, 3).map((feature, index) => (
                              <span
                                key={index}
                                className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                              >
                                {feature}
                              </span>
                            ))}
                            {venue.features?.length > 3 && (
                              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                                +{venue.features.length - 3} أكتر
                              </span>
                            )}
                          </div>
                          <div className="mt-auto flex gap-2">
                            <button 
                              onClick={() => handleVenueClick(venue)}
                              className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors"
                            >
                              شوف التفاصيل
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleBookNow(venue);
                              }}
                              disabled={!venue.available}
                              className={`flex-1 py-2 rounded-lg font-medium text-sm transition-colors ${
                                venue.available 
                                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              }`}
                            >
                              احجز الآن
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

      {/* Booking Modal */}
      <BookingTypeModal />
    </div>
  );
};

export default WeddingHallsPage;