# 🚀 GreenCart Deployment & Production Setup Guide

This guide provides end-to-end instructions for deploying the **GreenCart MERN Grocery Delivery App** across cloud platforms.

---

## 1. Frontend Deployment (Vercel)

### Option A: Using Vercel CLI
1. Open terminal inside the `client` directory:
   ```bash
   cd Task_12_MERN_Grocery_App/client
   npm install -g vercel
   vercel
   ```
2. Follow the interactive prompts:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. In your Vercel Project Dashboard, navigate to **Settings ➔ Environment Variables** and add:
   ```env
   VITE_BACKEND_URL=https://your-backend-service.onrender.com/api
   ```
4. Redeploy with `vercel --prod`.

---

## 2. Backend Deployment (Render / Railway)

### Deploying to Render.com
1. Push your repository to GitHub.
2. Sign in to [Render.com](https://render.com) and click **New ➔ Web Service**.
3. Connect your repository and select the root or specify the directory:
   - **Root Directory**: `Task_12_MERN_Grocery_App/server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add the following **Environment Variables** in Render:
   | Variable | Value |
   | :--- | :--- |
   | `NODE_ENV` | `production` |
   | `PORT` | `8000` |
   | `MONGODB_URI` | `mongodb+srv://...` |
   | `JWT_SECRET` | `your_long_random_jwt_secret` |
   | `ADMIN_EMAIL` | `seller@greencart.com` |
   | `ADMIN_PASSWORD` | `your_secure_seller_password` |
   | `STRIPE_SECRET_KEY` | `sk_live_...` or `sk_test_...` |
   | `STRIPE_WEBHOOK_SECRET` | `whsec_...` |
   | `CLOUDINARY_NAME` | `your_cloudinary_name` |
   | `CLOUDINARY_API_KEY` | `your_cloudinary_key` |
   | `CLOUDINARY_API_SECRET` | `your_cloudinary_secret` |
   | `FRONTEND_URL` | `https://your-frontend.vercel.app` |

---

## 3. Stripe Payments & Webhooks Configuration

1. Log in to your [Stripe Dashboard](https://dashboard.stripe.com/).
2. Navigate to **Developers ➔ API Keys** and copy:
   - Publishable key (Client)
   - Secret key (Server `STRIPE_SECRET_KEY`)
3. Navigate to **Developers ➔ Webhooks**:
   - Click **Add endpoint**
   - **Endpoint URL**: `https://your-backend.onrender.com/api/order/stripe-webhook`
   - **Select events**:
     - `checkout.session.completed`
     - `payment_intent.succeeded`
   - Copy the generated **Signing Secret** (`whsec_...`) and paste it into `STRIPE_WEBHOOK_SECRET` in your backend `.env`.

### Local Webhook Testing with Stripe CLI
To test webhooks on localhost:
```bash
stripe login
stripe listen --forward-to localhost:8000/api/order/stripe-webhook
```
Copy the webhook signing secret provided in terminal output into your local `server/.env`.

---

## 4. Cloudinary Cloud Media Setup

1. Sign up for a free account on [Cloudinary](https://cloudinary.com/).
2. Go to your **Cloudinary Dashboard ➔ Product Environment Settings**.
3. Copy your:
   - **Cloud Name** (`CLOUDINARY_NAME`)
   - **API Key** (`CLOUDINARY_API_KEY`)
   - **API Secret** (`CLOUDINARY_API_SECRET`)
4. Add these 3 values to your backend environment variables. All product image uploads from the Seller Portal will be uploaded directly to your Cloudinary `greencart_products` media bucket.
