import sgMail from "@sendgrid/mail";
import "dotenv/config";

// Set SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendOtpMail = async (email, otp) => {
  try {
    const msg = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: "Password Reset OTP",
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Password Reset Request</h2>
          <p>Your OTP for password reset is:</p>
          <h1 style="letter-spacing: 4px;">${otp}</h1>
          <p>This OTP is valid for <b>10 minutes</b>.</p>
          <p>If you did not request this, please ignore this email.</p>
        </div>
      `,
    };

    await sgMail.send(msg);

    console.log("✅ OTP email sent via SendGrid");
  } catch (error) {
    console.error(
      "❌ SendGrid OTP mail error:",
      error.response?.body || error.message
    );
    throw error;
  }
};
