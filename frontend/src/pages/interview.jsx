import { useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function Interview() {
  const [role, setRole] = useState("Full Stack Developer");
  const [difficulty, setDifficulty] = useState("Medium");
  const [questions, setQuestions] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const generateQuestions = async () => {
    try {
      const savedResumeText = localStorage.getItem("resumeText");

      if (!savedResumeText) {
        alert("Please upload your resume first");
        return;
      }

      const res = await api.post("/interview/generate-questions", {
        resume_text: savedResumeText,
        role,
        difficulty,
      });

      setQuestions(res.data.questions);
    } catch (err) {
      alert(err.response?.data?.detail || "Question generation failed");
    }
  };

  const getFeedback = async () => {
    try {
      if (!selectedQuestion || !answer) {
        alert("Please enter both question and answer");
        return;
      }

      const feedbackRes = await api.post("/interview/feedback", {
        question: selectedQuestion,
        answer,
      });

      const feedbackText = feedbackRes.data.feedback;
      setFeedback(feedbackText);

      const userEmail = localStorage.getItem("userEmail") || "teju@gmail.com";

      await api.post("/interview/save-history", {
        user_email: userEmail,
        role,
        question: selectedQuestion,
        answer,
        feedback: feedbackText,
      });

      alert("Feedback saved to history");
    } catch (err) {
      alert(err.response?.data?.detail || "Feedback generation failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="dashboard">
        <div className="dashboard-header">
          <h1>AI Interview Practice</h1>
          <p>Generate resume-based questions and get AI feedback.</p>
        </div>

        <div className="grid">
          <div className="feature-card">
            <h2>Generate Questions</h2>

            <input
              className="input"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />

            <select
              className="input"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>

            <button className="button" onClick={generateQuestions}>
              Generate Questions
            </button>
          </div>

          <div className="feature-card">
            <h2>Answer Question</h2>

            <textarea
              className="input"
              rows="4"
              placeholder="Paste one generated question here"
              value={selectedQuestion}
              onChange={(e) => setSelectedQuestion(e.target.value)}
            />

            <textarea
              className="input"
              rows="6"
              placeholder="Type your answer here"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />

            <button className="button" onClick={getFeedback}>
              Get Feedback
            </button>
          </div>
        </div>

        {questions && (
          <div className="result-box">
            <h3>Generated Questions</h3>
            <pre>{questions}</pre>
          </div>
        )}

        {feedback && (
          <div className="result-box">
            <h3>Interview Feedback</h3>
            <pre>{feedback}</pre>
          </div>
        )}
      </div>
    </>
  );
}