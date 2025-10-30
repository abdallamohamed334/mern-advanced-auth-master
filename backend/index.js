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
// ملاحظة: يجب أن يحتوي CLIENT_URL على رابط Vercel العام
const CLIENT_ORIGIN = process.env.CLIENT_URL || "https://mern-advanced-auth-master-urcm.vercel.app";

// ==========================================================
// 2. إعداد CORS بشكل دقيق
// ==========================================================
const corsOptions = { 
    origin: CLIENT_ORIGIN, 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'],
};

// 🚨 الخطوة 2أ: تطبيق الـ CORS Middleware على جميع الطلبات
app.use(cors(corsOptions)); 

// 🚨 الخطوة 2ب: المعالج اليدوي لـ OPTIONS (يضمن الرد 204)
app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', CLIENT_ORIGIN); 
    res.sendStatus(204); 
}); 

// ==========================================================
// 🚨🚨 الحل الجذري لضمان الـ CORS على استجابة الـ POST
// إضافة الهيدرات يدوياً في كل استجابة لضمان السماح بالكوكيز
// ==========================================================
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', CLIENT_ORIGIN);
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

// يجب أن يأتي express.json و cookieParser بعد CORS
app.use(express.json()); // يسمح بقراءة req.body
app.use(cookieParser()); // يسمح بقراءة الكوكيز

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/wedding-venues", weddingVenuesRoutes); 
app.use("/api/photographers", photographersRoutes); 
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
