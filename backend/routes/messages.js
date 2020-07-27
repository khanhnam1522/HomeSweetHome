const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { Expo } = require("expo-server-sdk");

const sendPushNotification = require("../utilities/pushNotifications");
const auth = require("../middleware/auth");
const validateWith = require("../middleware/validation");
const db = require("../store");

const schema = {
  listingId: Joi.string().required(),
  message: Joi.string().required(),
};

router.get("/", auth, async (req, res) => {
  const messages = await db.Message.find({
    $or: [
      { fromUser: { _id: req.user.userId } },
      { toUser: { _id: req.user.userId } },
    ],
  })
    .sort({ dateTime: "desc" })
    .populate("fromUser")
    .populate("toUser");
  const resources = messages.map((message) => ({
    ...message.toObject(),
    currentUser: req.user.userId,
  }));
  res.send(resources);
});

router.post("/", [auth, validateWith(schema)], async (req, res) => {
  const { listingId, message } = req.body;

  const listing = await db.Listing.findById(listingId);
  if (!listing) return res.status(400).send({ error: "Invalid listingId." });

  const toUser = await db.User.findById(listing.userId);
  if (!toUser) return res.status(400).send({ error: "Invalid userId." });

  const fromUser = await db.User.findById(req.user.userId);
  if (!fromUser) return res.status(400).send({ error: "Invalid userId." });

  const newMessage = {
    fromUser: fromUser,
    toUser: toUser,
    listing: listing,
    content: message,
  };

  const newM = new db.Message(newMessage);
  await newM.save();

  const { expoPushToken } = toUser;

  if (Expo.isExpoPushToken(expoPushToken))
    await sendPushNotification(expoPushToken, message);

  res.status(201).send(newMessage);
});

module.exports = router;
