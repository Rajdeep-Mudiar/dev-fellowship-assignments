import Stripe from "stripe";
import Booking from "../models/Booking.js";
import { sendBookingConfirmationEmail } from "../services/emailService.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder");

/**
 * Create Stripe Checkout Session for a booking
 */
export const createCheckoutSession = async (req, res, next) => {
  try {
    const { bookingId } = req.body;
    const userId = req.userId;

    if (!bookingId) {
      return res.status(400).json({
        success: false,
        message: "Booking ID is required",
      });
    }

    const booking = await Booking.findById(bookingId).populate("hotelId");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking record not found",
      });
    }

    if (booking.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access to this booking",
      });
    }

    if (booking.paymentStatus === "paid") {
      return res.status(400).json({
        success: false,
        message: "This booking is already paid and confirmed",
      });
    }

    const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";

    // If Stripe key is placeholder/development fallback, simulate instant confirmation
    if (
      !process.env.STRIPE_SECRET_KEY ||
      process.env.STRIPE_SECRET_KEY.includes("placeholder")
    ) {
      console.warn("Using simulation checkout URL because Stripe keys are not yet configured.");
      booking.paymentStatus = "paid";
      booking.bookingStatus = "confirmed";
      booking.stripeSessionId = `sim_session_${Date.now()}`;
      await booking.save();
      await sendBookingConfirmationEmail(booking);

      return res.json({
        success: true,
        url: `${clientUrl}/payment/success?bookingId=${booking._id}&simulated=true`,
      });
    }

    // Real Stripe Checkout Session Creation
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${booking.hotelId.name} - ${booking.roomType}`,
              description: `${booking.nights} night(s) reservation for ${booking.guests} guest(s)`,
              images: booking.hotelId.images?.slice(0, 1),
            },
            unit_amount: Math.round(booking.totalAmount * 100), // In Cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: booking.userEmail,
      success_url: `${clientUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}&bookingId=${booking._id}`,
      cancel_url: `${clientUrl}/payment/cancel?bookingId=${booking._id}`,
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
