import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const email = localStorage.getItem("userEmail") || "teju@gmail.com";
      const res = await api.get(`/interview/history/${email}`);
      setHistory(res.data);
    };

    fetchHistory();
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Interview History</h1>
        <p>Review your previous answers, scores, feedback, and correct answers.</p>
      </div>

      {history.length === 0 ? (
        <div className="feature-card">
          <h2>No history found</h2>
          <p>Complete an interview question to see history here.</p>
        </div>
      ) : (
        history.map((item) => (
          <div className="feature-card" key={item.id} style={{ marginBottom: "20px" }}>
            <h2>{item.role}</h2>
            <p><b>Question:</b> {item.question}</p>
            <p><b>Your Answer:</b> {item.answer}</p>

            <div className="result-box">
              <b>Feedback:</b>
              <br />
              {item.feedback}
            </div>

            <p><b>Date:</b> {new Date(item.created_at).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
}