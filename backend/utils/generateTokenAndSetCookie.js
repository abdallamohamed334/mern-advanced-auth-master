import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

    res.cookie("token", token, {
        httpOnly: true,
        
        // 1.secure: لازم تكون true عشان نستخدم SameSite: None
        secure: process.env.NODE_ENV === "production", 
        
        // 2. sameSite: لازم تكون None للسماح بالاتصال بين Vercel و Railway
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return token;
};