import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import noteRouter from "./routes/noteRoutes.js";
const app = express();
const port = process.env.PORT || 8000;
connectDB();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  "http://localhost:8000"
];
// All the request will be pass in the form of json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(cors({
  origin: (origin, callback) => {
    // Dynamically allow the requesting origin to support any deployment/custom domains
    callback(null, true);
  },
  credentials: true
}));

// API Endpoints
app.get("/", (req, res) => res.send("API Working"));
app.use("/api/auth", authRouter);

// /api/user/data
app.use("/api/user", userRouter);

// /api/note
app.use("/api/note", noteRouter);

if (!process.env.VERCEL) {
  app.listen(port, () => console.log(`Server started on PORT: ${port}`));
}

export default app;
