import React, { useState } from "react";

const AdminDashboard = () => {
  const handleApproval = (id, status) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, status: status } : user
    );
    setUsers(updatedUsers);
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div className="user-list">
        {users.map((user) => (
          <div key={user.id} className="user-item">
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
            <p>Status: {user.status}</p>
            <button onClick={() => handleApproval(user.id, "Approved")}>
              Approve
            </button>
            <button onClick={() => handleApproval(user.id, "Rejected")}>
              Reject
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
