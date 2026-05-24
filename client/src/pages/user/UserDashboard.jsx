/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Link, Outlet } from 'react-router'

const UserDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  const role = localStorage.getItem('userRole');
  if (role !== "user") {
    window.location.href = "/";
    return null;
  }
  const email = localStorage.getItem('userEmail');

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const handlelogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    window.location.href = "/";
  };

  return (
    <div
      className="main"
      style={{
        height: "100vh",
        display: "flex",
        width: "100vw",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      {/* Sidebar */}
      <div
        className="left"
        style={{
          height: "100%",
          width: "18%",
          backgroundColor: "#1E293B", // dark slate
          color: "white",
          paddingTop: "20px",
        }}
      >
        <h3
          className="head text-center"
          style={{
            fontSize: "32px",
            marginBottom: "30px",
            fontWeight: "bold",
            color: "#F8FAFC",
          }}
        >
          User
        </h3>

        <ul className="nav flex-column ms-3">
          {[
            { to: "/userdashboard/myexams", label: "My Exams", icon: "fa-calendar" },
            { to: "/userdashboard/myresults", label: "My Result", icon: "fa-book" },
            { to: "/userdashboard/changepassword", label: "Change Password", icon: "fa-user-tie" },
            { to: "/userdashboard/message", label: "Message", icon: "fa-message" },
          ].map((item, idx) => (
            <li key={idx} className="nav-item mb-3">
              <Link
                className="nav-link w-75 border border-2 rounded"
                to={item.to}
                style={{
                  color: "#F8FAFC",
                  padding: "10px 15px",
                  display: "block",
                  backgroundColor: "#334155",
                  transition: "all 0.3s ease",
                  textDecoration: "none",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#3B82F6";
                  e.currentTarget.style.color = "white";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "#334155";
                  e.currentTarget.style.color = "#F8FAFC";
                }}
              >
                <i className={`fa-solid ${item.icon} me-2`}></i>
                {item.label}
              </Link>
            </li>
          ))}

          {/* Logout */}
          <li className="nav-item">
            <Link
              className="nav-link w-75 border border-2 rounded"
              to="/"
              style={{
                color: "#F87171",
                padding: "10px 15px",
                display: "block",
                backgroundColor: "#334155",
                transition: "all 0.3s ease",
                textDecoration: "none",
              }}
              onClick={handlelogout}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#DC2626";
                e.currentTarget.style.color = "white";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "#334155";
                e.currentTarget.style.color = "#F87171";
              }}
            >
              <i className="fa-solid fa-arrow-right-from-bracket me-2"></i> Logout
            </Link>
          </li>
        </ul>
      </div>

      {/* Right Content */}
      <div
        className="right"
        style={{
          height: "100%",
          width: "82%",
          backgroundColor: "#F1F5F9", // light slate
        }}
      >
        {/* Topbar */}
        <div
          className="top d-flex align-items-center"
          style={{
            height: "80px",
            width: "100%",
            backgroundColor: "#0F172A", // dark navy
            padding: "0 20px",
            color: "white",
          }}
        >
          <button
            className="btn"
            style={{
              backgroundColor: "#3B82F6",
              color: "white",
              padding: "10px 30px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "none",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#2563EB")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#3B82F6")}
          >
            Collapse
          </button>

          <h1
            className="head fw-bold ms-auto me-auto"
            style={{ fontSize: "26px" }}
          >
            User Dashboard
          </h1>
        </div>

        {/* Page Content */}
        <div className="bottom p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
