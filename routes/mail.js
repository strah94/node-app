const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const { getUserByEmail, addUser } = require("../sql/Users");
const nodemailer = require("nodemailer");

router.post(
  "/",
  [check("email", "Please include a valid email").isEmail()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    try {
      //Check if email exist
      let existingUser = await getUserByEmail(email);

      if (existingUser.length === 0) {
        return res.status(400).json({ msg: "Mail doesn't exist" });
      }

      contentHTML = `
      <h1>Please click on the link to reset password</h1>
       
      <a href='http://localhost:3000/resetPassword/${existingUser[0].id}'>http://localhost:3000/resetPassword/${existingUser[0].id}</a>
  `;

      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: config.get("userGmail"),
          pass: config.get("passGmail"),
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      let info = await transporter.sendMail({
        from: config.get("userGmail"),
        to: `${email}`,
        subject: "Email password reset",
        html: contentHTML,
      });

      res.json({ msg: "Mail has been sent" });
      console.log("Message sent: %s", info.messageId);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
