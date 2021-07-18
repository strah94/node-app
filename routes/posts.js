const express = require("express");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator");
const { getAllPosts } = require("../sql/Posts");

router.get("/", async (req, res) => {
  try {
    const posts = await getAllPosts();
    console.log(posts);

    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
