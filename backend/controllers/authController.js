import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import axios from "axios";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

// Send email helper
const sendMail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  await transporter.sendMail({ from: process.env.SMTP_USER, to, subject, text });
};

// Register user
export const register = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    const existing = await prisma.user.findUnique({ where: { phone } });
    if (existing) return res.status(400).json({ error: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    await prisma.user.create({ data: { name, email, phone, password: hashed, role } });

    await axios.get(`https://api.msg91.com/api/v5/otp?authkey=${process.env.MSG91_AUTHKEY}&mobile=91${phone}&sender=${process.env.MSG91_SENDER_ID}`);
    await sendMail(email, "Welcome to PrajaConnect", `Dear ${name}, welcome to PrajaConnect!`);

    res.json({ message: "User registered successfully. OTP sent to phone." });
  } catch (err) {
    res.status(500).json({ error: "Registration failed" });
  }
};

// Verify OTP
export const verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;
    const response = await axios.get(
      `https://api.msg91.com/api/v5/otp/verify?authkey=${process.env.MSG91_AUTHKEY}&mobile=91${phone}&otp=${otp}`
    );
    if (response.data.type === "success") res.json({ message: "OTP verified successfully" });
    else res.status(400).json({ error: "Invalid OTP" });
  } catch {
    res.status(500).json({ error: "OTP verification failed" });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const user = await prisma.user.findUnique({ where: { phone } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Incorrect password" });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ message: "Login successful", token, role: user.role });
  } catch {
    res.status(500).json({ error: "Login failed" });
  }
};
