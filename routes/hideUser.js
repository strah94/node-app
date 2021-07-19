const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const { getUserById } = require("../sql/Users");
const { hideUser } = require("../sql/Users");

router.post(
  "/",

  async (req, res) => {
    const { userID } = req.body;

    try {
      //Check if email exist
      let existingUser = await getUserById(userID);

      if (+existingUser[0].hidden !== 0) {
        return res.status(400).json({ msg: "User already hidden" });
      }

      await hideUser(userID);

      res.json({ msg: "User hidden" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
