import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { email, password };
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/signin",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);

      navigate("/hr-dashboard");
    } catch (error) {
      console.error(error);
    }
  };
  // const navigateuser = (user) => {
  //   if (user.role === "Admin") {
  //     navigate("/admin-dashboard");
  //   } else if (user.role === "HR") {
  //     navigate("/hr-dashboard");
  //   } else {
  //     console.error("Invalid user role:", user.role);
  //     setError("Invalid user role. Please");
  //   }
  // };

  return (
    <div className="main-container-signin">
      <div className="container-2">
        <div className="header-2">
          <div className="text-2" style={{ fontFamily: "Serif" }}>
            Now Login Here!
          </div>
          <br />
          <div className="underline-2"></div>
        </div>
        <div>
          <input
            style={{ fontFamily: "Serif" }}
            onChange={(e) => setEmail(e.currentTarget.value)}
            placeholder="Enter Email"
            type="email"
            value={email}
          />
          <br />
          <input
            style={{ fontFamily: "Serif" }}
            onChange={(e) => setPassword(e.currentTarget.value)}
            placeholder="Enter Password"
            type="password"
            value={password}
          />
        </div>
        <br />
        <div>
          <button onClick={handleSubmit} style={{ fontFamily: "Serif" }}>
            Login
          </button>
        </div>
        <br />
        <div>
          <Link to="/signup">
            <b style={{ fontFamily: "Serif", color: "skyblue" }}>
              Don't have an account? Signup
            </b>
          </Link>
        </div>
      </div>
    </div>
  );
}
