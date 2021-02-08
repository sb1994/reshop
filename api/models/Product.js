const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  brand: {
    type: String,
  },
  dimension: {
    type: String,
  },
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  currency_buyer: {
    type: String,
  },
  rating: {
    type: String,
  },
  categories: [String],
  color: {
    type: String,
  },
  inventory: {
    type: Number,
  },
  images: [],
});

module.exports = Product = mongoose.model("products", ProductSchema);
