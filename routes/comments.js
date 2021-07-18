const express = require("express");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator");
const { getAllComments, addComment } = require("../sql/Comments");

router.get("/", async (req, res) => {
  try {
    const comments = await getAllComments();

    res.json(comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post(
  "/",
  [check("text", "Please add comment").isLength({ min: 1 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { text, postID, userID } = req.body;

    try {
      await addComment(text, postID, userID);
      res.json({ msg: "Comment added" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
