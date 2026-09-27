import app from "../Task_13_Hotel_Booking_System/server/server.js";
import connectDB from "../Task_13_Hotel_Booking_System/server/config/db.js";

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (err) {
    console.warn("Vercel Serverless DB init notice:", err.message);
  }
  return app(req, res);
}
