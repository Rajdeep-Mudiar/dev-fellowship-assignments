import express from "express";
import {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
} from "../controllers/noteController.js";
import userAuth from "../middleware/userAuth.js";

const noteRouter = express.Router();

noteRouter.post("/create", userAuth, createNote);
noteRouter.get("/get", userAuth, getNotes);
noteRouter.post("/update", userAuth, updateNote);
noteRouter.post("/delete", userAuth, deleteNote);

export default noteRouter;
