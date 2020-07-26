const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const db = require("../store");

router.get("/:id", auth, async (req, res) => {
  const userId = req.params.id;
  const user = await db.User.findById(userId);
  if (!user) return res.status(404).send();

  const listings = await db.Listing.find({ userId: userId });
  res.send({
    id: user._id,
    name: user.name,
    email: user.email,
    listings: listings.length,
  });
});

module.exports = router;
