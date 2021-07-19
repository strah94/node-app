const express = require("express");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const {
  getAllPermissions,
  addPermission,
  deletePermission,
  findPermission,
} = require("../sql/Permissions");

router.get("/", async (req, res) => {
  const ownerID = req.query.ownerID;

  try {
    const permissions = await getAllPermissions(ownerID);

    res.json(permissions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/", async (req, res) => {
  const { userID, permissionsUserID } = req.body;

  try {
    let existsAlready = await findPermission(userID, permissionsUserID);

    if (existsAlready.length !== 0) {
      return res.status(400).json({ msg: "User already has permission" });
    }

    await addPermission(userID, permissionsUserID);

    res.json({ msg: "Permission added" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await deletePermission(req.user.id, req.params.id);

    res.json({ msg: "Permission removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
