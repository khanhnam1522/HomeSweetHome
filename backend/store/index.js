mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://namt:nam150297@moviegamesearch-sgagf.gcp.mongodb.net/house_rental_db?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

module.exports.User = require("./users");
module.exports.Listing = require("./listings");
module.exports.Message = require("./messages");
