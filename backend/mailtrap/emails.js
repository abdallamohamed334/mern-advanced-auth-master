import { Resend } from "resend";
import dotenv from "dotenv";
import {
	PASSWORD_RESET_REQUEST_TEMPLATE,
	PASSWORD_RESET_SUCCESS_TEMPLATE,
	VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";

dotenv.config();

// ✅ استخدم التوكن من متغير البيئة أو ضع المفتاح مباشرة هنا
const resend = new Resend(process.env.RESEND_API_KEY || "re_3Z7zDfvW_AdeHYec2b1CozA2dgjpDXhCr");

// البريد المرسل منه (يفضل دومين تم التحقق منه في Resend)
const sender = "onboarding@resend.dev";

/**
 * إرسال إيميل التفعيل (Verification)
 */
export const sendVerificationEmail = async (email, verificationToken) => {
	try {
		const response = await resend.emails.send({
			from: sender,
			to: email,
			subject: "Verify your email",
			html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
		});

		console.log("✅ Verification email sent:", response);
	} catch (error) {
		console.error("❌ Error sending verification email:", error.message || error);
		throw new Error(`Error sending verification email: ${error.message}`);
	}
};

/**
 * إرسال إيميل الترحيب (Welcome)
 */
export const sendWelcomeEmail = async (email, name) => {
	try {
		const html = `
      <h2>Welcome, ${name} 👋</h2>
      <p>Thanks for joining <b>Auth Company</b>!</p>
    `;

		const response = await resend.emails.send({
			from: sender,
			to: email,
			subject: "Welcome to Auth Company",
			html,
		});

		console.log("✅ Welcome email sent:", response);
	} catch (error) {
		console.error("❌ Error sending welcome email:", error.message || error);
		throw new Error(`Error sending welcome email: ${error.message}`);
	}
};

/**
 * إرسال رابط إعادة تعيين كلمة المرور
 */
export const sendPasswordResetEmail = async (email, resetURL) => {
	try {
		const html = PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL);

		const response = await resend.emails.send({
			from: sender,
			to: email,
			subject: "Reset your password",
			html,
		});

		console.log("✅ Password reset email sent:", response);
	} catch (error) {
		console.error("❌ Error sending password reset email:", error.message || error);
		throw new Error(`Error sending password reset email: ${error.message}`);
	}
};

/**
 * تأكيد نجاح إعادة تعيين كلمة المرور
 */
export const sendResetSuccessEmail = async (email) => {
	try {
		const response = await resend.emails.send({
			from: sender,
			to: email,
			subject: "Password Reset Successful",
			html: PASSWORD_RESET_SUCCESS_TEMPLATE,
		});

		console.log("✅ Password reset success email sent:", response);
	} catch (error) {
		console.error("❌ Error sending password reset success email:", error.message || error);
		throw new Error(`Error sending password reset success email: ${error.message}`);
	}
};
