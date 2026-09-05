# 🥦 GreenCart — MERN Stack Grocery Delivery E-Commerce Platform

> **A full-stack Hyperlocal Grocery Delivery web application built with MongoDB, Express.js, React.js, Node.js, Tailwind CSS, Stripe Payments, and Cloudinary Media Management.**

---

## 🌟 Key Features

### 🛒 Customer Storefront (React + Tailwind CSS)
- **30-Minute Hyperlocal Grocery UX**: Express delivery pledge with live delivery location picker and countdown badge.
- **Curated Category Aisles**: Quick filtering across 7 grocery categories (Organic Veggies, Fresh Fruits, Dairy, Cold Drinks, Bakery, Grains, Instant Food).
- **Interactive Catalog & Filters**: Multi-faceted filtering by Category, Price Range slider, In-Stock only, Instant Search, and dynamic sorting.
- **Product Details & Gallery**: Image preview thumbnails, discount calculators, unit packaging info, and bullet highlights.
- **Real-Time Shopping Basket**: Instant subtotal calculation, free delivery thresholds, and promo voucher code engine (`FRESH50`, `FREESHIP`).
- **Seamless Multi-Step Checkout**: Saved addresses selection, add/edit address modal, delivery slot scheduler, and payment selection.
- **Live Order Status Tracker**: Step-by-step interactive timeline tracker from `Order Placed` ➔ `Processing` ➔ `Out for Delivery` ➔ `Delivered`.

### 🛡️ Seller & Admin Portal
- **Real-Time Store Dashboard**: Live performance metrics including Gross Revenue, Total Orders, Active Catalog Items, and Stock Health.
- **Multi-Image Product Creator**: Drag-and-drop or CDN image inputs, category selection, MRP vs Offer pricing, and bullet descriptions with Cloudinary.
- **Inventory & Stock Management**: Table of all catalog items with 1-click **In Stock / Out of Stock** toggle and deletion.
- **Order Dispatch & Fulfillment**: Customer orders table with live status dropdown transitions and payment status flags.

### 🔐 Full-Stack Authentication & Security
- **JWT (JSON Web Tokens)**: Secure token issuance with bcrypt password hashing.
- **Role-Based Access Control (RBAC)**: Distinguishes between customers and sellers/admins.
- **1-Click Demo Logins**: Instant demo access for customers and store managers.

### 💳 Stripe Payments & Webhooks
- **Stripe Checkout Integration**: Seamless checkout sessions with order itemization.
- **Real-Time Webhook Listener**: Raw body buffer signature verification listening for `checkout.session.completed` events.

### ☁️ Cloudinary Cloud Media Hosting
- Buffer-stream uploads with fallback handling for offline development.

---

## 📁 Repository Structure

```
Task_12_MERN_Grocery_App/
├── client/                      # React Frontend (Vite + Tailwind CSS)
│   ├── src/
│   │   ├── assets/              # Icons, banners, grocery images, seed data
│   │   ├── components/          # Navbar, Footer, Hero, CategoryRail, ProductCard, Modals
│   │   ├── context/             # AppContext (Auth, Cart, Products, Orders, State)
│   │   ├── pages/               # Home, Products, ProductDetails, Cart, Checkout, MyOrders, Login
│   │   │   └── seller/          # SellerDashboard, AddProduct, ProductList, OrderList
│   │   ├── services/            # Axios instance with auth interceptors
│   │   ├── App.jsx              # Routing & toast configuration
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── server/                      # Node.js + Express Backend
│   ├── config/                  # mongodb.js, cloudinary.js, stripe.js, seedData.js
│   ├── controllers/             # authController, productController, cartController, addressController, orderController
│   ├── middleware/              # auth.js, authSeller.js, multer.js
│   ├── models/                  # User.js, Product.js, Address.js, Order.js
│   ├── routes/                  # authRoutes, productRoutes, cartRoutes, addressRoutes, orderRoutes
│   ├── server.js                # Express app entry & Stripe webhook raw handler
│   ├── .env.example
│   └── package.json
├── DEPLOYMENT.md                # Vercel & Cloud deployment guide
└── README.md                    # Project documentation
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- Node.js (v18+)
- MongoDB Atlas account or local MongoDB instance

### 2. Backend Setup
```bash
cd Task_12_MERN_Grocery_App/server
npm install
```

Configure your `.env` file in the `server` folder:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=8000
ADMIN_EMAIL=seller@greencart.com
ADMIN_PASSWORD=seller123
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
FRONTEND_URL=http://localhost:5173
```

Start the backend server:
```bash
npm start
# or for live reload
npm run server
```

### 3. Frontend Setup
```bash
cd ../client
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔑 Demo Login Credentials

| Role | Email | Password |
| :--- | :--- | :--- |
| **Customer** | `customer@greencart.com` | `customer123` |
| **Seller / Admin** | `seller@greencart.com` | `seller123` |

*(You can also use the 1-click Demo Fill buttons on the Sign In modal.)*

---

## 📡 REST API Reference

### Auth Routes (`/api/auth`)
- `POST /register` — Register a customer account
- `POST /login` — Customer login
- `POST /seller-login` — Seller / Admin portal login
- `GET /profile` — Retrieve logged-in user profile (`Bearer Token`)

### Product Routes (`/api/product`)
- `GET /list` — List all products with optional `?category=`, `?search=`, and `?inStock=` filters
- `GET /:id` — Get single product details
- `POST /add` — Add a new grocery product (`authSeller`, multipart images)
- `PATCH /stock/:id` — Toggle In-Stock / Out-of-Stock status (`authSeller`)
- `DELETE /delete/:id` — Delete a product (`authSeller`)

### Cart Routes (`/api/cart`)
- `GET /` — Get user cart state
- `POST /add` — Add/increment item in cart
- `POST /update` — Set item quantity
- `POST /clear` — Clear user cart

### Address Routes (`/api/address`)
- `GET /list` — List user saved delivery addresses
- `POST /add` — Add new delivery address
- `DELETE /delete/:id` — Remove an address

### Order Routes (`/api/order`)
- `POST /place-cod` — Place Cash On Delivery order
- `POST /place-stripe` — Initialize Stripe Checkout Session
- `POST /stripe-webhook` — Stripe Webhook listener for real-time payment confirmation
- `GET /user-orders` — Get customer order history
- `GET /seller-orders` — Get all store orders (`authSeller`)
- `POST /update-status` — Update order status (`authSeller`)
