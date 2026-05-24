import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const role = localStorage.getItem('adminRole');
    const adminId = localStorage.getItem('adminId');
    if (role === "admin" && adminId) {
      navigate("/admindashboard");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", form);
      if (res.data.message === "Login Successfully") {
        localStorage.setItem("adminEmail", res.data.admin.email);
        localStorage.setItem("adminId", res.data.admin.id);
        localStorage.setItem("adminRole", res.data.admin.role);
        alert("Login Successful!");
        navigate("/admindashboard");
      } else {
        setErrorMsg(res.data.message || "Failed to login. Check credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setErrorMsg(err.response?.data?.message || "Invalid Email or Password.");
    }
  };

  return (
    <>
      <style>{`
        .login-container {
          height: 100vh;
          width: 100vw;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #2c2c2c, #4f4f4f);
          font-family: "Segoe UI", sans-serif;
        }

        .login-card {
          background: #f5f5f5;
          padding: 2.5rem;
          border-radius: 18px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
          width: 100%;
          max-width: 380px;
          text-align: center;
          animation: fadeIn 0.8s ease-in-out;
        }

        .login-title {
          font-size: 1.8rem;
          font-weight: bold;
          color: #222;
          margin-bottom: 0.5rem;
        }

        .login-subtitle {
          font-size: 0.9rem;
          color: #666;
          margin-bottom: 1.5rem;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .form-group {
          text-align: left;
        }

        .form-group label {
          font-size: 0.9rem;
          color: #444;
          margin-bottom: 0.3rem;
          display: block;
        }

        .form-group input {
          width: 100%;
          padding: 10px 12px;
          border-radius: 10px;
          border: 1px solid #bbb;
          outline: none;
          font-size: 0.95rem;
          transition: 0.3s;
          background: #fff;
        }

        .form-group input:focus {
          border-color: #555;
          box-shadow: 0 0 6px rgba(85, 85, 85, 0.4);
        }

        .login-btn {
          background: linear-gradient(135deg, #555, #333);
          color: white;
          font-size: 1rem;
          font-weight: bold;
          padding: 12px;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: 0.3s;
        }

        .login-btn:hover {
          background: linear-gradient(135deg, #333, #555);
          transform: scale(1.03);
        }

        .forgot-password {
          margin-top: 1rem;
        }

        .forgot-password a {
          font-size: 0.85rem;
          color: #333;
          text-decoration: none;
          transition: 0.2s;
        }

        .forgot-password a:hover {
          text-decoration: underline;
          color: #000;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="login-container">
        <div className="login-card">
          <h2 className="login-title">Admin Login</h2>
          <p className="login-subtitle">Enter your credentials to continue</p>
          {errorMsg && (
            <div style={{
              color: "#d9534f",
              backgroundColor: "#f9e2e2",
              border: "1px solid #d9534f",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "15px",
              fontSize: "0.9rem"
            }}>
              {errorMsg}
            </div>
          )}
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="admin@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>

            <button type="submit" className="login-btn">Login</button>
          </form>
          <div className="forgot-password">
            <a href="#">Forgot Password?</a>
          </div>
          <div style={{ marginTop: "15px", fontSize: "0.85rem", color: "#666" }}>
            Are you a Student? <Link to="/" style={{ color: "#333", fontWeight: "600", textDecoration: "none" }} onMouseOver={e=>e.target.style.textDecoration="underline"} onMouseOut={e=>e.target.style.textDecoration="none"}>Login as Student</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
