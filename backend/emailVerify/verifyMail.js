import nodemailer from "nodemailer";
import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import handlebars from "handlebars";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
      token: encodeURIComponent(token),
    });

    // 3️⃣ SendGrid transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.sendgrid.net",
      port: 587,
      secure: false,
      auth: {
        user: "apikey",
        pass: process.env.SENDGRID_API_KEY,
      },
    });

    // 4️⃣ Mail options
    const mailConfigurations = {
      from: process.env.SENDGRID_FROM_EMAIL,
      to: email,
      subject: "Email Verification",
      html: htmlToSend,
    };

    // 5️⃣ Send mail
    const info = await transporter.sendMail(mailConfigurations);

    console.log("✅ Verification email sent");
    console.log(info.messageId);
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
    throw error;
  }
};
