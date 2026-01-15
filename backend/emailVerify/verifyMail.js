import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import handlebars from "handlebars";
import sgMail from "@sendgrid/mail";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Set SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const verifyMail = async (token, email) => {
  try {
    // 1️⃣ Read email template
    const emailTemplateSource = fs.readFileSync(
      path.join(__dirname, "template.hbs"),
      "utf-8"
    );

    // 2️⃣ Compile template
    const template = handlebars.compile(emailTemplateSource);
    const htmlToSend = template({
      verifyUrl: `${process.env.FRONTEND_URL}/verify/${encodeURIComponent(token)}`
    });


    // 3️⃣ SendGrid message
    const msg = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: "Email Verification",
      html: htmlToSend,
    };

    // 4️⃣ Send email
    await sgMail.send(msg);

    console.log("✅ Verification email sent via SendGrid");
  } catch (error) {
    console.error(
      "❌ SendGrid email error:",
      error.response?.body || error.message
    );
    throw error;
  }
};
