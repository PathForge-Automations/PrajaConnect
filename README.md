🇮🇳 PrajaConnect — Statewide Citizen Governance Platform
Built by PathForge Automations
🧭 Overview

PrajaConnect is a secure, bilingual (English + Telugu) digital bridge between citizens, district collectors, and state leadership.
It enables real-time issue reporting, tracking, and decision-making, creating transparent, data-driven governance.

“When citizens and leaders are directly connected, governance becomes people-driven.”

Screenshot of our PrajaConnect:
<img width="1208" height="3234" alt="localhost_8081_ (2)" src="https://github.com/user-attachments/assets/059bc680-b791-4f6e-af3f-8398d9352247" />


🚀 Core Features
🧍 Citizen Portal

Secure OTP-based signup and login

Submit issues with photos, GPS location, and category

Receive real-time notifications on issue status

View dashboard of all submitted issues and progress

🧑‍💼 Collector Portal

Manage and assign issues from citizens within their district

Update issue status (Pending → In Progress → Resolved)

Generate quick district-level performance summaries

🏛️ Leadership Portal

View state-wide analytics across all districts

Track top-performing regions and common citizen complaints

Access data-driven insights for instant decision-making

🧩 Tech Stack
Layer	Technology
Frontend	React + Vite + TailwindCSS + Shadcn/UI + TypeScript
Backend	Node.js + Express.js
Database	PostgreSQL (via Prisma ORM)
Authentication	JWT + OTP (via Gmail App Password)
SMS OTP (optional)	MSG91 / Twilio integration
Email Notifications	Gmail App Password (SMTP)
Hosting (suggested)	Vercel (Frontend), Render or Railway (Backend), Neon (PostgreSQL)
⚙️ Folder Structure
<img width="674" height="648" alt="image" src="https://github.com/user-attachments/assets/0da6471d-763c-491a-8016-2ab728b2aeae" />

# Server Config
PORT=8080

# PostgreSQL Database
DATABASE_URL="postgresql://<user>:<password>@localhost:5432/prajaconnect?schema=public"

# JWT Auth
JWT_SECRET="your-super-secret-jwt-key"

# Gmail App Password for sending OTPs
SMTP_USER="pathforge.automations@gmail.com"
SMTP_PASS="your-16-character-app-password"

# Optional: MSG91 / Twilio Config
MSG91_AUTH_KEY="your-msg91-auth-key"

🧱 Setup Instructions
🛠️ 1️⃣ Install dependencies
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

🧩 2️⃣ Setup your database
cd backend
npx prisma migrate dev --name init


This will create all required tables in PostgreSQL.

📡 3️⃣ Run the servers
Backend:
cd backend
node server.js


Expected:

✅ Server running on http://localhost:8080
Connected to Database

Frontend:
cd frontend
npm run dev


Expected:

VITE v6.x ready in 500ms
➜ Local: http://localhost:5173/

💡 Login Flow
Role	Path	Description
Citizen	/login	Login and access Citizen Portal
Collector	/login/collector	Manage issues by district
Leadership	/login/leadership	View state-level analytics

After successful login, users are automatically redirected to their respective dashboards.

📬 Issue Reporting Workflow

Citizen submits issue (title, category, description, photo, GPS).

System saves issue to DB and assigns it to the appropriate Collector.

Collector reviews and updates the issue status.

Citizen gets live notifications and email updates.

Leadership dashboard aggregates all data in real time.

🧠 AI-Ready Extension (Future Plan)

PathForge Automations plans to integrate:

🧭 AI-based sentiment analysis on citizen feedback

📊 Predictive models for regional priority detection

🧩 Automatic department routing based on NLP classification

🌐 Languages Supported

🇬🇧 English

🇮🇳 తెలుగు (Telugu)

Citizens can switch their interface language anytime during onboarding or from profile settings.

🛡️ Security Highlights

JWT-secured API requests

Passwords hashed via bcrypt

OTP verification for all signups

Role-based access (Citizen / Collector / Leadership)

Location data encrypted before storage

<img width="740" height="678" alt="image" src="https://github.com/user-attachments/assets/255ec72b-fed6-40e0-be46-9249105e3c33" />

✅ Frontend

Deploy on Vercel:

npm run build
vercel deploy

✅ Backend

Deploy on Render or Railway:

Add your .env

Start command: node server.js

✅ Database

Host PostgreSQL on Neon.tech (free tier).

🧰 Scripts
Command	Description
npm run dev	Run frontend (Vite)
npm start	Start backend server
npx prisma studio	Open Prisma DB UI
npm run build	Build frontend for production
🧾 Author & License

Developed by:
🧠 PathForge Automations
💌 pathforge.automations@gmail.com

License: MIT
© 2025 PathForge Automations. All rights reserved.
