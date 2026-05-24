import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
const ReportGeneration = () => {
    const [data, setData] = useState([]);
    const handlefetch = async () => {
        const res = await axios.get('http://localhost:5000/api/exams/report');
        // console.log(res.data);
        setData(Array.isArray(res.data) ? res.data : [res.data
        ]);
    }
    useEffect(() => {
        handlefetch();
    }, []);
  const handleDeclare = async (id) => {
    if (!id) return alert("Attempt ID is missing.");
    if (!window.confirm("Are you sure you want to declare the result for this attempt?")) return;
    try {
      const res = await axios.post(`http://localhost:5000/api/exams/result/${id}`);
      alert(res.data.message || "Result Declared Successfully");
      handlefetch();
    } catch (err) {
      console.error("Error declaring result:", err);
      alert(err.response?.data?.message || "Failed to declare result.");
    }
  };

  const handlePrint = async (item) => {
    const printWindow = window.open('', '', 'width=900,height=650');
    printWindow.document.write(`
      <html>
        <head>
          <title>Exam Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h2 { color: #6f42c1; }
            table { border-collapse: collapse; width: 100%; margin-top: 20px; }
            td, th { border: 1px solid #6f42c1; padding: 8px; text-align: left; }
            th { background-color: #f3e8ff; }
          </style>
        </head>
        <body>
          <h2>Exam Report - ${item.examTitle}</h2>
          <table>
            <tr><th>Examinee Name</th><td>${item.examineeName}</td></tr>
            <tr><th>Email</th><td>${item.examineeEmail}</td></tr>
            <tr><th>Total Marks</th><td>${item.totalMarks}</td></tr>
            <tr><th>Passing Marks</th><td>${item.passingMarks}</td></tr>
            <tr><th>Score</th><td>${item.score}</td></tr>
            <tr><th>Status</th><td>${item.status}</td></tr>
            <tr><th>Result Status</th><td>${item.resultStatus}</td></tr>
            <tr><th>Date of Exam</th><td>${new Date(item.attemptedAt).toLocaleString()}</td></tr>
          </table>
        </body>
      </html>
    `);
    printWindow.document.close();
    await printWindow.print();
  };

  return (
    <div>
        <div className="container-fluid">
              <div className="row py-3 px-3 mt-3">
                <div className="col-sm-11 mx-auto">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h3 className="fw-bold mb-3" style={{ color: "#6f42c1" }}>Report Generation & Declarations</h3>
                           <table className="table table-hover table-bordered text-center">
                            <thead>
                                <tr>
                                    <th>S.N</th>
                                    <th>Exam Name</th>
                                    <th>Examinee Name</th>
                                    <th>Total Marks</th>
                                    <th>Score</th>
                                    <th>Passing Marks</th>
                                    <th>Exam Status</th>
                                    <th>Result Release</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.length === 0 || !data[0] ? (
                                    <tr><td colSpan="10">No exam attempts found.</td></tr>
                                ) : (
                                    data.map((item, i) => (
                                        <tr key={i+1}>
                                            <td>{i + 1}</td>
                                            <td>{item.examTitle}</td>
                                            <td>{item.examineeName}</td>
                                            <td>{item.totalMarks}</td>
                                            <td>{item.score}</td>
                                            <td>{item.passingMarks}</td>
                                            <td>
                                                <span className={`badge ${item.status === 'Passed' ? 'bg-success' : 'bg-danger'}`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td>
                                                <span className={`badge ${item.resultStatus === 'Completed' ? 'bg-success' : 'bg-warning text-dark'}`}>
                                                    {item.resultStatus}
                                                </span>
                                            </td>
                                            <td>{new Date(item.attemptedAt).toLocaleString()}</td>
                                            <td>
                                                <div className="d-flex gap-2 justify-content-center">
                                                    <button className="btn btn-sm btn-primary" onClick={()=>{handlePrint(item)}}>
                                                        <i className="fa-solid fa-print me-1"></i> Print
                                                    </button>
                                                    {item.resultStatus === 'Pending' && (
                                                        <button className="btn btn-sm btn-success" onClick={() => handleDeclare(item.id)}>
                                                            <i className="fa-solid fa-check me-1"></i> Declare
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                           </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ReportGeneration