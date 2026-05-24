import React from "react";
import { Outlet, Link } from "react-router";

const AdminDashboard = () => {
  const role = localStorage.getItem('adminRole');
  if (role !== "admin") {
    window.location.href = "/adminlogin";
    return null;
  }

  return (
    <div
      className="main"
      style={{ height: "100vh", display: "flex", width: "100vw" }}
    >
      {/* Sidebar */}
      <div
        className="left"
        style={{
          height: "100%",
          width: "18%",
          backgroundColor: "#1e293b", // dark navy sidebar
          color: "white",
          padding: "20px",
        }}
      >
        <h3
          className="head text-center"
          style={{
            fontSize: "32px",
            marginBottom: "25px",
            fontWeight: "bold",
            color: "#f8fafc",
          }}
        >
          Admin
        </h3>

        <ul className="nav flex-column">
          {[
            { to: "/admindashboard/session", icon: "fa-calendar", text: "Session" },
            { to: "/admindashboard/subject", icon: "fa-book", text: "Subject" },
            { to: "/admindashboard/examinee", icon: "fa-user-tie", text: "Examinee" },
            { to: "/admindashboard/examination", icon: "fa-person-booth", text: "Examination" },
            { to: "/admindashboard/question", icon: "fa-file-circle-question", text: "Question Bank" },
            { to: "/admindashboard/reportGeneration", icon: "fa-chart-line", text: "Report Generation" },
            { to: "/admindashboard/changepassword", icon: "fa-unlock", text: "Change Password" },
            { to: "/admindashboard/messagereply", icon: "fa-message", text: "Message" },
          ].map((item, idx) => (
            <li className="nav-item mb-2" key={idx}>
              <Link
                className="nav-link w-100 px-3 py-2 rounded d-block"
                to={item.to}
                style={{
                  color: "white",
                  textDecoration: "none",
                  backgroundColor: "#334155",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#6366f1")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#334155")
                }
              >
                <i className={`fa-solid ${item.icon}`}></i> {item.text}
              </Link>
            </li>
          ))}

          {/* Logout Button (Danger) */}
          <li className="nav-item mt-3">
            <Link
              className="nav-link w-100 px-3 py-2 rounded d-block"
              to="/adminlogin"
              onClick={() => {
                localStorage.removeItem('adminId');
                localStorage.removeItem('adminEmail');
                localStorage.removeItem('adminRole');
              }}
              style={{
                color: "white",
                textDecoration: "none",
                backgroundColor: "#dc2626", // red
                transition: "all 0.3s ease",
                fontWeight: "bold",
              }}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = "#b91c1c")
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "#dc2626")
              }
            >
              <i className="fa-solid fa-arrow-right-from-bracket"></i> Logout
            </Link>
          </li>
        </ul>
      </div>

      {/* Right Section */}
      <div
        className="right"
        style={{ height: "100%", width: "82%", backgroundColor: "#f1f5f9" }}
      >
        {/* Top Navbar */}
        <div
          className="top d-flex align-items-center"
          style={{
            height: "80px",
            width: "100%",
            backgroundColor: "#334155",
            padding: "0 20px",
          }}
        >
          <button
            className="btn"
            style={{
              backgroundColor: "white",
              border: "none",
              padding: "10px 30px",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "8px",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#e2e8f0")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "white")}
          >
            Collapse
          </button>

          <h1
            className="head fw-bold"
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              color: "white",
              fontSize: "28px",
            }}
          >
            Admin Dashboard
          </h1>
        </div>

        {/* Main Content */}
        <div className="bottom p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
