// controllers/admin.controller.js
import bcryptjs from "bcryptjs";
import mongoose from "mongoose";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

export const adminLogin = async (req, res) => {
  console.log("🎯 ADMIN LOGIN CALLED!");
  
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ 
      success: false, 
      message: "البريد الإلكتروني وكلمة المرور مطلوبان" 
    });
  }

  try {
    console.log("🔍 Searching for admin with email:", email);
    
    // البحث في collection الأدمن
    const db = mongoose.connection.db;
    const admin = await db.collection('admins').findOne({ 
      email: email.toLowerCase().trim() 
    });

    console.log("🔎 Admin found:", admin ? "Yes" : "No");

    if (!admin) {
      console.log("❌ No admin found with this email");
      return res.status(400).json({ 
        success: false, 
        message: "بيانات الدخول غير صحيحة" 
      });
    }

    console.log("✅ Admin found, checking password...");

    const isPasswordValid = await bcryptjs.compare(password, admin.password);
    console.log("🔐 Password valid:", isPasswordValid);

    if (!isPasswordValid) {
      console.log("❌ Password is invalid");
      return res.status(400).json({ 
        success: false, 
        message: "بيانات الدخول غير صحيحة" 
      });
    }

    console.log("🎉 Admin login successful!");

    // إنشاء التوكن
    const token = generateTokenAndSetCookie(res, admin._id, "admin");
    console.log("🔐 Token generated");

    // تحديث lastLogin
    await db.collection('admins').updateOne(
      { _id: admin._id },
      { $set: { lastLogin: new Date() } }
    );

    // ⬇️⬇️⬇️ التعديل المهم هنا - نتأكد إن الـ response فيها role
    const userResponse = {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: 'admin', // ⬅️ نضيف role يدوي علشان نتأكد
      permissions: admin.permissions || ['users', 'bookings', 'venues'],
      isVerified: true // ⬅️ الأدمن دايماً مفعل
    };

    console.log("📤 Sending user response:", userResponse);

    res.status(200).json({
      success: true,
      message: "تم تسجيل الدخول بنجاح",
      user: userResponse
    });

  } catch (error) {
    console.log("💥 Error in adminLogin:", error);
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
};