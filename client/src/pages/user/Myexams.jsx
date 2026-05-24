import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'

const Myexams = () => {
    const [exams, setExams] = useState([]);
    const [attemptedIds, setAttemptedIds] = useState(new Set());
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem('userId');

    const handlefetch = async () => {
        try {
            setLoading(true);
            // Fetch examinee details to get session
            const userRes = await axios.get(`http://localhost:5000/api/examinee/${userId}`);
            const userSession = userRes.data?.session?._id || userRes.data?.session;

            // Fetch examinee attempts
            const resultRes = await axios.get(`http://localhost:5000/api/exams/examinee-result/${userId}`);
            const attempts = resultRes.data?.message || [];
            const attemptedSet = new Set(attempts.map(att => att.examId?._id || att.examId));
            setAttemptedIds(attemptedSet);

            // Fetch all exams
            const examsRes = await axios.get('http://localhost:5000/api/exams/exams');
            const allExams = examsRes.data || [];

            // Filter exams by session and status (only show Scheduled or active exams)
            const filtered = allExams.filter(exam => {
                const examSessionId = exam.sessionId?._id || exam.sessionId;
                return examSessionId === userSession && exam.status !== 'Draft';
            });
            setExams(filtered);
        } catch (err) {
            console.error('Error fetching student exams:', err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        handlefetch();
    }, []);

    if (loading) {
        return <div className="text-center mt-5"><h4>Loading exams...</h4></div>;
    }

    return (
        <div className="row mt-3">
            <div className="col-sm-12">
              <h3 className="fw-bold mb-3" style={{ color: "#6f42c1" }}>Available Examinations</h3>
              <table className="table table-bordered text-center table-hover shadow-sm">
                <thead className="thead-light-purple">
                  <tr>
                    <th>S.No.</th>
                    <th>Exam Name</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Duration</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                 { exams.length === 0 ? (
                    <tr>
                      <td colSpan="7">No exams scheduled for your session.</td>
                    </tr>
                 ) : (
                    exams.map((item, index) => {
                      const isAttempted = attemptedIds.has(item._id);
                      return (
                        <tr key={item._id}>
                          <td>{index + 1}</td>
                          <td>{item.title}</td>
                          <td>{item.date}</td>
                          <td>{item.time}</td>
                          <td>{item.duration} mins</td>
                          <td>
                            <span className={`badge ${item.status === 'Closed' ? 'bg-danger' : 'bg-success'}`}>
                              {item.status}
                            </span>
                          </td>
                          <td>
                            {isAttempted ? (
                              <button className="btn btn-secondary btn-sm px-3" disabled>Attempted</button>
                            ) : item.status === 'Closed' ? (
                              <button className="btn btn-danger btn-sm px-3" disabled>Exam Closed</button>
                            ) : (
                              <Link className="btn btn-primary btn-sm px-3" to={`/userdashboard/getexam/${item._id}`}>Start Exam</Link>
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
    )
}

export default Myexams
