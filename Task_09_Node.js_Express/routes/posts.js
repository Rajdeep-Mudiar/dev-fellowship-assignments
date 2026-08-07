// const express = require("express");
import express from "express";
import { title } from "process";

import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/postController.js";

const router = express.Router();

// Middleware
// const logger = (req, res, next) => {
//   console.log(
//     `${req.method} ${req.protocol}://${req.get("host")} ${req.originalUrl}`,
//   );

//   next();
// };

// Get all posts
router.get("/", getPosts);

// Get single posts
router.get("/:id", getPost);

// Create new post
router.post("/", createPost);

// Update Post
router.put("/:id", updatePost);

// Delete Post
router.delete("/:id", deletePost);

export default router;
