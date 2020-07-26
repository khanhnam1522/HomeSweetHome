const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateWith = require("../middleware/validation");
const db = require("../store");
const bcrypt = require("bcrypt");

const schema = {
  name: Joi.string().required().min(2),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(5),
};

router.post("/", validateWith(schema), async (req, res) => {
  const { name, email } = req.body;
  var { password } = req.body;
  if (await db.User.findOne({ email: email }))
    return res
      .status(400)
      .send({ error: "A user with the given email already exists." });
  let hashedPassword = await bcrypt.hash(password, 10);
  password = hashedPassword;
  const user = new db.User({ name, email, password });
  await user.save();

  res.status(201).send(user);
});

router.get("/", async (req, res) => {
  res.send(await db.User.find());
});

module.exports = router;
