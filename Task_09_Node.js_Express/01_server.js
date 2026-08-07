const express = require("express");
const path = require("path");

const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
  //   res.send({message:"Hello rajdeep"});
});
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
  //   res.send({message:"Hello rajdeep"});
});
app.listen(8000, () => console.log("Server is running on port 8000"));
