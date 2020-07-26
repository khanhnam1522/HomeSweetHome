const express = require("express");
const router = express.Router();

const db = require("../store");
const auth = require("../middleware/auth");
const listingMapper = require("../mappers/listings");

router.get("/:id", auth, async (req, res) => {
  const listing = await db.Listing.find({ userId: req.params.id });
  if (!listing) return res.status(404).send();
  const resource = listing.map(listingMapper);
  res.send(resource);
});

module.exports = router;
