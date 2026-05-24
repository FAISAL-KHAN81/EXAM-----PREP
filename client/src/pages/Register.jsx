/* eslint-disable no-unused-vars */
import React from "react";
import "./register.css";
import { Link } from "react-router";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    college: "",
    course: "",
    branch: "",
    session: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/examinee", form);
      alert("Registered Successfully");
      window.location.href = "/";
    } catch (er) {
      console.log(er);
      alert("Sorry try again later");
    }
  };

  const [data, setData] = useState([]);

  const handlefetch = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/session");
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handlefetch();
  }, []);
  console.log(data)

  return (
    <>
      {/* <div>
      <div className="outer">
        <div className="login">
     <div className="headline"> 
        <h2>Register</h2>
     </div>

     <div className="maincontainer">
        <label htmlfor="username">Enter Your User name</label>
        <input type="text" placeholder="Enter Your User name" id="username"/>
<br/><br/>
        <label for="password">Enter Your Password</label>
        <input type="password" placeholder="Enter Your Password" id="password"/>
        <br/><br/><br/>
        <button type="submit">Login</button>
     </div>

<p>Have an account? <Link to='/'>login</Link></p>
        </div>
    </div>
    </div> */}

      <div className="registration-container">
      <div className="registration-card">
        {/* Header */}
        <div className="registration-header">
          <div className="icon-circle">
            <span role="img" aria-label="student" className="emoji">
              🎓
            </span>
          </div>
          <h2>Student Registration</h2>
          <p>Join our academic community 🚀</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
            </div>
            <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>

          <div className="form-group">
            <label>Contact No</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              placeholder="Enter your contact number"
            />
          </div>

          <div className="form-group">
            <label>College/University</label>
            <input
              type="text"
              name="college"
              value={form.college}
              onChange={handleChange}
              required
              placeholder="Your institution name"
            />
          </div>

          <div className="form-group">
            <label>Course</label>
            <input
              type="text"
              name="course"
              value={form.course}
              onChange={handleChange}
              required
              placeholder="Your course (e.g. B.Tech, MBA)"
            />
          </div>

          <div className="form-group">
            <label>Branch</label>
            <input
              type="text"
              name="branch"
              value={form.branch}
              onChange={handleChange}
              required
              placeholder="Your course (e.g. CSE, IT)"
            />
          </div>

          <div className="form-group">
            <label>Current Session</label>
            <select
              name="session"
              value={form.session}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Select session</option>
              {data.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="submit-btn">
            Create Account
          </button>
        </form>

        {/* Footer */}
        <div className="registration-footer">
          <p>
            Already have an account?{" "}
            <a href="/login">Sign In</a>
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Register;
