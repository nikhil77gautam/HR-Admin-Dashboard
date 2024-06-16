const express = require("express");
const router = express.Router();
const {
  addUser,
  approveUser,
  rejectUser,
  getAllUsers,
  getPendingUsers,
  getApproveUsers,
} = require("../Controller/adminController");
const { verifyToken, rolemiddleware } = require("../Middleware/authMiddleware");

router.get("/pending", verifyToken, rolemiddleware(["HR"]), getPendingUsers);
router.post("/adduser", verifyToken, rolemiddleware(["HR"]), addUser);
router.get("/users", verifyToken, rolemiddleware(["HR"]), getAllUsers);

router.put("/approve/:id", verifyToken, rolemiddleware(["Admin"]), approveUser);
router.put("/reject/:id", verifyToken, rolemiddleware(["Admin"]), rejectUser);
router.get("/allusers", verifyToken, rolemiddleware(["Admin"]), getAllUsers);
router.get(
  "/pendingusers",
  verifyToken,
  rolemiddleware(["Admin"]),
  getPendingUsers
);
router.get(
  "/approveusers",
  verifyToken,
  rolemiddleware(["Admin"]),
  getApproveUsers
);

module.exports = router;
