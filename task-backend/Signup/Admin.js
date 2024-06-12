const User = require("../Models/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const adminUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    //  Hash the Password:
    const hashedPassword = await bcrypt.hash(password, 5);

    // Update user's password
    await User.findOneAndUpdate({ email }, { password: hashedPassword });

    // Create New User:
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { adminUser };
