import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DashboardHome = () => {
  const [student, setStudent] = useState(null);
  const [stats, setStats] = useState({
    available: 0,
    attempted: 0,
    pending: 0,
    completed: 0,
  });
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId');

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // 1. Fetch Student Details
        const userRes = await axios.get(`http://localhost:5000/api/examinee/${userId}`);
        const user = userRes.data;
        setStudent(user);
        const userSession = user?.session?._id || user?.session;

        // 2. Fetch Attempts to calculate attempted, pending, completed
        const resultRes = await axios.get(`http://localhost:5000/api/exams/examinee-result/${userId}`);
        const attempts = resultRes.data?.message || [];
        const attemptedIds = new Set(attempts.map(att => att.examId?._id || att.examId));
        const pendingCount = attempts.filter(att => att.resultStatus === 'Pending').length;
        const completedCount = attempts.filter(att => att.resultStatus === 'Completed').length;

        // 3. Fetch Exams to count available ones matching the session that haven't been attempted
        const examsRes = await axios.get('http://localhost:5000/api/exams/exams');
        const allExams = examsRes.data || [];
        const sessionExams = allExams.filter(exam => {
          const examSessionId = exam.sessionId?._id || exam.sessionId;
          return examSessionId === userSession && exam.status !== 'Draft';
        });

        // Available are those matching session and not yet attempted, and not closed
        const availableCount = sessionExams.filter(exam => !attemptedIds.has(exam._id) && exam.status !== 'Closed').length;

        setStats({
          available: availableCount,
          attempted: attempts.length,
          pending: pendingCount,
          completed: completedCount,
        });
      } catch (err) {
        console.error('Error loading student dashboard statistics:', err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchDashboardData();
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading Stats...</span>
        </div>
      </div>
    );
  }

  const cards = [
    { title: 'Available Exams', value: stats.available, icon: 'fa-file-signature', color: '#3b82f6', hoverColor: '#2563eb' },
    { title: 'Exams Taken', value: stats.attempted, icon: 'fa-square-check', color: '#10b981', hoverColor: '#059669' },
    { title: 'Pending Results', value: stats.pending, icon: 'fa-hourglass-half', color: '#f59e0b', hoverColor: '#d97706' },
    { title: 'Declared Results', value: stats.completed, icon: 'fa-medal', color: '#8b5cf6', hoverColor: '#7c3aed' },
  ];

  return (
    <div className="container-fluid py-2">
      {/* Header Panel */}
      <div className="card border-0 shadow-sm p-4 mb-4" style={{ borderRadius: '16px', background: 'linear-gradient(135deg, #0f172a, #1e293b)', color: '#fff' }}>
        <div className="row align-items-center">
          <div className="col-md-8">
            <h2 className="fw-bold mb-2">{getGreeting()}, {student?.name || 'Student'}!</h2>
            <p className="text-light-50 mb-0 opacity-75">
              Welcome back to your Exam Preparation Dashboard. Prepare well, and best of luck on your upcoming exams!
            </p>
          </div>
          <div className="col-md-4 text-md-end mt-3 mt-md-0">
            <span className="badge bg-primary px-3 py-2 fs-6" style={{ borderRadius: '10px' }}>
              <i className="fa-solid fa-graduation-cap me-2"></i>
              {student?.course} - {student?.branch}
            </span>
            <div className="text-light opacity-50 mt-1" style={{ fontSize: '0.85rem' }}>
              Session: {student?.session?.name || 'N/A'}
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Stats Cards */}
      <div className="row g-4 mb-5">
        {cards.map((card, idx) => (
          <div className="col-12 col-md-6 col-lg-3" key={idx}>
            <div
              className="card border-0 shadow-sm p-4 text-white"
              style={{
                background: `linear-gradient(135deg, ${card.color}, ${card.hoverColor})`,
                borderRadius: '16px',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h6 className="text-light text-uppercase fw-bold mb-2" style={{ letterSpacing: '0.5px', fontSize: '0.85rem' }}>
                    {card.title}
                  </h6>
                  <h2 className="fw-extrabold m-0" style={{ fontSize: '2.5rem' }}>{card.value}</h2>
                </div>
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: '60px',
                    height: '60px',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  }}
                >
                  <i className={`fa-solid ${card.icon} fa-2x`}></i>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Shortcuts and info */}
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card border-0 shadow-sm p-4" style={{ borderRadius: '16px', background: '#fff', minHeight: '220px' }}>
            <h4 className="fw-bold mb-3" style={{ color: '#1e293b' }}>Need Assistance?</h4>
            <p className="text-secondary mb-4">
              If you have queries regarding the question patterns, score evaluation, or face issues taking tests, feel free to send a message to the administrator.
            </p>
            <a href="/userdashboard/message" className="btn btn-primary px-4 py-2 fw-bold align-self-start" style={{ borderRadius: '10px' }}>
              <i className="fa-solid fa-paper-plane me-2"></i>
              Send Message
            </a>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card border-0 shadow-sm p-4" style={{ borderRadius: '16px', background: '#fff', minHeight: '220px' }}>
            <h4 className="fw-bold mb-3" style={{ color: '#1e293b' }}>Academic Checklist</h4>
            <ul className="list-unstyled text-secondary">
              <li className="mb-2"><i className="fa-solid fa-circle-check text-success me-2"></i> Review session and subject details</li>
              <li className="mb-2"><i className="fa-solid fa-circle-check text-success me-2"></i> Ensure all available exams are attempted</li>
              <li className="mb-2"><i className="fa-solid fa-circle-check text-success me-2"></i> Check My Results tab for evaluation sheets</li>
              <li className="mb-2"><i className="fa-solid fa-circle-check text-success me-2"></i> Periodically rotate account passwords</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
