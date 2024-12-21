// const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

// create schema object for Menu Items
const menuSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      minlength: 3,
    },
    recipe: String,
    image: String,
    category: String,
    price: Number,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "menu" }
);

// create model
const Menu = model("menu", menuSchema);
module.exports = Menu;
