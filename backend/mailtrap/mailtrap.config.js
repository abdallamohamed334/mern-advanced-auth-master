import { Resend } from "resend";

// ضع هنا مفتاح API الحقيقي الخاص بك من Resend Dashboard
const resend = new Resend("re_3Z7zDfvW_AdeHYec2b1CozA2dgjpDXhCr");

// المرسل (يفضل أن يكون دومين مفعل في Resend)
const sender = "onboarding@resend.dev";

// المستلم
const recipients = ["tallaey445@gmail.com"];

// دالة لإرسال البريد
const sendTestMail = async () => {
  try {
    const result = await resend.emails.send({
      from: sender,
      to: recipients,
      subject: "You are awesome!",
      html: `
        <p>Congrats 🎉</p>
        <p>This email was sent successfully using <strong>Resend API</strong>.</p>
      `,
    });

    console.log("✅ Email sent successfully:", result);
  } catch (error) {
    console.error("❌ Error sending mail:", error.message || error);
  }
};

// نفذ الدالة
sendTestMail();
