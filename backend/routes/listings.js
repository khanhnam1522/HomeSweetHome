const express = require("express");
const router = express.Router();
const Joi = require("joi");
const multer = require("multer");

const validateWith = require("../middleware/validation");
const auth = require("../middleware/auth");
const imageResize = require("../middleware/imageResize");
const delay = require("../middleware/delay");
const listingMapper = require("../mappers/listings");
const config = require("config");
const db = require("../store");

const upload = multer({
  dest: "uploads/",
  limits: { fieldSize: 25 * 1024 * 1024 },
});

const schema = {
  title: Joi.string().required(),
  description: Joi.string().allow(""),
  price: Joi.number().required().min(1),
  address: Joi.string().optional(),
};

router.get("/", async (req, res) => {
  const listings = await db.Listing.find().sort({ createdAt: "desc" });
  const resources = listings.map(listingMapper);
  res.send(resources);
});

router.post(
  "/",
  [
    // Order of these middleware matters.
    // "upload" should come before other "validate" because we have to handle
    // multi-part form data. Once the upload middleware from multer applied,
    // request.body will be populated and we can validate it. This means
    // if the request is invalid, we'll end up with one or more image files
    // stored in the uploads folder. We'll need to clean up this folder
    // using a separate process.
    // auth,
    upload.array("images", config.get("maxImageCount")),
    validateWith(schema),
    imageResize,
  ],
  auth,

  async (req, res) => {
    const listing = {
      title: req.body.title,
      price: parseFloat(req.body.price),
      address: req.body.address,
      description: req.body.description,
    };
    listing.images = req.images.map((fileName) => ({ fileName: fileName }));
    if (req.body.location) listing.location = JSON.parse(req.body.location);
    if (req.user) {
      listing.userId = req.user.userId;
      const user = await db.User.findById(req.user.userId);
      listing.userName = user.name;
      const listings = await db.Listing.find({ userId: req.user.userId });
      listing.listingNumber = listings.length + 1;
    }

    const newListing = new db.Listing(listing);
    await newListing.save();
    res.status(201).send(listing);
  }
);

module.exports = router;
