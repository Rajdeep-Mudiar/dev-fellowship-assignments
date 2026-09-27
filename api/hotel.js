import app from "../Task_13_Hotel_Booking_System/server/server.js";
import connectDB from "../Task_13_Hotel_Booking_System/server/config/db.js";
import { seedDatabase } from "../Task_13_Hotel_Booking_System/server/config/seedData.js";

export default async function handler(req, res) {
  try {
    await connectDB();
    await seedDatabase();
  } catch (err) {
    console.error("Vercel Serverless DB init error for hotel booking:", err);
  }
  return app(req, res);
}
