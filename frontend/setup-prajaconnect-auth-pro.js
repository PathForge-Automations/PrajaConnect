import { execSync } from "child_process";
import fs from "fs";
import path from "path";

console.log("🚀 Setting up PrajaConnect bilingual secure authentication system...");

const backendPath = path.join(process.cwd(), "backend");
const srcPath = path.join(process.cwd(), "src");
const pagesPath = path.join(srcPath, "pages");
const langPath = path.join(srcPath, "lang");

// 1️⃣ Create backend folders
fs.mkdirSync(backendPath, { recursive: true });
fs.mkdirSync(path.join(backendPath, "controllers"), { recursive: true });
fs.mkdirSync(path.join(backendPath, "routes"), { recursive: true });
fs.mkdirSync(path.join(backendPath, "prisma"), { recursive: true });

// 2️⃣ Initialize backend + install dependencies
execSync(
  `cd backend && npm init -y && npm install express cors bcryptjs prisma @prisma/client jsonwebtoken nodemailer twilio dotenv`,
  { stdio: "inherit" }
);

// 3️⃣ Server.js
fs.writeFileSync(
  path.join(backendPath, "server.js"),
  `
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("✅ Backend running on port " + PORT));
`
);

// 4️⃣ Prisma schema
fs.writeFileSync(
  path.join(backendPath, "prisma", "schema.prisma"),
  `
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id           String   @id @default(uuid())
  name         String
  email        String   @unique
  phone        String   @unique
  password     String
  role         Role
  district     String?
  verified     Boolean  @default(false)
  otp          String?
  otpExpiresAt DateTime?
  createdAt    DateTime @default(now())
}

enum Role {
  CITIZEN
  COLLECTOR
  LEADERSHIP
}
`
);

// 5️⃣ Auth Controller
fs.writeFileSync(
  path.join(backendPath, "controllers", "authController.js"),
  `
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import twilio from "twilio";

const prisma = new PrismaClient();
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

// Signup
export const signup = async (req, res) => {
  try {
    const { name, email, phone, password, role, district } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.user.create({
      data: { name, email, phone, password: hashed, role, district, otp, otpExpiresAt: new Date(Date.now() + 600000) },
    });

    await client.messages.create({
      body: \`Your PrajaConnect OTP: \${otp}\`,
      from: process.env.TWILIO_PHONE,
      to: \`+91\${phone}\`,
    });

    await transporter.sendMail({
      from: \`PrajaConnect <\${process.env.SMTP_USER}>\`,
      to: email,
      subject: "Welcome to PrajaConnect",
      html: \`<p>Hi \${name},<br/>Please verify your phone number using the OTP sent to your mobile.</p>\`,
    });

    res.status(201).json({ message: "Signup successful. OTP sent!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Signup failed." });
  }
};

// Verify OTP
export const verifyOtp = async (req, res) => {
  const { phone, otp } = req.body;
  const user = await prisma.user.findUnique({ where: { phone } });
  if (!user) return res.status(404).json({ message: "User not found." });
  if (user.otp !== otp || new Date() > user.otpExpiresAt)
    return res.status(400).json({ message: "Invalid or expired OTP." });

  await prisma.user.update({ where: { phone }, data: { verified: true, otp: null, otpExpiresAt: null } });
  res.json({ message: "✅ Phone verified successfully!" });
};

// Resend OTP
export const resendOtp = async (req, res) => {
  const { phone } = req.body;
  const user = await prisma.user.findUnique({ where: { phone } });
  if (!user) return res.status(404).json({ message: "User not found." });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  await prisma.user.update({
    where: { phone },
    data: { otp, otpExpiresAt: new Date(Date.now() + 600000) },
  });

  await client.messages.create({
    body: \`Your new PrajaConnect OTP: \${otp}\`,
    from: process.env.TWILIO_PHONE,
    to: \`+91\${phone}\`,
  });

  res.json({ message: "🔄 OTP resent successfully!" });
};

// Signin
export const signin = async (req, res) => {
  const { phone, password } = req.body;
  const user = await prisma.user.findUnique({ where: { phone } });
  if (!user) return res.status(404).json({ message: "User not found." });
  if (!user.verified) return res.status(401).json({ message: "Please verify your phone first." });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: "Invalid password." });

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.json({ message: "Login successful!", token, role: user.role });
};
`
);

// 6️⃣ Routes
fs.writeFileSync(
  path.join(backendPath, "routes", "authRoutes.js"),
  `
import express from "express";
import { signup, signin, verifyOtp, resendOtp } from "../controllers/authController.js";
const router = express.Router();
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);
export default router;
`
);

// 7️⃣ Create bilingual language files
fs.mkdirSync(langPath, { recursive: true });
fs.writeFileSync(
  path.join(langPath, "en.json"),
  JSON.stringify({
    welcome: "Welcome to PrajaConnect",
    signup: "Sign Up",
    login: "Login",
    name: "Full Name",
    phone: "Phone Number",
    password: "Password",
    otp: "Enter OTP",
    resend: "Resend OTP",
    verify: "Verify",
    success: "Verification Successful!",
  }, null, 2)
);
fs.writeFileSync(
  path.join(langPath, "te.json"),
  JSON.stringify({
    welcome: "ప్రజా కనెక్ట్‌కి స్వాగతం",
    signup: "సైన్ అప్ చేయండి",
    login: "లాగిన్ అవ్వండి",
    name: "పూర్తి పేరు",
    phone: "ఫోన్ నంబర్",
    password: "పాస్‌వర్డ్",
    otp: "OTP ను నమోదు చేయండి",
    resend: "OTP మళ్లీ పంపండి",
    verify: "తనిఖీ చేయండి",
    success: "తనిఖీ విజయవంతమైంది!",
  }, null, 2)
);

// 8️⃣ Bilingual Signup Page
fs.mkdirSync(pagesPath, { recursive: true });
fs.writeFileSync(
  path.join(pagesPath, "Signup.tsx"),
  `
import { useState } from "react";
import axios from "axios";
import te from "../lang/te.json";
import en from "../lang/en.json";

export default function Signup() {
  const [lang, setLang] = useState("en");
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", role: "CITIZEN" });
  const t = lang === "te" ? te : en;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/api/auth/signup", form);
    alert(t.otp + " sent to phone!");
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center">
      <div className="absolute top-4 right-6">
        <button onClick={() => setLang(lang === "en" ? "te" : "en")} className="bg-blue-600 text-white px-3 py-1 rounded">
          {lang === "en" ? "తెలుగు" : "English"}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">{t.signup}</h2>
        <input placeholder={t.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="border p-2 w-full mb-2" />
        <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} className="border p-2 w-full mb-2" />
        <input placeholder={t.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="border p-2 w-full mb-2" />
        <input placeholder={t.password} type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} className="border p-2 w-full mb-2" />
        <select onChange={(e) => setForm({ ...form, role: e.target.value })} className="border p-2 w-full mb-2">
          <option value="CITIZEN">Citizen</option>
          <option value="COLLECTOR">Collector</option>
          <option value="LEADERSHIP">Leadership</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded">{t.signup}</button>
      </form>
    </div>
  );
}
`
);

console.log("✅ PrajaConnect bilingual + OTP-resend system setup complete!");
console.log("Next steps:");
console.log("1️⃣ cd backend && npx prisma migrate dev --name init");
console.log("2️⃣ node server.js");
console.log("3️⃣ Run npm run dev (frontend) and open http://localhost:5173/Signup");
