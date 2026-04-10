const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unqiue: [true, "Username already exists!"],
    required: [true, "Username is required!"],
  },
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  Bio: {
    type: String,
  },
  profileImage: {
    type: String,
    default: "https://ik.imagekit.io/warrior2004/Instagram/Profile_Photo.jpg",
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
