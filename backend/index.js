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
// **تفعيل الـ Proxy عشان الكوكيز تشتغل صح على السيرفرات السحابية**
app.set("trust proxy", 1); 

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// ==========================================================
// تعديل الـ CORS لضمان استخدام HTTPS والـ Subdomain
// يجب استبدال الرابط أدناه برابط Vercel الثابت الخاص بك:
// ==========================================================
app.use(cors({ 
    origin: "mern-advanced-auth-master.railway.internal", 
    credentials: true 
}));

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