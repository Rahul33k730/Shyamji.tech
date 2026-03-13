# Deployment Guide - Shyamji Tech

This project is ready to be deployed to platforms like **Render**, **Railway**, or a **VPS**.

## Prerequisites
- Node.js installed
- A production database (PostgreSQL recommended for production, though SQLite is configured for local development)

## Deployment Steps

### 1. Environment Variables
Create a `.env` file in the `backend` directory with the following variables:
```env
DATABASE_URL="file:./dev.db" # Or your PostgreSQL URL
JWT_SECRET="your_secure_random_secret"
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
NODE_ENV="production"
PORT=5000
```

### 2. Frontend Configuration
Ensure the frontend knows where the API is. During build, Vite will use `VITE_API_URL`.
If the backend serves the frontend (standard for Render/Railway), set:
`VITE_API_URL=/api`

### 3. Build & Start Commands
On your deployment platform, use these commands:

- **Build Command**: 
  `npm run install-all && npm run build && npm run prisma:push && npm run prisma:seed`
- **Start Command**: 
  `npm start`

## Recommended Platforms

### Render.com (Web Service)
1. Link your GitHub repository.
2. Select **Node** environment.
3. Build Command: `npm run install-all && npm run build && npm run prisma:push && npm run prisma:seed`
4. Start Command: `npm start`
5. Add the Environment Variables listed above.

### Railway.app
Railway will automatically detect the `package.json`. Just add the Environment Variables.

## Database Note
For production, it is highly recommended to use **PostgreSQL**.
1. Update `backend/prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
2. Update your `DATABASE_URL` in environment variables to your PostgreSQL connection string.
3. Run `npx prisma generate` in the backend.
