import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Subject = () => {
  const [form, setForm] = useState({
    name: "",
    description: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // eslint-disable-next-line no-unused-vars
  const [id, setId] = useState({ id: "" });
  const [edit, setEdit] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (edit) {
        const res = await axios.put(`http://localhost:5000/api/subject/${id.id}`, form);
        console.log(res);
        alert("Updated Successfully");
      } else {
        const res = await axios.post("http://localhost:5000/api/subject", form);
        console.log(res);
        alert("Added Successfully");
      }
      setForm({ name: "", description: "" });
      setEdit(false);
      setId({ id: "" });
      handlefetch();
    } catch (er) {
      alert("Subject Not Saved");
      console.log(er);
    }
  };

  const [data, setData] = useState([]);

  const handlefetch = async () => {
    const res = await axios.get("http://localhost:5000/api/subject");
    setData(res.data);
  };

  useEffect(() => {
    handlefetch();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/subject/${id}`);
      alert("Subject Deleted Successfully");
      handlefetch();
    } catch (er) {
      alert("Sorry! Try Again");
      console.log(er);
    }
  };

  const handleEdit = async (item) => {
    setForm({
      name: item.name,
      description: item.description,
    });
    setEdit(true);
    setId({
      id: item._id,
    });
  };

  return (
    <div className="subject ms-5 mt-5">
      <div
        className="up shadow"
        style={{
          height: "300px",
          width: "65%",
          border: "1px solid #ddd",
          borderRadius: "8px",
          background: "#f9fafb",
          padding: "20px",
        }}
      >
        <form method="POST" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter name"
            name="name"
            value={form.name}
            onChange={handleChange}
            style={{
              marginLeft: "35px",
              marginTop: "20px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              padding: "10px",
              width: "80%",
            }}
          />
          <br />
          <textarea
            placeholder="Enter Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            style={{
              marginLeft: "35px",
              marginTop: "20px",
              height: "80px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              padding: "10px",
              width: "80%",
              resize: "none",
            }}
          ></textarea>
          <br />
          <button
            type="submit"
            style={{
              marginLeft: "35px",
              marginTop: "20px",
              borderRadius: "5px",
              padding: "10px 20px",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#bb2d3b")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#dc3545")}
          >
            Submit
          </button>
        </form>
      </div>

      <div
        className="down mt-5 shadow"
        style={{
          minHeight: "130px",
          width: "65%",
          border: "1px solid #ddd",
          borderRadius: "8px",
          background: "#ffffff",
          padding: "20px",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#333" }}>Subjects</h2>
        <table
          style={{
            width: "97%",
            marginLeft: "10px",
            borderCollapse: "collapse",
          }}
        >
          <thead style={{ background: "#f1f1f1" }}>
            <tr>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>S.No</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Name</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Description</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr key={item._id}>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>{i + 1}</td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>{item.name}</td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>{item.description}</td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                  <button
                    style={{
                      background: "#dc3545",
                      color: "white",
                      border: "none",
                      padding: "5px 12px",
                      marginRight: "10px",
                      borderRadius: "5px",
                      cursor: "pointer",
                      transition: "0.3s",
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#bb2d3b")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#dc3545")}
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                  <button
                    style={{
                      background: "#198754",
                      color: "white",
                      border: "none",
                      padding: "5px 12px",
                      borderRadius: "5px",
                      cursor: "pointer",
                      transition: "0.3s",
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#157347")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#198754")}
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Subject;
