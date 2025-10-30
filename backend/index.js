import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import { connectDB } from "./db/connectDB.js";

import authRoutes from "./routes/auth.route.js";
import weddingVenuesRoutes from "./routes/weddingVenues.route.js";
import photographersRoutes from "./routes/photographers.route.js";
import decorationRoutes from './routes/decorations.route.js';

dotenv.config();

const app = express();
// 1. تفعيل الـ Proxy ليعمل مع الكوكيز (ضروري للـ Production)
app.set("trust proxy", 1); 

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// تحديد رابط الواجهة الأمامية (Vercel) بشكل صريح
const CLIENT_ORIGIN = process.env.CLIENT_URL || "mern-advanced-auth-master.railway.internal";

// ==========================================================
// 2. إعداد CORS بشكل دقيق
// ==========================================================
const corsOptions = { 
    // نستخدم رابط Vercel
    origin: CLIENT_ORIGIN, 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // لا نضع OPTIONS هنا
    allowedHeaders: ['Content-Type', 'Authorization'],
};

// 🚨 الخطوة 2أ: تطبيق الـ CORS Middleware على جميع الطلبات
app.use(cors(corsOptions)); 

// 🚨🚨 الخطوة الحاسمة (3): معالجة طلب OPTIONS بشكل منفصل ومضمون 🚨🚨
// هذا يضمن أن طلب الـ Preflight سيحصل على استجابة 204 (نجاح) بدلاً من 404
app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    // نستخدم هنا المتغير CLIENT_ORIGIN المضمون
    res.header('Access-Control-Allow-Origin', CLIENT_ORIGIN); 
    res.sendStatus(204); // إرسال استجابة نجاح (No Content)
}); 

// يجب أن يأتي express.json و cookieParser بعد CORS
app.use(express.json()); // يسمح بقراءة req.body
app.use(cookieParser()); // يسمح بقراءة الكوكيز

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/wedding-venues", weddingVenuesRoutes); 
app.use("/api/photographers", weddingVenuesRoutes); 
app.use("/api/decorations", decorationRoutes);

// Health check route
app.get("/api/health", (req, res) => {
    res.json({ message: "API is running successfully! 🚀" });
});

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

app.listen(PORT, () => {
    connectDB();
    console.log("Server is running on port: ", PORT);
});