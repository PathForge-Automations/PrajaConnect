import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => res.send("PrajaConnect backend running ✅"));
app.listen(process.env.PORT, () => console.log(`✅ Server on http://localhost:${process.env.PORT}`));
