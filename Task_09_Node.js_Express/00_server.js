const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Hello raj</h1>");
  //   res.send({message:"Hello rajdeep"});
});
app.get("/about", (req, res) => {
  res.send("About section");
  //   res.send({message:"Hello rajdeep"});
});
app.listen(8000, () => console.log("Server is running on port 8000"));
