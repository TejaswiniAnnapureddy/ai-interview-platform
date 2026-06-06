import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("resumeText");
    navigate("/");
  };

  return (
    <div className="navbar">
      <h2>AI Interview Platform</h2>

      <div>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/resume">Resume</Link>
        <Link to="/interview">Interview</Link>
        <Link to="/history">History</Link>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}