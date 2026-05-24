import axios from "axios";
import React, { useEffect, useState } from "react";

const Session = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const [id, setId] = useState({ id: "" });
  const [edit, setEdit] = useState(null);
  const [data, setData] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (edit) {
        await axios.put(`http://localhost:5000/api/session/${id.id}`, form);
        alert("Updated Successfully");
      } else {
        await axios.post("http://localhost:5000/api/session", form);
        alert("Added Successfully");
      }
      setForm({ name: "", description: "" });
      setEdit(false);
      handlefetch();
    } catch (er) {
      alert("Session Not Added");
      console.log(er);
    }
  };

  const handlefetch = async () => {
    const res = await axios.get("http://localhost:5000/api/session");
    setData(res.data);
  };

  useEffect(() => {
    handlefetch();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/session/${id}`);
      alert("Session Deleted Successfully");
      handlefetch();
    } catch (er) {
      alert("Sorry! Try Again");
      console.log(er);
    }
  };

  const handleEdit = (item) => {
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
    <div
      style={{
        padding: "40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f4f7fa",
        minHeight: "100vh",
      }}
    >
      {/* Form Section */}
      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          width: "65%",
          marginBottom: "40px",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#333" }}>
          {edit ? "Edit Session" : "Add Session"}
        </h2>
        <form method="POST" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter name"
            name="name"
            value={form.name}
            onChange={handleChange}
            style={{
              width: "95%",
              padding: "12px",
              marginBottom: "20px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              outline: "none",
              fontSize: "16px",
            }}
          />
          <textarea
            placeholder="Enter Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            style={{
              width: "95%",
              padding: "12px",
              height: "100px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              outline: "none",
              fontSize: "16px",
              resize: "none",
              marginBottom: "20px",
            }}
          />
          <br />
          <button
            type="submit"
            style={{
              backgroundColor: edit ? "#28a745" : "#dc3545",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "12px 24px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) =>
              (e.target.style.backgroundColor = edit ? "#218838" : "#c82333")
            }
            onMouseOut={(e) =>
              (e.target.style.backgroundColor = edit ? "#28a745" : "#dc3545")
            }
          >
            {edit ? "Update" : "Submit"}
          </button>
        </form>
      </div>

      {/* Table Section */}
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          width: "75%",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#333" }}>Sessions</h2>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
          }}
        >
          <thead>
            <tr style={{ background: "#f8f9fa" }}>
              <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>
                S.No
              </th>
              <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>
                Name
              </th>
              <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>
                Description
              </th>
              <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr
                key={item._id}
                style={{
                  borderBottom: "1px solid #eee",
                  transition: "background 0.3s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f9f9f9")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                <td style={{ padding: "12px" }}>{i + 1}</td>
                <td style={{ padding: "12px" }}>{item.name}</td>
                <td style={{ padding: "12px" }}>{item.description}</td>
                <td style={{ padding: "12px" }}>
                  <button
                    onClick={() => handleDelete(item._id)}
                    style={{
                      backgroundColor: "#dc3545",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      padding: "8px 14px",
                      marginRight: "8px",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#c82333")
                    }
                    onMouseOut={(e) =>
                      (e.target.style.backgroundColor = "#dc3545")
                    }
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleEdit(item)}
                    style={{
                      backgroundColor: "#28a745",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      padding: "8px 14px",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#218838")
                    }
                    onMouseOut={(e) =>
                      (e.target.style.backgroundColor = "#28a745")
                    }
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

export default Session;
