# Portfolio CMS

A full-stack, self-hosted portfolio platform with a built-in content management system. Instead of hardcoding your bio, projects, skills, and resume into JSX, you manage everything through a private admin dashboard — the public site reads live from the database.

**Live demo:** https://portfolio-iota-two-gp7o71f78n.vercel.app/

---

## ✨ Features

**Public site**
- Animated hero section with rotating role titles
- About, Skills, Projects, Certifications, Resume, and Contact sections
- Dark / light mode
- Fully responsive, mobile-first layout
- Contact form that saves messages to the database

**Admin dashboard** (`/admin`, JWT-protected)
- Dashboard overview
- Content Manager — edit Hero, About, and Resume text/media without touching code
- Projects Manager — create, edit, delete, reorder, and feature projects
- Skills Manager — manage skills with categories and proficiency, drag-to-reorder
- Certifications Manager — add and publish certifications
- Messages Inbox — read, star, and manage contact form submissions
- Settings — site-wide configuration
- Image/file uploads via Cloudinary (single and multiple)

**Platform**
- JWT authentication with an auto-provisioned first-time admin account
- Rate limiting, Helmet security headers, and CORS configured for production
- Rich-text editing (React Quill) for long-form content
- Toast notifications, smooth animations (Framer Motion)

---

## 🛠 Tech Stack

**Frontend**
- React 18 + Vite
- Tailwind CSS
- React Router
- Zustand (state management)
- Framer Motion (animation)
- Axios
- React Hook Form
- @dnd-kit (drag-and-drop reordering)
- React Quill (rich text editor)
- React PDF

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT (jsonwebtoken) authentication
- Cloudinary (image/file storage)
- Multer (file upload handling)
- Nodemailer (email)
- Helmet, CORS, express-rate-limit, express-validator
- Jest + Supertest (testing)

---

## 📂 Project Structure

```
Portfolio-main/
├── backend/
│   ├── config/          # Database & Cloudinary configuration
│   ├── controllers/     # Route logic
│   ├── database/        # Seed scripts
│   ├── middleware/      # Auth, error handling, uploads
│   ├── models/          # Mongoose schemas (User, Project, Skill, Content, ...)
│   ├── routes/          # Express route definitions
│   ├── utils/           # Helpers (admin bootstrap, import/export)
│   └── server.js        # App entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/       # Admin dashboard panels
│   │   │   ├── sections/    # Public-facing page sections
│   │   │   ├── layout/      # Header, footer, nav
│   │   │   └── common/      # Shared UI (buttons, etc.)
│   │   ├── pages/           # Home, Login, Admin
│   │   ├── services/        # Axios API client
│   │   ├── context/         # React context providers
│   │   └── hooks/           # Custom hooks
│   └── vite.config.js
│
├── docs/
│   ├── DEPLOYMENT.md    # Step-by-step deployment guide
│   ├── API.md
│   └── CUSTOMIZATION.md
│
└── docker-compose.yml
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A [MongoDB Atlas](https://mongodb.com/atlas) cluster (free tier works)
- A [Cloudinary](https://cloudinary.com) account (free tier works)

### 1. Clone the repository

```bash
git clone https://github.com/girishmore2004/Portfolio.git
cd Portfolio
```

### 2. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

This copies `backend/.env.example` to `backend/.env`. Open `.env` and fill in your **own** values for each variable (Mongo URI, JWT secret, Cloudinary keys, admin credentials, email credentials).

> ⚠️ **Never commit your `.env` file or paste real secrets into the README, commit messages, or any public file.** `.env` is already listed in `.gitignore` — keep it that way. Only `.env.example` (with placeholder values) should ever be committed.

Start the server:

```bash
npm run dev
```

On first boot, the app automatically creates the admin account from `ADMIN_EMAIL` / `ADMIN_PASSWORD` if one doesn't already exist.

### 3. Frontend setup

```bash
cd ../frontend
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the dev server:

```bash
npm run dev
```

The site will be running at `http://localhost:5173`, with the API at `http://localhost:5000/api`.

### 4. (Optional) Seed sample data

```bash
cd backend
npm run seed
```

---

## 🔑 Admin Access

Visit `/login` and sign in with the admin credentials you set in your own `backend/.env` file. You'll be redirected to `/admin` to manage all content.

---

## 🔒 Security Notes

- All secrets (database URI, JWT secret, Cloudinary keys, admin password, email credentials) live only in `backend/.env`, which is git-ignored and never committed.
- `backend/.env.example` contains placeholder values only — always keep it that way.
- Use a strong, unique `JWT_SECRET` and a strong admin password in production.
- Rotate any credential immediately if it's ever accidentally exposed (committed, pasted into a chat/issue, etc.).

---

## 📜 Available Scripts

**Backend** (`/backend`)

| Command | Description |
|---|---|
| `npm start` | Run in production mode |
| `npm run dev` | Run with nodemon (auto-restart) |
| `npm run seed` | Seed the database with sample data |
| `npm run export` | Export content to a file |
| `npm run import` | Import content from a file |
| `npm test` | Run the test suite |

**Frontend** (`/frontend`)

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Lint the codebase |

---

## 🌐 Deployment

This project is designed to deploy as two separate services:

- **Frontend** → [Vercel](https://vercel.com)
- **Backend** → [Render](https://render.com) or [Railway](https://railway.app)
- **Database** → [MongoDB Atlas](https://mongodb.com/atlas)
- **Media storage** → [Cloudinary](https://cloudinary.com)

Full step-by-step instructions are in [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).

> **Note:** Free tiers on Render/Railway spin the backend down after a period of inactivity, causing a slow "cold start" on the first request. Consider a paid instance or an uptime pinger (e.g. [UptimeRobot](https://uptimerobot.com)) if this matters for your use case.

---

## 🤝 Contributing

Issues and pull requests are welcome. If you're proposing a significant change, please open an issue first to discuss what you'd like to change.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👤 Author

**Girish More**
GitHub: [@girishmore2004](https://github.com/girishmore2004)
