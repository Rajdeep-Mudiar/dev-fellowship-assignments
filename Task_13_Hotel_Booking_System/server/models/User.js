import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true },
    name: { type: String, default: "" },
    image: { type: String, default: "" },
    role: {
      type: String,
      enum: ["user", "admin", "hotelOwner"],
      default: "user",
    },
    recentSearchedCities: [{ type: String }],
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
