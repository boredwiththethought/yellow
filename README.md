# 🛍️ FASCO - Modern E-Commerce Platform

<div align="center">

![FASCO](https://img.shields.io/badge/FASCO-E--Commerce-black?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.1-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-8.x-47A248?style=for-the-badge&logo=mongodb)
![Vercel](https://img.shields.io/badge/Vercel-Ready-000000?style=for-the-badge&logo=vercel)

**A beautiful, modern, and fully responsive e-commerce fashion store**

[Live Demo](https://fasco.vercel.app) · [Report Bug](https://github.com/boredwiththethought/yellow/issues) · [Request Feature](https://github.com/boredwiththethought/yellow/issues)

</div>

---

## ✨ Features

- 🛒 **Full Shopping Experience** - Browse products, add to cart, checkout
- 💳 **Secure Checkout** - Complete order processing
- ❤️ **Wishlist** - Save favorite products for later
- 🔐 **Authentication** - User registration, login, password recovery
- 🔍 **Advanced Filters** - Filter by category, brand, color, size, price
- 📱 **Fully Responsive** - Beautiful on all devices
- 🚀 **Fast & Modern** - Built with React 19 + Vite + Tailwind CSS 4

---

## 🏗️ Project Structure

```
yellow/
├── web/                    # Frontend (React + Vite + Tailwind)
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React Context (Cart, Wishlist, Auth)
│   │   ├── api/            # API configuration
│   │   └── types/          # TypeScript types
│   └── public/             # Static assets
│
└── server/                 # Backend (Express + MongoDB)
    ├── src/
    │   ├── routes/         # API routes (auth, products)
    │   ├── models/         # MongoDB models
    │   └── seed/           # Database seeding scripts
    └── api/                # Vercel serverless functions
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ or **Bun**
- **MongoDB** (local or MongoDB Atlas)

### Installation

```bash
# Clone the repository
git clone https://github.com/boredwiththethought/yellow.git
cd yellow

# Install dependencies
cd web && npm install && cd ..
cd server && npm install && cd ..
```

### Environment Variables

Create `.env` file in `server/` directory:

```env
MONGODB_URI=mongodb+srv://your-connection-string
MONGODB_DB=fascodb
JWT_SECRET=your-super-secret-jwt-key
PORT=5000
```

Create `.env` file in `web/` directory (for production):

```env
VITE_API_URL=https://your-api.vercel.app/api
```

### Development

```bash
# Start backend (from server/)
cd server
npm run dev

# Start frontend (from web/)
cd web
npm run dev
```

- 🌐 Frontend: http://localhost:5173
- 🔌 Backend API: http://localhost:5000

### Seed Database

```bash
cd server
npm run seed
```

---

## 🌐 Deployment (Vercel)

### Deploy Frontend

```bash
cd web
vercel
```

### Deploy Backend

```bash
cd server
vercel
```

### Environment Variables on Vercel

Add these environment variables in Vercel Dashboard:

| Variable      | Description                     |
| ------------- | ------------------------------- |
| `MONGODB_URI` | MongoDB Atlas connection string |
| `MONGODB_DB`  | Database name (e.g., `fascodb`) |
| `JWT_SECRET`  | Secret key for JWT tokens       |

---

## 🛠️ Tech Stack

### Frontend

- **React 19** - UI Library
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **Tailwind CSS 4** - Styling
- **React Router 7** - Routing
- **Axios** - HTTP Client
- **React Hook Form + Zod** - Form Validation

### Backend

- **Express.js** - Web Framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password Hashing
- **Zod** - Validation

---

## 📱 Pages

| Page               | Description                               |
| ------------------ | ----------------------------------------- |
| `/`                | Home - Hero, Deals, New Arrivals, Reviews |
| `/shop`            | Shop - Product catalog with filters       |
| `/product/:id`     | Product Details                           |
| `/cart`            | Shopping Cart                             |
| `/wishlist`        | Wishlist                                  |
| `/checkout`        | Checkout                                  |
| `/thank-you`       | Order Confirmation                        |
| `/sign-in`         | Login                                     |
| `/sign-up`         | Registration                              |
| `/forgot-password` | Password Recovery                         |

---

## 🔌 API Endpoints

| Method | Endpoint                        | Description                     |
| ------ | ------------------------------- | ------------------------------- |
| `GET`  | `/api/products`                 | Get all products (with filters) |
| `GET`  | `/api/products/:id`             | Get single product              |
| `GET`  | `/api/products/filters/options` | Get filter options              |
| `POST` | `/api/auth/register`            | Register new user               |
| `POST` | `/api/auth/login`               | Login user                      |
| `POST` | `/api/auth/forgot-password`     | Request password reset          |
| `POST` | `/api/orders`                   | Create new order                |
| `GET`  | `/api/health`                   | Health check                    |

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Bored With The Thought**

- GitHub: [@boredwiththethought](https://github.com/boredwiththethought)

---

<div align="center">

Made with ❤️ and ☕

</div>
