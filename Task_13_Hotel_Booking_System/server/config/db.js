import mongoose from "mongoose";

const DEFAULT_URI =
  "mongodb+srv://rajdeepmudiar01_db_user:BNKIDuG1WC8TKuAg@cluster0.rstqabv.mongodb.net/?appName=Cluster0";

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

    const uri = process.env.MONGODB_URI || DEFAULT_URI;

    await mongoose.connect(uri, {
      dbName: "quickstay-hotel-booking",
      serverSelectionTimeoutMS: 5000,
    });
  } catch (error) {
    console.error("MongoDB connection notice:", error.message);
  }
};

export default connectDB;
