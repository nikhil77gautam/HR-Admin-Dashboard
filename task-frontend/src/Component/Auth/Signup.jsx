import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("HR");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { name, email, password, role };
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/signup",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.error(
        "There was an error signing up:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="main-container-signup">
      <div className="container-2">
        <div className="header-2">
          <div className="text-2" style={{ fontFamily: "Serif" }}>
            Signup Here!
          </div>
          <br />
          <div className="underline-2"></div>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              style={{ fontFamily: "Serif" }}
              onChange={(e) => setName(e.currentTarget.value)}
              placeholder="Enter Name"
              type="text"
              value={name}
              required
            />
            <br />
            <input
              style={{ fontFamily: "Serif" }}
              onChange={(e) => setEmail(e.currentTarget.value)}
              placeholder="Enter Email"
              type="email"
              value={email}
              required
            />
            <br />
            <input
              style={{ fontFamily: "Serif" }}
              onChange={(e) => setPassword(e.currentTarget.value)}
              placeholder="Enter Password"
              type="password"
              value={password}
              required
            />
            <br />
            <select
              name="role"
              value={role}
              onChange={(e) => setRole(e.currentTarget.value)}
              required
            >
              <option value="HR">HR</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <br />
          <div>
            <button type="submit" style={{ fontFamily: "Serif" }}>
              Signup
            </button>
          </div>
        </form>
        <br />
        <div>
          <Link to="/">
            <b style={{ fontFamily: "Serif", color: "skyblue" }}>
              Already have an account? Login
            </b>
          </Link>
        </div>
      </div>
    </div>
  );
}