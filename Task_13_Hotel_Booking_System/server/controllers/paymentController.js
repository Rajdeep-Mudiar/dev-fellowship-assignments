import Stripe from "stripe";
import mongoose from "mongoose";
import Booking from "../models/Booking.js";
import { sendBookingConfirmationEmail } from "../services/emailService.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder");

/**
 * Create Stripe Checkout Session for a booking
 */
export const createCheckoutSession = async (req, res, next) => {
  try {
    const { bookingId } = req.body;
    const userId = req.userId || req.body.userId;

    if (!bookingId) {
      return res.status(400).json({
        success: false,
        message: "Booking ID is required",
      });
    }

    let booking = null;
    if (mongoose.Types.ObjectId.isValid(bookingId)) {
      booking = await Booking.findById(bookingId).populate("hotelId");
    }

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking record not found",
      });
    }

    if (booking.paymentStatus === "paid") {
      return res.status(400).json({
        success: false,
        message: "This booking is already paid and confirmed",
      });
    }

    const hostOrigin = req.headers.origin || req.headers.referer || "http://localhost:5173";
    const isVercel = hostOrigin.includes("vercel.app");
    const returnBaseUrl = isVercel
      ? "https://dev-fellowship-assignments.vercel.app/Task_13_Hotel_Booking_System/client/dist/index.html#"
      : `${hostOrigin.replace(/\/$/, "")}/#`;

    const successUrl = `${returnBaseUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}&bookingId=${booking._id}`;
    const cancelUrl = `${returnBaseUrl}/payment/cancel?bookingId=${booking._id}`;

    // If Stripe key is placeholder or missing, simulate instant confirmation
    if (
      !process.env.STRIPE_SECRET_KEY ||
      process.env.STRIPE_SECRET_KEY.includes("placeholder")
    ) {
      console.warn("Using simulation checkout URL because Stripe keys are not configured.");
      booking.paymentStatus = "paid";
      booking.bookingStatus = "confirmed";
      booking.stripeSessionId = `sim_session_${Date.now()}`;
      await booking.save();
      await sendBookingConfirmationEmail(booking);

      return res.json({
        success: true,
        url: `${returnBaseUrl}/payment/success?bookingId=${booking._id}&simulated=true`,
      });
    }

    const hotelName = booking.hotelId?.name || "QuickStay Luxury Property";
    const hotelImage = booking.hotelId?.images?.[0] || "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200";

    // Real Stripe Checkout Session Creation
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${hotelName} - ${booking.roomType}`,
              description: `${booking.nights} night(s) reservation for ${booking.guests} guest(s)`,
              images: [hotelImage],
            },
            unit_amount: Math.round(booking.totalAmount * 100), // In Cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: booking.userEmail,
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        bookingId: booking._id.toString(),
        userId: booking.userId,
      },
    });

    booking.stripeSessionId = session.id;
    await booking.save();

    res.json({
      success: true,
      url: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    console.error("Stripe Checkout Session Error:", error);
    next(error);
  }
};

/**
 * Stripe Webhook Handler to verify signatures and update booking status
 */
export const handleStripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    if (webhookSecret && !webhookSecret.includes("placeholder")) {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } else {
      event = req.body;
    }
  } catch (err) {
    console.error("Stripe Webhook Signature Verification Failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle successful checkout event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const bookingId = session.metadata?.bookingId;

    if (bookingId) {
      try {
        const booking = await Booking.findByIdAndUpdate(
          bookingId,
          {
            paymentStatus: "paid",
            bookingStatus: "confirmed",
            stripePaymentIntentId: session.payment_intent || session.id,
          },
          { new: true }
        ).populate("hotelId");

        if (booking) {
          console.log(`[Stripe Webhook] Booking ${booking.bookingId} marked as PAID & CONFIRMED.`);
          // Send automated confirmation email
          await sendBookingConfirmationEmail(booking);
        }
      } catch (dbError) {
        console.error("Error updating booking via webhook:", dbError.message);
      }
    }
  }

  res.json({ received: true });
};
