// express is a web framework used to build servers and APIs.
const express = require("express");

// Mongoose is an Object Data Modeling (ODM) library that helps Node.js interact with MongoDB using schemas and models.
const mongoose = require("mongoose");

// CORS stands for Cross-Origin Resource Sharing.It allows your backend to accept requests from a frontend running on another origin (different domain, port, or protocol).
const cors = require("cors");

const UserModel = require("./models/Users");
const app = express();

// app.use() registers middleware. Middleware is a function that runs before the request reaches your route. When we write: app.use(cors()); every incoming request first passes through the CORS middleware.
app.use(cors());

// Register the built-in JSON middleware. It parses incoming JSON request bodies and makes the data available in req.body.
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/crud");

app.get("/", (req, res) => {
  UserModel.find({})
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.get("/getUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findById({ _id: id })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.put("/updateUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndUpdate(
    { _id: id },
    { name: req.body.name, email: req.body.email, age: req.body.age },
  )
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.delete("/deleteUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndDelete({ _id: id })
    .then((res) => res.json(res))
    .catch((err) => res.json(err));
});

app.post("/createUser", (req, res) => {
  UserModel.create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});
// Start the server on port 3001.
app.listen(3001, () => {
  console.log("Server is Running");
});
