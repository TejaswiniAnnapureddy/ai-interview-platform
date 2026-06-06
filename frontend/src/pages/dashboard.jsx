import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

export default function Dashboard() {
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [latestRole, setLatestRole] = useState("Not started");
  const resumeUploaded = localStorage.getItem("resumeText") ? "Uploaded" : "Not uploaded";

  useEffect(() => {
    const fetchStats = async () => {
      const email = localStorage.getItem("userEmail") || "teju@gmail.com";
      const res = await api.get(`/interview/history/${email}`);

      setTotal(res.data.length);
      if (res.data.length > 0) {
        setLatestRole(res.data[0].role);
      }
    };

    fetchStats();
  }, []);

  return (
    <>
      <Navbar />

      <div className="dashboard">
        <div className="dashboard-header">
          <h1>AI Interview Dashboard</h1>
          <p>Upload resume, generate AI questions, get feedback, and track progress.</p>
        </div>

        <div className="grid">
          <div className="feature-card">
            <h2>{total}</h2>
            <p>Total Questions Answered</p>
          </div>

          <div className="feature-card">
            <h2>{latestRole}</h2>
            <p>Latest Role Practiced</p>
          </div>

          <div className="feature-card">
            <h2>{resumeUploaded}</h2>
            <p>Resume Status</p>
          </div>
        </div>

        <br />

        <div className="grid">
          <div className="feature-card">
            <h2>Resume Upload</h2>
            <p>Upload PDF resume and extract skills, projects, and experience.</p>
            <button className="button" onClick={() => navigate("/resume")}>Upload Resume</button>
          </div>

          <div className="feature-card">
            <h2>AI Questions</h2>
            <p>Generate role-based interview questions using AI.</p>
            <button className="button" onClick={() => navigate("/interview")}>Start Interview</button>
          </div>

          <div className="feature-card">
            <h2>Interview History</h2>
            <p>View previous answers, scores, feedback, and correct answers.</p>
            <button className="button" onClick={() => navigate("/history")}>View History</button>
          </div>
        </div>
      </div>
    </>
  );
}