# Shyamji Tech - Full-Stack Tech Startup Website

A professional, high-end, and futuristic website for a tech startup focused on AI and accessible technology.

## Tech Stack
- **Frontend**: React.js (Vite), Tailwind CSS v4, Framer Motion, Axios, React Router, Lucide Icons.
- **Backend**: Node.js, Express.js.
- **Database**: PostgreSQL (via Prisma ORM).
- **Authentication**: JWT with bcrypt hashing.
- **Storage**: Cloudinary (via Multer).

## Features
- **Premium Hero Section**: Futuristic animations, dynamic taglines, and mission statement.
- **Dynamic Services**: Services marquee and cards with dual-currency pricing (INR/USD) detected by IP.
- **AI Chatbot**: Real-time AI chat with logging and lead collection.
- **Admin Panel**: Full control over hero, services, products, portfolio, and contact messages.
- **Responsive Design**: Optimized for all devices with smooth transitions.

## Setup Instructions

### 1. Backend Setup
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/shyamji_tech?schema=public"
   JWT_SECRET="your_secret_key"
   CLOUDINARY_CLOUD_NAME="your_cloud_name"
   CLOUDINARY_API_KEY="your_api_key"
   CLOUDINARY_API_SECRET="your_api_secret"
   PORT=5000
   ```
4. Run migrations and seed the database:
   ```bash
   npx prisma migrate dev --name init
   npx prisma db seed
   ```
5. Start the backend:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend:
   ```bash
   npm run dev
   ```

## Admin Access
- **Default Username**: `rahuldrrahulyadav@gmail.com`
- **Default Password**: `Rahul986718`
*(Change this in `prisma/seed.js` or through the admin panel).*

## Project Structure
- `backend/src`: Controllers, routes, middleware, and config.
- `backend/prisma`: Database schema and seed script.
- `frontend/src/components`: UI components (Hero, Services, etc.).
- `frontend/src/pages`: Main pages (Home, AdminDashboard, Login).
- `frontend/src/context`: Auth and Currency context providers.
