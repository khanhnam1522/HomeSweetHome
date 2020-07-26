const express = require("express");
const router = express.Router();
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const validateWith = require("../middleware/validation");
const db = require("../store");
const bcrypt = require("bcrypt");

const schema = {
  email: Joi.string().email().required(),
  password: Joi.string().required().min(5),
};

router.post("/", validateWith(schema), async (req, res) => {
  const { email, password } = req.body;
  const user = await db.User.findOne({ email: email });
  let isMatch = await bcrypt.compare(password, user.password);
  if (!user || !isMatch)
    return res.status(400).send({ error: "Invalid email or password." });

  const token = jwt.sign(
    { userId: user._id, name: user.name, email },
    "jwtPrivateKey"
  );
  res.send(token);
});

module.exports = router;
