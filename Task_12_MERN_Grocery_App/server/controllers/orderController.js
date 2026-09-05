import Order from "../models/Order.js";
import User from "../models/User.js";
import stripe from "../config/stripe.js";

// Place Order with Cash on Delivery (COD)
export const placeOrderCOD = async (req, res) => {
  try {
    const { items, amount, address, deliverySlot } = req.body;

    if (!items || items.length === 0 || !amount || !address) {
      return res.status(400).json({ success: false, message: "Invalid order details" });
    }

    const newOrder = await Order.create({
      userId: req.userId,
      items,
      amount,
      address,
      deliverySlot: deliverySlot || "Express Delivery (30 mins)",
      paymentType: "COD",
      isPaid: false,
      status: "Order Placed",
    });

    // Clear user cart
    await User.findByIdAndUpdate(req.userId, { cartData: {} });

    res.status(201).json({
      success: true,
      message: "Order placed successfully! Delivery agent will collect cash upon arrival.",
      order: newOrder,
    });
  } catch (error) {
    console.error("Place Order COD Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Place Order with Stripe Online Payment
export const placeOrderStripe = async (req, res) => {
  try {
    const { items, amount, address, deliverySlot, frontendUrl } = req.body;

    if (!items || items.length === 0 || !amount || !address) {
      return res.status(400).json({ success: false, message: "Invalid order details" });
    }

    const origin = frontendUrl || req.headers.origin || "http://localhost:5173";

    // Create preliminary Order in DB
    const newOrder = await Order.create({
      userId: req.userId,
      items,
      amount,
      address,
      deliverySlot: deliverySlot || "Express Delivery (30 mins)",
      paymentType: "Stripe",
      isPaid: false,
      status: "Order Placed",
    });

    // If Stripe is not configured with a valid API key, provide simulated successful checkout
    if (!stripe || !process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.startsWith("sk_test_placeholder")) {
      // Direct mock response or instant mock URL
      newOrder.isPaid = true;
      await newOrder.save();
      await User.findByIdAndUpdate(req.userId, { cartData: {} });

      return res.json({
        success: true,
        message: "Order placed via Stripe Demo Mode!",
        isMock: true,
        orderId: newOrder._id,
        session_url: `${origin}/my-orders?success=true&orderId=${newOrder._id}`,
      });
    }

    // Build Stripe Line Items
    const line_items = items.map((item) => {
      const unitPrice = item.product.offerPrice || item.product.price;
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item.product.name,
            images: item.product.image && item.product.image.length > 0 ? [item.product.image[0]] : [],
          },
          unit_amount: Math.round(unitPrice * 100), // in paise
        },
        quantity: item.quantity,
      };
    });

    // Add Delivery fee if applicable
    const deliveryFee = amount > 200 ? 0 : 30;
    if (deliveryFee > 0) {
      line_items.push({
        price_data: {
          currency: "inr",
          product_data: {
            name: "Express Delivery Fee",
          },
          unit_amount: deliveryFee * 100,
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      customer_email: address.email,
      metadata: {
        orderId: newOrder._id.toString(),
        userId: req.userId.toString(),
      },
      success_url: `${origin}/my-orders?success=true&orderId=${newOrder._id}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart?canceled=true`,
    });

    newOrder.stripeSessionId = session.id;
    await newOrder.save();

    // Clear user cart
    await User.findByIdAndUpdate(req.userId, { cartData: {} });

    res.json({
      success: true,
      message: "Stripe Checkout session created",
      session_url: session.url,
      sessionId: session.id,
      orderId: newOrder._id,
    });
  } catch (error) {
    console.error("Place Order Stripe Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Stripe Webhook Listener for real-time payment confirmation
export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    if (endpointSecret && stripe && sig) {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } else {
      // Unsigned event fallback for testing
      event = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    }
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const orderId = session.metadata?.orderId;
        if (orderId) {
          await Order.findByIdAndUpdate(orderId, {
            isPaid: true,
            status: "Processing",
          });
          console.log(`Payment confirmed for Order ID: ${orderId}`);
        }
        break;
      }
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object;
        console.log(`Payment intent succeeded: ${paymentIntent.id}`);
        break;
      }
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Verify Stripe Payment (Client confirmation check)
export const verifyStripePayment = async (req, res) => {
  try {
    const { orderId, sessionId } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    if (stripe && sessionId && !sessionId.startsWith("mock_")) {
      try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        if (session.payment_status === "paid") {
          order.isPaid = true;
          if (order.status === "Order Placed") {
            order.status = "Processing";
          }
          await order.save();
        }
      } catch (stripeErr) {
        console.warn("Could not retrieve Stripe session directly:", stripeErr.message);
      }
    } else {
      // Fallback
      order.isPaid = true;
      await order.save();
    }

    res.json({ success: true, isPaid: order.isPaid, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get User's Order History
export const userOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Seller / Admin: List All Orders
export const allOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Seller / Admin: Update Order Status
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status, isPaid } = req.body;

    if (!orderId || !status) {
      return res.status(400).json({ success: false, message: "Order ID and status are required" });
    }

    const updateFields = { status };
    if (isPaid !== undefined) {
      updateFields.isPaid = Boolean(isPaid);
    }

    const order = await Order.findByIdAndUpdate(orderId, updateFields, { new: true });
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.json({
      success: true,
      message: `Order status updated to "${status}"`,
      order,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
