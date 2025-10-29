import { Navigate, Route, Routes } from "react-router-dom";
import FloatingShape from "./components/FloatingShape";

import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import HomePage from "./pages/HomePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import PhotographersPage from './pages/PhotographersPage';
import LoadingSpinner from "./components/LoadingSpinner";
import WeddingHallsPage from './pages/WeddingHallsPage';
import ConferenceHallsPage from './pages/ConferenceHallsPage';
// import BirthdayPlacesPage from './pages/BirthdayPlacesPage';
// import CafesPage from './pages/CafesPage';
// import PhotographersPage from './pages/PhotographersPage'; // تأكد من استيراد هذا الملف

import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";

// حماية المسارات التي تتطلب تسجيل دخول
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  if (!user?.isVerified) {
    return <Navigate to='/verify-email' replace />;
  }

  return children;
};

// إعادة توجيه المستخدمين المسجلين بالفعل
const PublicRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user?.isVerified) {
    return <Navigate to='/' replace />;
  }

  return children;
};

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-white">
      <Routes>
        {/* الصفحة الرئيسية */}
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <HomePage/>
            </ProtectedRoute>
          }
        />
		<Route path="/photographers/:photographerId" element={<PhotographersPage />} />
		<Route
			path='/photographers'
			element={
				<ProtectedRoute>
					<PhotographersPage />
				</ProtectedRoute>
			}
			/>
        
        {/* صفحة بديلة للرئيسية */}
        <Route
          path='/homepage'
          element={
            <ProtectedRoute>
              <HomePage/>
            </ProtectedRoute>
          }
        />

        {/* صفحات أنواع القاعات */}
        <Route
          path='/wedding-halls'
          element={
            <ProtectedRoute>
              <WeddingHallsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/conference-halls'
          element={
            <ProtectedRoute>
              <ConferenceHallsPage />
            </ProtectedRoute>
          }
        />
        
        {/* صفحات أخرى (معلقة حالياً) */}
        {/* <Route
          path='/birthday-places'
          element={
            <ProtectedRoute>
              <BirthdayPlacesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/cafes'
          element={
            <ProtectedRoute>
              <CafesPage />
            </ProtectedRoute>
          }
        /> */}

        {/* صفحات المصادقة */}
        <Route
          path='/signup'
          element={
            <PublicRoute>
              <SignUpPage />
            </PublicRoute>
          }
        />
        <Route
          path='/login'
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        
        {/* صفحة التحقق من البريد الإلكتروني */}
        <Route 
          path='/verify-email' 
          element={<EmailVerificationPage />} 
        />
        
        <Route
          path='/forgot-password'
          element={
            <PublicRoute>
              <ForgotPasswordPage />
            </PublicRoute>
          }
        />
        <Route
          path='/reset-password/:token'
          element={
            <PublicRoute>
              <ResetPasswordPage />
            </PublicRoute>
          }
        />

        {/* مسار المصورين - تم إصلاحه */}
        {/* <Route
          path='/photographers'
          element={
            <ProtectedRoute>
              <PhotographersPage />
            </ProtectedRoute>
          }
        /> */}

        {/* جميع المسارات الأخرى */}
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;