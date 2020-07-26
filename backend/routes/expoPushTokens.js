const express = require("express");
const router = express.Router();
const Joi = require("joi");

const auth = require("../middleware/auth");
const validateWith = require("../middleware/validation");
const db = require("../store");

router.post(
  "/",
  [auth, validateWith({ token: Joi.string().required() })],
  async (req, res) => {
    const user = await db.User.findById(req.user.userId);
    if (!user) return res.status(400).send({ error: "Invalid user." });

    user.expoPushToken = req.body.token;
    console.log("User registered for notifications: ", user);
    res.status(201).send();
  }
);

module.exports = router;
