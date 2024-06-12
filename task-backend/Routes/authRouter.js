const express = require("express");
const { loginUser } = require("../Controller/authController");
const { adminUser } = require("../Signup/Admin");
const { hrUser } = require("../Signup/Hr");

const router = express.Router();

router.post("/signup/admin", adminUser);
router.post("/signup", hrUser);
router.post("/signin", loginUser);

module.exports = router;
