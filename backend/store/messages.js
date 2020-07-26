const mongoose = require("mongoose");
const { date } = require("joi");

const messageSchema = new mongoose.Schema({
  fromUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  toUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Listing",
  },
  content: {
    type: String,
  },
  dateTime: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
