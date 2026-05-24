import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Myresults = () => {
    const [data, setData] = useState([])
    const userId = localStorage.getItem('userId')
    console.log(userId);
    const handlefetch = async () => {
        const res = await axios.get(`http://localhost:5000/api/exams/examinee-result/${userId}`);
        
        setData(Array.isArray(res.data.message) ? res.data.message : [res.data.message]);

    }
    useEffect(() => {
        handlefetch()
    }, [] )
    console.log(data);
   
    return (
        <div>
            <div className="row mt-1">
              <div className="col-sm-12">
                <div className="card mx-auto mt-2 shadow-sm" style={{
                    border: "1px solid #6f42c1",
                    width: "100%",
                  }}>
                  <div className="card-body">
                    <div className="container p-0">
                      <h3 className="fw-bold mb-3" style={{ color: "#6f42c1" }}>Examinee Results</h3>
                      <table className="table table-bordered text-center table-hover">
                        <thead className="table-secondary">
                            <tr>
                                <th>S.N</th>
                                <th>Exam Name</th>
                                <th>Student Name</th>
                                <th>Total Marks</th>
                                <th>Passing Marks</th>
                                <th>Score</th>
                                <th>Status</th>
                                <th>Declaration Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length === 0 || !data[0] ? (
                                <tr>
                                    <td colSpan="8">No results available yet.</td>
                                </tr>
                            ) : (
                                data.map((item, i) => {
                                    if (!item) return null;
                                    const isPending = item.resultStatus === 'Pending';
                                    return (
                                        <tr key={item._id}>
                                            <td>{i + 1}</td>
                                            <td>{item.examId?.title || 'Exam Deleted'}</td>
                                            <td>{item.examineeId?.name || 'N/A'}</td>
                                            <td>{item.totalMarks}</td>
                                            <td>{item.passingMarks}</td>
                                            <td>
                                                {isPending ? (
                                                    <span className="text-muted fw-bold">Pending</span>
                                                ) : (
                                                    <span className="fw-bold text-dark">{item.score}</span>
                                                )}
                                            </td>
                                            <td>
                                                {isPending ? (
                                                    <span className="badge bg-warning text-dark px-3 py-1">Pending</span>
                                                ) : (
                                                    <span className={`badge px-3 py-1 ${item.status === 'Passed' ? 'bg-success' : 'bg-danger'}`}>
                                                        {item.status}
                                                    </span>
                                                )}
                                            </td>
                                            <td>
                                                {isPending ? (
                                                    <span className="text-muted">Awaiting Declaration</span>
                                                ) : (
                                                    new Date(item.updatedAt || item.createdAt).toLocaleString()
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })
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

export default Myresults