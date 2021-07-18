const express = require("express");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator");
const { getAllComments } = require("../sql/Comments");

router.get("/", async (req, res) => {
  try {
    const comments = await getAllComments();

    res.json(comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
