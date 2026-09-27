# QuickStay — Full-Stack Production Hotel Booking Website

A full-stack, secure, and production-ready Hotel Booking Platform built with **React**, **Tailwind CSS**, **Node.js/Express**, **MongoDB**, **Clerk Authentication**, **Stripe Checkout**, and **Nodemailer**.

---

## 🚀 Key Features

* **Authentication & Authorization (Clerk):** User sign-in, sign-up, user profiles, session synchronization, and role-guarded routes.
* **Search & Filter Engine:** Dynamic search by destination city, check-in, check-out dates, and guest capacity with backend availability verification.
* **Hotel Catalog & Details:** Filtering by room types, price ranges, and sorting by price or rating. Full gallery view and room specifications.
* **Booking & Reservation:** Server-side price calculation, overlap & double-booking prevention, and instant reservation creation.
* **Stripe Online Payments:** Secure Checkout session creation and Stripe Webhook signature verification to automatically mark bookings as paid.
* **Automated Confirmation Emails:** Nodemailer dispatch with structured HTML invoices upon successful payment confirmation.
* **User Dashboard (`/my-bookings`):** Real-time booking history, payment status badges, cancelation actions, and "Pay with Stripe" button.
* **Admin / Owner Portal (`/owner`):** Analytics metrics (total revenue, active properties, bookings breakdown), hotel registration form, property management, and booking administration.
* **Production & Deployment Ready:** Configured for Vercel deployment with serverless routing and Helmet/CORS protection.

---

## 🛠️ Project Structure

```text
Task_13_Hotel_Booking_System/
├── client/                      # React Frontend (Vite + Tailwind CSS)
│   ├── src/
│   │   ├── assets/              # Icons, banners, and sample dataset
│   │   ├── components/          # Navbar, Footer, Hero, HotelCard, Route Guards
│   │   ├── context/             # AppContext (global search, Clerk token sync)
│   │   ├── pages/               # Home, AllRooms, RoomDetails, MyBookings, Payment
│   │   │   └── owner/           # Dashboard, AddRoom, ManageRooms, ManageBookings
│   │   ├── services/            # Centralized Axios API service (api.js)
│   │   ├── App.jsx              # Application router
│   │   └── index.css            # Tailwind directives & typography
│   └── .env                     # Client environment variables
│
└── server/                      # Express Backend API
    ├── config/                  # MongoDB database connection
    ├── controllers/             # Hotel, Booking, Payment, Admin controllers
    ├── middleware/              # Clerk Auth, Admin Guard, Error handler
    ├── models/                  # User, Hotel, Booking Mongoose schemas
    ├── routes/                  # API route definitions
    ├── services/                # Nodemailer email dispatcher, Stripe client
    ├── utils/                   # Booking ID generator
    ├── server.js                # Express app entry point
    ├── vercel.json              # Serverless configuration
    └── .env                     # Backend environment secrets
```

---

## 💻 Getting Started Locally

### 1. Backend Setup

```bash
cd server
npm install
npm start
```
* The server will run on `http://localhost:5000`.
* Optional initial seeding: visit `http://localhost:5000/api/hotels/seed` to populate sample properties in MongoDB.

### 2. Frontend Setup

```bash
cd client
npm install
npm run dev
```
* The frontend will run on `http://localhost:5173`.

---

## ⚙️ Environment Variables

### Client (`client/.env`)
```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
VITE_API_URL=http://localhost:5000
```

### Server (`server/.env`)
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority
CLIENT_URL=http://localhost:5173

# Clerk Keys
CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Stripe Keys
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Nodemailer / SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-google-app-password
EMAIL_FROM="QuickStay Reservations <your-email@gmail.com>"
```
