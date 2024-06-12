const express = require("express");
const router = express.Router();
const {
  addUser,
  approveUser,
  rejectUser,
  getAllUsers,
} = require("../Controller/adminController");
const { verifyToken, rolemiddleware } = require("../Middleware/authMiddleware");

router.post("/adduser", verifyToken, rolemiddleware(["HR"]), addUser);
router.get("/users", verifyToken, rolemiddleware(["HR"]), getAllUsers);

router.put("/approve/:id",verifyToken,rolemiddleware(["Admin"]),approveUser);
router.put("/reject/:id", verifyToken, rolemiddleware(["Admin"]), rejectUser);
router.get("/allusers", verifyToken, rolemiddleware(["Admin"]), getAllUsers);

module.exports = router;
