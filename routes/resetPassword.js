const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const { resetPassword } = require("../sql/Users");
const nodemailer = require("nodemailer");

router.post(
  "/",
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { password, id } = req.body;

    //Hashing with bcrypt
    const salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);

    //Update password
    await resetPassword(hashedPassword, id);

    res.json({ msg: "Password updated successfuly" });
    // console.log(password, id);
    // console.log();
    try {
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
