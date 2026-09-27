import mongoose from "mongoose";

// Disable buffering so failed DB connections immediately fallback instead of timing out
mongoose.set("bufferCommands", false);

const DEFAULT_URI =
  "mongodb+srv://rajdeepmudiar01_db_user:BNKIDuG1WC8TKuAg@cluster0.rstqabv.mongodb.net/?appName=Cluster0";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    const uri = process.env.MONGODB_URI || DEFAULT_URI;

    await mongoose.connect(uri, {
      dbName: "quickstay-hotel-booking",
      serverSelectionTimeoutMS: 2500,
      connectTimeoutMS: 2500,
    });
    console.log("MongoDB Database Connected successfully");
  } catch (error) {
    console.warn("MongoDB connection notice (will use in-memory fallback):", error.message);
  }
};

export default connectDB;
