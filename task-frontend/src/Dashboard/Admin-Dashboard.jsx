import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Admin-Dashboard.css";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [approveUsers, setApproveUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get("http://localhost:8000/pendingusers", {
          headers: {
            Authorization: `${token}`,
          },
        });
        console.log("Pending users response data:", response.data);
        setUsers(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to fetch users. Please try again.");
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchApproveUsers = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get("http://localhost:8000/approveusers", {
          headers: {
            Authorization: `${token}`,
          },
        });

        console.log("Approved users response data:", response.data);
        setApproveUsers(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching approved users:", error);
        setError("Failed to fetch approved users. Please try again.");
      }
    };

    fetchApproveUsers();
  }, []);

  const handleApproveUser = async (userId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:8000/approve/${userId}`,
        {},
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error approving user:", error);
      setError("Failed to approve user. Please try again.");
    }
  };

  const handleRejectUser = async (userId) => {
    const token = localStorage.getItem("token");

    try {
      await axios.put(
        `http://localhost:8000/reject/${userId}`,
        {},
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error rejecting user:", error);
      setError("Failed to reject user. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h2>Admin Dashboard</h2>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </header>
      {error && <p className="error-message">{error}</p>}
      <h3>Pending Users</h3>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Experience</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.experience}</td>
              <td>{user.status}</td>
              <td>
                <button
                  className="approve-button"
                  onClick={() => handleApproveUser(user._id)}
                >
                  Approve
                </button>
                <button
                  className="reject-button"
                  onClick={() => handleRejectUser(user._id)}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Approved Users</h3>
      <ul className="approved-users-list">
        {approveUsers && approveUsers.length > 0 ? (
          approveUsers.map((user) => (
            <li key={user._id}>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Role: {user.role}</p>
              <p>Experience: {user.experience}</p>
              <p>Status: {user.status}</p>
            </li>
          ))
        ) : (
          <p>No approved users found.</p>
        )}
      </ul>
    </div>
  );
}
