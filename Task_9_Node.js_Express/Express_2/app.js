import express from "express";

const app = express();

// Config EJS
app.set("view engine", "ejs");
app.set("views", "views");

// Pass values to frontend using res.render 2nd parameter
app.get("/", (req, res) => {
  res.render("index", {
    title: "Welcome",
    message: "Hello from EJS",

    // Passing an array to frontend
    people: ["John", "Rajdeep", "JK"],
  });
});

app.listen(8000, () => {
  console.log("Server started");
});
