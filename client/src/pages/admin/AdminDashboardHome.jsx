import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboardHome = () => {
  const [stats, setStats] = useState({
    sessions: 0,
    subjects: 0,
    examinees: 0,
    exams: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const [sessionRes, subjectRes, examineeRes, examRes] = await Promise.all([
          axios.get('http://localhost:5000/api/session'),
          axios.get('http://localhost:5000/api/subject'),
          axios.get('http://localhost:5000/api/examinee'),
          axios.get('http://localhost:5000/api/exams/exams'),
        ]);

        setStats({
          sessions: sessionRes.data?.length || 0,
          subjects: subjectRes.data?.length || 0,
          examinees: examineeRes.data?.length || 0,
          exams: examRes.data?.length || 0,
        });
      } catch (err) {
        console.error('Error fetching admin dashboard statistics:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

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
    { title: 'Total Sessions', value: stats.sessions, icon: 'fa-calendar', color: '#6366f1', hoverColor: '#4f46e5' },
    { title: 'Subjects Configured', value: stats.subjects, icon: 'fa-book', color: '#06b6d4', hoverColor: '#0891b2' },
    { title: 'Active Examinees', value: stats.examinees, icon: 'fa-user-graduate', color: '#10b981', hoverColor: '#059669' },
    { title: 'Exams Created', value: stats.exams, icon: 'fa-file-signature', color: '#f97316', hoverColor: '#ea580c' },
  ];

  return (
    <div className="container-fluid py-2">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h2 className="fw-bold text-dark mb-1">Welcome back, Admin!</h2>
          <p className="text-secondary m-0">Here is a quick overview of the exam preparation portal.</p>
        </div>
      </div>

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

      <div className="row">
        <div className="col-lg-8 mb-4">
          <div className="card border-0 shadow-sm p-4" style={{ borderRadius: '16px', background: '#fff' }}>
            <h4 className="fw-bold mb-3" style={{ color: '#1e293b' }}>Administrative Panel Shortcuts</h4>
            <p className="text-secondary mb-4">Use the left sidebar or click the shortcuts below to manage portal entities.</p>
            <div className="d-flex flex-wrap gap-3">
              <a href="/admindashboard/examination" className="btn text-white px-4 py-2 fw-bold" style={{ backgroundColor: '#6366f1', borderRadius: '10px' }}>
                Create Examination
              </a>
              <a href="/admindashboard/question" className="btn btn-outline-secondary px-4 py-2 fw-bold" style={{ borderRadius: '10px' }}>
                Manage Questions
              </a>
              <a href="/admindashboard/reportGeneration" className="btn btn-outline-secondary px-4 py-2 fw-bold" style={{ borderRadius: '10px' }}>
                Release Results
              </a>
            </div>
          </div>
        </div>
        <div className="col-lg-4 mb-4">
          <div className="card border-0 shadow-sm p-4" style={{ borderRadius: '16px', background: '#fff' }}>
            <h4 className="fw-bold mb-3" style={{ color: '#1e293b' }}>System Status</h4>
            <div className="d-flex align-items-center mb-3">
              <div className="rounded-circle bg-success" style={{ width: '12px', height: '12px', marginRight: '10px' }}></div>
              <span className="fw-bold text-success">Server is Online</span>
            </div>
            <p className="text-secondary mb-0" style={{ fontSize: '0.9rem' }}>
              Connected to MongoDB database. API port listener is running securely on port 5000.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;