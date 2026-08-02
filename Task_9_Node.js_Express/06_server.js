// const express = require("express");
import express from "express";
// const path = require("path");
import path from "path";
import posts from "./routes/posts.js";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/error.js";
// const posts = require("./routes/posts");
const port = process.env.PORT || 8000;
const app = express();

// Body Parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger Middleware
app.use(logger);

// Routes
app.use("/api/posts", posts);

// Error Handler
app.use(errorHandler);

app.listen(port, () => console.log("Server is running on port 8000"));
