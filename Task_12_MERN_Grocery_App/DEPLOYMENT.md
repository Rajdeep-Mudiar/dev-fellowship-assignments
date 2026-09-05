# 🚀 GreenCart Vercel & Cloud Deployment Guide

This guide provides step-by-step instructions to deploy the **GreenCart Grocery Delivery Web App** to Vercel and other cloud providers.

---

## 1. Deploying to Vercel (Monorepo Setup)

The repository root is pre-configured with `vercel.json` to build and serve the entire Fellowship hub and all full-stack tasks automatically.

### Automated Monorepo Deploy
1. Push your repository to **GitHub**:
   ```bash
   git add .
   git commit -m "Add Task 12 GreenCart MERN Grocery App with Vercel deploy configuration"
   git push origin main
   ```
2. In your [Vercel Dashboard](https://vercel.com/dashboard):
   - Click **Add New ➔ Project**.
   - Import your `dev-fellowship-assignments` repository.
   - Leave the **Root Directory** as `./`.
   - The build command `npm run build` and output directory `dist` are automatically picked up from `vercel.json`.
3. Add Environment Variables under **Project Settings ➔ Environment Variables**:
   ```env
   MONGODB_URI=mongodb+srv://...
   JWT_SECRET=your_jwt_secret_key
   ADMIN_EMAIL=seller@greencart.com
   ADMIN_PASSWORD=seller123
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   ```
4. Click **Deploy**.
5. Once deployed, access the app live at:
   - **Showcase Hub**: `https://your-domain.vercel.app/`
   - **Task 12 GreenCart**: `https://your-domain.vercel.app/Task_12_MERN_Grocery_App/client/dist/index.html`
   - **Backend API**: `https://your-domain.vercel.app/api/grocery`

---

## 2. Deploying Task 12 as a Standalone Vercel Project

If you prefer to deploy **Task 12** as an independent standalone website:

1. In the Vercel Dashboard, import the repository and set:
   - **Root Directory**: `Task_12_MERN_Grocery_App`
   - **Framework Preset**: `Vite`
   - **Build Command**: `cd client && npm install && npm run build`
   - **Output Directory**: `client/dist`
2. Add the environment variables (`MONGODB_URI`, `JWT_SECRET`, `STRIPE_SECRET_KEY`, `CLOUDINARY_...`).
3. Click **Deploy**.

---

## 3. Dedicated Backend Hosting (Render.com / Railway)

If hosting the backend service permanently with WebSockets or long-running workers:

1. Create a **New Web Service** on [Render.com](https://render.com).
2. Set:
   - **Root Directory**: `Task_12_MERN_Grocery_App/server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
3. Add environment variables:
   ```env
   NODE_ENV=production
   PORT=8000
   MONGODB_URI=mongodb+srv://...
   JWT_SECRET=your_jwt_secret
   ADMIN_EMAIL=seller@greencart.com
   ADMIN_PASSWORD=seller123
   STRIPE_SECRET_KEY=sk_live_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   FRONTEND_URL=https://your-frontend.vercel.app
   ```

---

## 4. Stripe Webhook Configuration for Live Payments

1. Open your [Stripe Dashboard](https://dashboard.stripe.com/).
2. Navigate to **Developers ➔ Webhooks ➔ Add Endpoint**.
3. Set the endpoint URL:
   - For Vercel: `https://your-vercel-domain.vercel.app/api/grocery/order/stripe-webhook`
   - For Render: `https://your-render-domain.onrender.com/api/order/stripe-webhook`
4. Select events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
5. Copy the **Signing Secret** (`whsec_...`) and add it to your environment variables as `STRIPE_WEBHOOK_SECRET`.
