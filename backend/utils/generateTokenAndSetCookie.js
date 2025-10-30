import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "15d",
    });

    // 🚨 التعديل الحاسم ليعمل في Production بين النطاقات المختلفة (Vercel و Railway)
    const isProduction = process.env.NODE_ENV === "production";
    
    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
        httpOnly: true, // يمنع الوصول إليه عبر JavaScript
        
        // 🚨 يجب أن تكون SameSite=None ليتيح تبادل الكوكيز بين النطاقات
        sameSite: isProduction ? "None" : "Lax", 
        
        // 🚨 يجب أن تكون Secure=true لـ SameSite=None ولأننا نستخدم HTTPS
        secure: isProduction, 
    });
};

export default generateTokenAndSetCookie;
