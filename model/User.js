const mongoose = require("mongoose");
const { Schema } = mongoose;

// schema model

const userSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      trim: true,
      minLength: 3,
    },
    photoUrl: String,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { collection: "user" }
);

// create model
const User = mongoose.model("User", userSchema);

module.exports = User;
