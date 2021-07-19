const express = require("express");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator");
const { getEditHistory } = require("../sql/Posts");

router.post(
  "/",
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 }),
  async (req, res) => {
    const { postID } = req.body;
    console.log("edit history");
    console.log(postID);
    try {
      let editHistory = await getEditHistory(postID);
      res.json(editHistory);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
