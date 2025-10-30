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
// **تفعيل الـ Proxy علشان الكوكيز تشتغل صح على السيرفرات السحابية**
app.set("trust proxy", 1); 

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// ==========================================================
// 🚨 تحديد الـ Origin لضمان قبول الكوكيز
// ==========================================================
// يجب استخدام رابط Vercel العام هنا، وليس رابط Railway الداخلي
const CLIENT_ORIGIN = process.env.CLIENT_URL || "https://mern-advanced-auth-master-urcm.vercel.app";

const corsOptions = { 
    origin: CLIENT_ORIGIN, 
    credentials: true 
};

// 1. تفعيل CORS بشكل عام
app.use(cors(corsOptions));

// 2. التعامل الصريح مع طلبات OPTIONS لتفادي 502/404 على Preflight
// يجب وضع هذا الكود بعد app.use(cors)
app.options('*', (req, res) => {
    // التأكيد على الهيدرات المطلوبة لنجاح طلبات ما قبل الرحلة
    res.header('Access-Control-Allow-Origin', CLIENT_ORIGIN);
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    // إرسال 204 (نجاح بدون محتوى) لإنهاء فحص OPTIONS
    res.sendStatus(204); 
});

app.use(express.json()); // allows us to parse incoming requests:req.body
app.use(cookieParser()); // allows us to parse incoming cookies

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
