// pages/LoginPage.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader, User, Star, CheckCircle, Calendar, Users } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { useAuthStore } from "../store/authStore";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	// ⬇️⬇️⬇️ التعديل هنا - إضافة loginAdmin
	const { login, loginAdmin, isLoading, error, clearMessages } = useAuthStore();

	const handleLogin = async (e) => {
		e.preventDefault();
		clearMessages(); // مسح الأخطاء السابقة
		
		console.log("🟢 بدء عملية تسجيل الدخول...");
		console.log("📧 الإيميل:", email);
		console.log("🔑 الباسورد:", password);
		
		try {
			// ⬇️⬇️⬇️ المحاولة الأولى: تسجيل دخول كأدمن
			console.log("👑 محاولة تسجيل الدخول كأدمن...");
			try {
				const isAdmin = await loginAdmin(email, password);
				console.log("✅ نتيجة تسجيل دخول الأدمن:", isAdmin);
				
				if (isAdmin) {
					console.log("🚀 تم تسجيل دخول الأدمن بنجاح، التوجيه إلى لوحة التحكم...");
					navigate('/admin/dashboard');
					return; // توقف هنا علشان ميكملش
				}
			} catch (adminError) {
				console.log("❌ فشل تسجيل دخول الأدمن، جاري تجربة المستخدم العادي...");
			}

			// ⬇️⬇️⬇️ المحاولة الثانية: تسجيل دخول كمستخدم عادي
			console.log("👤 محاولة تسجيل الدخول كمستخدم عادي...");
			const isUserAdmin = await login(email, password);
			console.log("✅ نتيجة تسجيل دخول المستخدم:", isUserAdmin);
			
			if (isUserAdmin) {
				console.log("🎯 المستخدم العادي له صلاحيات أدمن، التوجيه إلى لوحة التحكم...");
				navigate('/admin/dashboard');
			} else {
				console.log("🏠 المستخدم عادي، التوجيه إلى الصفحة الرئيسية...");
				navigate('/');
			}

		} catch (error) {
			console.error('💥 فشلت جميع محاولات تسجيل الدخول:', error);
		}
	};

	// Features list
	const features = [
		{
			icon: <Calendar className="w-6 h-6" />,
			title: "سهولة الحجز",
			description: "احجز أفضل الأماكن في خطوات بسيطة"
		},
		{
			icon: <Star className="w-6 h-6" />,
			title: "تقييمات موثوقة",
			description: "اقرأ تجارب العملاء السابقين"
		},
		{
			icon: <Users className="w-6 h-6" />,
			title: "دعم متكامل",
			description: "فريق الدعم جاهز لمساعدتك"
		},
		{
			icon: <CheckCircle className="w-6 h-6" />,
			title: "تأكيد فوري",
			description: "احصل على تأكيد الحجز فوراً"
		}
	];

	// Testimonials
	const testimonials = [
		{
			name: "أحمد محمد",
			role: "عميل سعيد",
			comment: "أفضل منصة لحجز القاعات، جربتها لحفل زفافي وكانت رائعة!",
			rating: 5
		},
		{
			name: "فاطمة علي",
			role: "مديرة فعاليات",
			comment: "توفير الوقت والجهد في البحث عن الأماكن المناسبة",
			rating: 5
		}
	];

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
			{/* Navigation Bar */}
			<nav className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						<div className="flex-shrink-0">
							<Link to="/" className="text-2xl font-bold text-blue-600">
								منصة الحجوزات
							</Link>
						</div>
						<div className="hidden md:flex space-x-8">
							<Link to="/" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
								الرئيسية
							</Link>
							<Link to="/about" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
								عن المنصة
							</Link>
							<Link to="/contact" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
								اتصل بنا
							</Link>
						</div>
						<div className="flex items-center space-x-4">
							<Link 
								to="/signup" 
								className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
							>
								إنشاء حساب
							</Link>
						</div>
					</div>
				</div>
			</nav>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					{/* Left Side - Content */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8 }}
						className="space-y-8"
					>
						{/* Main Heading */}
						<div className="space-y-4">
							<h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
								اهلاً بك في{" "}
								<span className="bg-gradient-to-r from-blue-600 to-indigo-700 text-transparent bg-clip-text">
									منصة الحجوزات
								</span>
							</h1>
							<p className="text-xl text-gray-600 leading-relaxed">
								اكتشف أفضل الأماكن لحفلاتك ومناسباتك. أكثر من 500 مكان متاح في 50 مدينة سعودية.
							</p>
						</div>

						{/* Features Grid */}
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
							{features.map((feature, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: index * 0.1 + 0.5 }}
									className="flex items-start space-x-3 space-x-reverse p-4 bg-white rounded-xl shadow-sm border border-gray-100"
								>
									<div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
										{feature.icon}
									</div>
									<div>
										<h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
										<p className="text-sm text-gray-600">{feature.description}</p>
									</div>
								</motion.div>
							))}
						</div>

						{/* Testimonials */}
						<div className="space-y-4">
							<h3 className="text-2xl font-bold text-gray-900">ماذا يقول عملاؤنا؟</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{testimonials.map((testimonial, index) => (
									<motion.div
										key={index}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: index * 0.2 + 0.8 }}
										className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
									>
										<div className="flex items-center mb-3">
											{[...Array(testimonial.rating)].map((_, i) => (
												<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
											))}
										</div>
										<p className="text-gray-700 mb-3">"{testimonial.comment}"</p>
										<div>
											<p className="font-semibold text-gray-900">{testimonial.name}</p>
											<p className="text-sm text-gray-600">{testimonial.role}</p>
										</div>
									</motion.div>
								))}
							</div>
						</div>

						{/* Stats */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 1.2 }}
							className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-200"
						>
							<div className="text-center">
								<div className="text-2xl font-bold text-blue-600">500+</div>
								<div className="text-sm text-gray-600">مكان متاح</div>
							</div>
							<div className="text-center">
								<div className="text-2xl font-bold text-blue-600">10K+</div>
								<div className="text-sm text-gray-600">عميل راضي</div>
							</div>
							<div className="text-center">
								<div className="text-2xl font-bold text-blue-600">50+</div>
								<div className="text-sm text-gray-600">مدينة</div>
							</div>
						</motion.div>
					</motion.div>

					{/* Right Side - Login Form */}
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8 }}
						className="flex justify-center lg:justify-end"
					>
						<div className="w-full max-w-md">
							<div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
								{/* Header Section */}
								<div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-center">
									<motion.h1 
										initial={{ scale: 0.9 }}
										animate={{ scale: 1 }}
										transition={{ duration: 0.5 }}
										className="text-2xl font-bold text-white mb-2"
									>
										مرحباً بعودتك
									</motion.h1>
									<p className="text-blue-100 text-sm">
										سجل الدخول إلى حسابك للمتابعة
									</p>
								</div>

								<div className='p-6'>
									<form onSubmit={handleLogin} className="space-y-4">
										<motion.div
											initial={{ opacity: 0, x: -20 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ delay: 0.2 }}
										>
											<Input
												icon={Mail}
												type='email'
												placeholder='البريد الإلكتروني'
												value={email}
												onChange={(e) => setEmail(e.target.value)}
												className="bg-gray-50 border-gray-200 focus:border-blue-500"
											/>
										</motion.div>

										<motion.div
											initial={{ opacity: 0, x: -20 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ delay: 0.3 }}
										>
											<Input
												icon={Lock}
												type='password'
												placeholder='كلمة المرور'
												value={password}
												onChange={(e) => setPassword(e.target.value)}
												className="bg-gray-50 border-gray-200 focus:border-blue-500"
											/>
										</motion.div>

										<div className='flex items-center justify-between'>
											<Link 
												to='/forgot-password' 
												className='text-sm text-blue-600 hover:text-blue-700 hover:underline transition-colors'
											>
												نسيت كلمة المرور؟
											</Link>
										</div>

										{error && (
											<motion.div
												initial={{ opacity: 0, scale: 0.9 }}
												animate={{ opacity: 1, scale: 1 }}
												className="bg-red-50 border border-red-200 rounded-lg p-3"
											>
												<p className='text-red-700 text-sm text-center font-medium'>{error}</p>
											</motion.div>
										)}

										<motion.div
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ delay: 0.4 }}
										>
											<motion.button
												whileHover={{ scale: 1.02 }}
												whileTap={{ scale: 0.98 }}
												className='w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold rounded-lg shadow-lg hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2'
												type='submit'
												disabled={isLoading}
											>
												{isLoading ? (
													<>
														<Loader className='w-5 h-5 animate-spin' />
														جاري تسجيل الدخول...
													</>
												) : (
													<>
														<User className="w-5 h-5" />
														تسجيل الدخول
													</>
												)}
											</motion.button>
										</motion.div>

										{/* زر لملء بيانات الأدمن تلقائياً للاختبار */}
										<div className="mt-4">
											<button 
												type="button"
												onClick={() => {
													setEmail("admin@test.com");
													setPassword("123456");
													console.log("✅ تم ملء بيانات الأدمن تلقائياً");
												}}
												className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors text-sm"
											>
												ملء بيانات الأدمن للاختبار
											</button>
										</div>
									</form>

									{/* Social Login Options */}
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ delay: 0.6 }}
										className="mt-6 pt-6 border-t border-gray-200"
									>
										<div className="text-center">
											<p className="text-gray-600 text-sm mb-4">أو سجل الدخول باستخدام</p>
											<div className="flex justify-center gap-4">
												<button className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors shadow-sm">
													<span className="text-gray-700 font-bold text-base">f</span>
												</button>
												<button className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors shadow-sm">
													<span className="text-gray-700 font-bold text-base">G</span>
												</button>
												<button className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors shadow-sm">
													<span className="text-gray-700 font-bold text-base">in</span>
												</button>
											</div>
										</div>
									</motion.div>
								</div>

								{/* Footer */}
								<div className='px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-center'>
									<p className='text-sm text-gray-600'>
										ليس لديك حساب؟{" "}
										<Link 
											to='/signup' 
											className='text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors'
										>
											إنشاء حساب جديد
										</Link>
									</p>
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			</div>

			{/* Floating Background Shapes */}
			<div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
				<div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
				<div className="absolute -bottom-20 -right-20 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
			</div>

			{/* Additional Styling for Animations */}
			<style jsx>{`
				@keyframes blob {
					0% { transform: translate(0px, 0px) scale(1); }
					33% { transform: translate(30px, -50px) scale(1.1); }
					66% { transform: translate(-20px, 20px) scale(0.9); }
					100% { transform: translate(0px, 0px) scale(1); }
				}
				.animate-blob {
					animation: blob 7s infinite;
				}
				.animation-delay-2000 {
					animation-delay: 2s;
				}
				.animation-delay-4000 {
					animation-delay: 4s;
				}
			`}</style>
		</div>
	);
};

export default LoginPage;