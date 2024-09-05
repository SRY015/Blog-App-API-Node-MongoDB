const router = require("express").Router();
const {
  getUserById,
  updateUser,
  deleteUser,
} = require("../controller/user.controller");

// Get User By Id --->
router.get("/:id", getUserById);

// UPDATE USER --->
router.put("/:id", updateUser);

// DELETE USER --->
router.delete("/:id", deleteUser);

module.exports = router;
