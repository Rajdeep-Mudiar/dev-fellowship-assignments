import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        product: {
          type: Object,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
    amount: {
      type: Number,
      required: true,
    },
    address: {
      type: Object,
      required: true,
    },
    status: {
      type: String,
      enum: ["Order Placed", "Processing", "Out for Delivery", "Delivered", "Cancelled"],
      default: "Order Placed",
    },
    paymentType: {
      type: String,
      enum: ["COD", "Stripe", "Online"],
      default: "COD",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    stripeSessionId: {
      type: String,
      default: "",
    },
    deliverySlot: {
      type: String,
      default: "Express Delivery (30 mins)",
    },
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
