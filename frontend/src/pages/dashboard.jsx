import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>AI Interview Dashboard</h1>
        <p>Upload your resume, generate questions, and track interview practice.</p>
      </div>

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
          <p>View your previous interview practice sessions.</p>
          <button className="button">Coming Soon</button>
        </div>
      </div>
    </div>
  );
}