import { create } from "zustand";
import axios from "axios";

// ==========================================================
// 🚨 تحديث الرابط النهائي للـ Backend
// يجب أن يكون هذا الرابط هو الرابط العامل على Railway (بدون /api/auth)
// ==========================================================
const RAILWAY_BACKEND_BASE = "https://mern-advanced-auth-master-production.up.railway.app"; 

// FINAL_API_BASE: يحدد المسار الأساسي (بدون /api/auth)
const FINAL_API_BASE = import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : RAILWAY_BACKEND_BASE; 

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
            // استخدام المسار الكامل: https://...railway.app/api/auth/signup
            const response = await axios.post(`${FINAL_API_BASE}/api/auth/signup`, { email, password, name });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error signing up", isLoading: false });
            throw error;
        }
    },
    
    login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            // استخدام المسار الكامل: https://...railway.app/api/auth/login
            const response = await axios.post(`${FINAL_API_BASE}/api/auth/login`, { email, password });
            set({
                isAuthenticated: true,
                user: response.data.user,
                error: null,
                isLoading: false,
            });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
            throw error;
        }
    },
    
    // ... باقي الدوال (يرجى التأكد من تحديثها جميعاً لاستخدام FINAL_API_BASE/api/auth/...)
    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });
        try {
            // استخدام المسار الكامل: https://...railway.app/api/auth/check-auth
            const response = await axios.get(`${FINAL_API_BASE}/api/auth/check-auth`);
            set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
        } catch (error) {
            set({ error: null, isCheckingAuth: false, isAuthenticated: false });
        }
    },
    forgotPassword: async (email) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${FINAL_API_BASE}/api/auth/forgot-password`, { email });
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
            const response = await axios.post(`${FINAL_API_BASE}/api/auth/reset-password/${token}`, { password });
            set({ message: response.data.message, isLoading: false });
        } catch (error) {
            set({
                isLoading: false,
                error: error.response?.data?.message || "Error resetting password",
            });
            throw error;
        }
    },
    logout: async () => {
        set({ isLoading: true, error: null });
        try {
            await axios.post(`${FINAL_API_BASE}/api/auth/logout`);
            set({ user: null, isAuthenticated: false, error: null, isLoading: false });
        } catch (error) {
            set({ error: "Error logging out", isLoading: false });
            throw error;
        }
    },
}));