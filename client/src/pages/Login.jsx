import React, { useState, useEffect } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    const userId = localStorage.getItem('userId');
    if (role === "user" && userId) {
      navigate("/userdashboard");
    }
  }, [navigate]);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrorMsg("");
  };

  // Handle login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/examinee/login",
        form
      );

      if (res.data.message === "Login Successfully") {
        localStorage.setItem("userEmail", res.data.user.email);
        localStorage.setItem("userId", res.data.user.id);
        localStorage.setItem("userRole", res.data.user.role);
        window.location.href = "/userdashboard";
      } else {
        setErrorMsg(res.data.message || "Invalid credentials.");
      }
    } catch (error) {
      console.error(error);
      setErrorMsg(error.response?.data?.message || "Email or Password does not match.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="login-page">
          <h1 className="final-name">Exam Prep</h1>

          <div className="login-container">
            <h2 className="logo">Login</h2>

            {errorMsg && (
              <div style={{
                color: "#ffedb5",
                backgroundColor: "rgba(220, 53, 69, 0.35)",
                border: "1px solid #ffedb5",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "15px",
                fontSize: "0.9rem"
              }}>
                {errorMsg}
              </div>
            )}

            <div className="input-btn">
              <input
                type="text"
                name="email"
                placeholder="Enter Username"
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-btn">
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                onChange={handleChange}
                required
              />
            </div>

            <p className="forgot-btn">Forgot?</p>

            <button className="login-btn" type="submit">
              Login
            </button>

            <p className="register-btn">
              Don&apos;t have an account? <Link to="/register">Register</Link>
            </p>

            <p className="register-btn" style={{ marginTop: "15px" }}>
              Are you an Admin? <Link to="/adminlogin">Login as Admin</Link>
            </p>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
