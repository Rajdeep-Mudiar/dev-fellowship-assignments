import app from "../Task_12_MERN_Grocery_App/server/server.js";
import connectDB from "../Task_12_MERN_Grocery_App/server/config/mongodb.js";
import { connectCloudinary } from "../Task_12_MERN_Grocery_App/server/config/cloudinary.js";

export default async function handler(req, res) {
  try {
    await connectDB();
    connectCloudinary();
  } catch (err) {
    console.error("Vercel Serverless DB init error:", err);
  }
  return app(req, res);
}
