const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const { getUserByEmail, addUser } = require("../sql/Users");

router.post(
  "/",
  [
    check("email", "Please include valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      let existingUser = await getUserByEmail(email);

      //Checking email
      if (existingUser.length === 0) {
        return res.status(400).json({ msg: "Invalid Email" });
      }

      //  Checking password - bcrypt.compare returns true or false
      const isMatch = await bcrypt.compare(password, existingUser[0].password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Password" });
      }

      const payload = {
        user: {
          id: existingUser[0].id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 3600000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
