import React, { useState, useEffect } from "react";
import axios from "axios";

const HRDashboard = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      fetchUsers(storedToken);
    } else {
      console.error("No token found");
    }
  }, []);

  const fetchUsers = async (token) => {
    try {
      const response = await axios.get("http://localhost:8000/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();

    const newUser = {
      name: name,
      email: email,
      role: role,
    };

    try {
      await axios.post("http://localhost:8000/adduser", newUser, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setName("");
      setEmail("");
      setRole("");
      fetchUsers(token);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div className="hr-dashboard">
      <h2>HR Dashboard</h2>
      <form className="add-user-form" onSubmit={handleAddUser}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <button type="submit">Add Employee</button>
      </form>
      <div className="user-list">
        {users.map((user) => (
          <div key={user.id} className="user-item">
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HRDashboard;
