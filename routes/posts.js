const express = require("express");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const {
  getAllPosts,
  addPost,
  getPostById,
  deletePost,
  updatePost,
  saveToEditHistory,
} = require("../sql/Posts");

const { getAllPermissions } = require("../sql/Permissions");
const { deleteComments } = require("../sql/Comments");

router.get("/", async (req, res) => {
  try {
    const posts = await getAllPosts();

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

router.put("/:id", auth, async (req, res) => {
  const { postTitle, postText, userID } = req.body;

  try {
    let post = await getPostById(req.params.id);
    let permissions = await getAllPermissions(post[0].owner_id);

    let havePermission = permissions.filter((permissionsUser) => {
      return permissionsUser.write_user_id === req.user.id;
    });

    if (havePermission.length === 0 && post[0].owner_id !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await updatePost(postTitle, postText, req.params.id);
    await saveToEditHistory(post[0].id, req.user.id);

    res.json({ msg: "Post updated" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    let post = await getPostById(req.params.id);

    if (post[0].owner_id !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await deletePost(req.params.id);
    await deleteComments(req.params.id);

    res.json({ msg: "Post removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
