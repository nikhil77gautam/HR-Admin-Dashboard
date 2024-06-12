const Employee = require("../Models/admin");

// Add Users:
const addUser = async (req, res) => {
  const { name, email, role } = req.body;

  try {
    const userExists = await Employee.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new Employee({
      name,
      email,
      role,
    });

    await user.save();
    res.status(201).json({
      success: "Employee added successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Approve Users:
const approveUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Employee.findByIdAndUpdate(
      id,
      { status: "approved" },
      { new: true }
    );

    if (user) {
      res.status(200).json({ message: "User approved successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reject Users:
const rejectUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Employee.findByIdAndUpdate(
      id,
      { status: "rejected" },
      { new: true }
    );

    if (user) {
      res.status(200).json({ message: "User rejected successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Users:
const getAllUsers = async (req, res) => {
  try {
    const users = await Employee.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addUser, approveUser, getAllUsers, rejectUser };
