const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

// 1st parameter --> connection name , 2nd parameter --> schema we created above
const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
