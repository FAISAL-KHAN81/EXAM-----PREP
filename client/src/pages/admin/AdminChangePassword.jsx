import axios from 'axios';
import React, { useState } from 'react'

const AdminChangePassword = () => {
    const id = localStorage.getItem('adminId');
    const [form, setForm] = useState({
      op: '',
      np: '',
      cnp: ''
    });

    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!id) {
        return alert("Admin ID not found in session. Please login again.");
      }
      if (form.np !== form.cnp) {
        return alert("New Password and Confirm New Password do not match.");
      }
      try {
        const res = await axios.put(`http://localhost:5000/api/admin/change/${id}`, form);
        alert(res.data?.message || "Password updated successfully!");
        setForm({ op: '', np: '', cnp: '' });
      } catch (error) {
        console.error("Password update error:", error);
        alert(error.response?.data?.message || "Failed to update password. Try again.");
      }
    };

  return (
    <div>
      <div className="container-fluid w-50">
        <h2>Change Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 ">
            <label htmlFor="currentPassword" className="form-label">Current Password</label>
            <input type="password" className="form-control" id="currentPassword" name='op' value={form.op} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="newPassword" className="form-label">New Password</label>
            <input type="password" className="form-control" id="newPassword" name='np' value={form.np} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
            <input type="password" className="form-control" id="confirmPassword" name='cnp' value={form.cnp} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-primary">Update Password</button>
        </form>
      </div>
    </div>
  )
//   const [form, setForm] = useState({
//     oldPassword: '',
//     newPassword: '',
//     confirmPassword: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (form.newPassword !== form.confirmPassword) {
//       alert("New Password and Confirm Password do not match");
//       return;
//     }
//     try {
//       const res = await axios.put('http://localhost:5000/api/admin/change-password', form);
//       alert(res.data.message);
//     } catch (error) {
//       console.error("Error changing password:", error);
//       alert("Error changing password");
//     }
//   };
//     return (
//         <div className="change-password-container">
//         <h2>Change Password</h2>
//         <form onSubmit={handleSubmit}>
//             <div className="form-group">
//             <label htmlFor="oldPassword">Old Password</label>
//             <input type="password" id="oldPassword" name="oldPassword" value={form.oldPassword} onChange={handleChange} required />
//             </div>
//             <div className="form-group">
//             <label htmlFor="newPassword">New Password</label>
//             <input type="password" id="newPassword" name="newPassword" value={form.newPassword} onChange={handleChange} required />
//             </div>
//             <div className="form-group">
//             <label htmlFor="confirmPassword">Confirm New Password</label>
//             <input type="password" id="confirmPassword" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required />
//             </div>
//             <button type="submit">Change Password</button>
//         </form>
//         </div>
//     );                      
  
}

export default AdminChangePassword
