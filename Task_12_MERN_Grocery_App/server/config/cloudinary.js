import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = () => {
  if (
    process.env.CLOUDINARY_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  ) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    console.log("Cloudinary Configured");
  } else {
    console.log("Cloudinary credentials not provided in .env (falling back to mock/direct URLs)");
  }
};

export { cloudinary, connectCloudinary };
