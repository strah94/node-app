const express = require("express");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator");
const { getAllPosts, addPost } = require("../sql/Posts");

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

router.post(
  "/",
  [
    check("title", "Please add title").isLength({ min: 1 }),
    check("postText", "Please add post text").isLength({ min: 1 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, postText, userID } = req.body;

    try {
      await addPost(title, postText, userID);
      res.json({ msg: "Post added" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
