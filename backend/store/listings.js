const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  images: [
    {
      fileName: String,
    },
  ],
  price: {
    type: Number,
  },
  categoryId: {
    type: Number,
  },
  userId: {
    type: String,
  },
  userName: {
    type: String,
  },
  listingNumber: {
    type: Number,
  },
  address: {
    type: String,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
