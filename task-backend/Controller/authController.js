const User = require("../Models/auth"); 
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// User's login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (user && (await bcrypt.compare(password, user.password))) {
      // Generate token
      const token = jwt.sign({ id: user._id, role: user.role }, "12345");

      // Send response with user details 
      return res.json({
        success: true,
        message: "Logged in successfully",
        token: token,
        name: user.name,
        role: user.role,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { loginUser };
