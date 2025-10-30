import { create } from "zustand";
import axios from "axios";

// ==========================================================
// 🚨 الحل النهائي لمشكلة الـ 404 في الإنتاج (Production):
// - في وضع التطوير (development): يستخدم رابط localhost.
// - في وضع الإنتاج (production): يستخدم متغير VITE_BACKEND_URL الذي يجب
//   أن يتم ضبطه في Vercel ليحتوي على رابط Railway الكامل (مثال: https://your-app.up.railway.app).
// ==========================================================
const FINAL_API_URL = import.meta.env.MODE === "development" 
    ? "http://localhost:5000/api/auth" 
    : `${import.meta.env.VITE_BACKEND_URL}/api/auth`; 

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
            // الآن رسالة الخطأ ستكون دقيقة بعد حل مشكلة الـ 404
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