const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema(
  {
    menuItemId: String,
    name: {
      type: String,
      trim: true,
      required: true,
      minlength: 3,
    },
    recipe: String,
    image: String,
    price: Number,
    quantity: Number,
    email: {
      type: String,
      true: true,
      required: true,
    },
  },
  { collection: "cart" }
);

const Carts = mongoose.model("cart", cartSchema);

module.exports = Carts;
