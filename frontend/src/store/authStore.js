import { create } from "zustand";
import axios from "axios";

// ====================================================================
// 🚨 الحل الأخير: تحديد رابط الـ Backend (Railway) كقيمة افتراضية في Production
// هذا يحل مشكلة الـ `/undefined/` التي ظهرت بسبب فشل Vercel في قراءة المتغير.
// إذا كان رابط Railway الخاص بك مختلفًا، استبدل الرابط أدناه.
// ====================================================================

// رابط الـ Backend الذي يعمل على Railway (يجب التأكد من هذا الرابط)
const RAILWAY_BACKEND_BASE = "https://mern-advanced-auth-master-urcm.up.railway.app";

// إذا كان الـ VITE_BACKEND_URL مُعَرَّفاً في Vercel، سنستخدمه.
// وإذا لم يكن مُعَرَّفاً (وهو ما يسبب الـ undefined)، فسنعتمد على رابط Hardcoded
const FINAL_API_BASE_URL = import.meta.env.MODE === "development" 
    ? "http://localhost:5000" 
    : (import.meta.env.VITE_BACKEND_URL || RAILWAY_BACKEND_BASE); 

const FINAL_API_URL = `${FINAL_API_BASE_URL}/api/auth`;

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    message: null,

    signup: async (email, password, name) => {
        set({ isLoading: true, error: null });
        try {
            // استخدام FINAL_API_URL المضمون
            const response = await axios.post(`${FINAL_API_URL}/signup`, { email, password, name });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error signing up", isLoading: false });
            throw error;
        }
    },

    login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            // استخدام FINAL_API_URL المضمون
            const response = await axios.post(`${FINAL_API_URL}/login`, { email, password });
            set({
                isAuthenticated: true,
                user: response.data.user,
                error: null,
                isLoading: false,
            });
        } catch (error) {
            // الآن ستكون رسالة الخطأ دقيقة (CORS أو Logic) وليس 404
            set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
            throw error;
        }
    },

    logout: async () => {
        set({ isLoading: true, error: null });
        try {
            // استخدام FINAL_API_URL المضمون
            await axios.post(`${FINAL_API_URL}/logout`);
            set({ user: null, isAuthenticated: false, error: null, isLoading: false });
        } catch (error) {
            set({ error: "Error logging out", isLoading: false });
            throw error;
        }
    },

    verifyEmail: async (code) => {
        set({ isLoading: true, error: null });
        try {
            // استخدام FINAL_API_URL المضمون
            const response = await axios.post(`${FINAL_API_URL}/verify-email`, { code });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });
            return response.data;
        } catch (error) {
            set({ error: error.response?.data?.message || "Error verifying email", isLoading: false });
            throw error;
        }
    },

    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });
        try {
            // استخدام FINAL_API_URL المضمون
            const response = await axios.get(`${FINAL_API_URL}/check-auth`);
            set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
        } catch (error) {
            set({ error: null, isCheckingAuth: false, isAuthenticated: false });
        }
    },

    forgotPassword: async (email) => {
        set({ isLoading: true, error: null });
        try {
            // استخدام FINAL_API_URL المضمون
            const response = await axios.post(`${FINAL_API_URL}/forgot-password`, { email });
            set({ message: response.data.message, isLoading: false });
        } catch (error) {
            set({
                isLoading: false,
                error: error.response?.data?.message || "Error sending reset password email",
            });
            throw error;
        }
    },

    resetPassword: async (token, password) => {
        set({ isLoading: true, error: null });
        try {
            // استخدام FINAL_API_URL المضمون
            const response = await axios.post(`${FINAL_API_URL}/reset-password/${token}`, { password });
            set({ message: response.data.message, isLoading: false });
        } catch (error) {
            set({
                isLoading: false,
                error: error.response?.data?.message || "Error resetting password",
            });
            throw error;
        }
    },
}));