import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    mongoose.connection.on("connected", () => {
      console.log("MongoDB Database Connected successfully");
    });

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB Connection Error:", err.message);
    });

    const uri = process.env.MONGODB_URI;
    if (!uri) {
      console.warn("MONGODB_URI not found in environment variables.");
      return;
    }

    await mongoose.connect(uri, {
      dbName: "greencart-grocery",
      serverSelectionTimeoutMS: 5000,
    });
  } catch (error) {
    console.error("MongoDB connection notice:", error.message);
  }
};

export default connectDB;
