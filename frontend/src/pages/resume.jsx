import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function Resume() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [analysis, setAnalysis] = useState("");

  const uploadResume = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a PDF file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post("/resume/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      localStorage.setItem("resumeText", res.data.resume_text);
      setText(res.data.resume_text);

      const analysisRes = await api.post("/resume/analyze", {
        resume_text: res.data.resume_text,
      });

      setAnalysis(analysisRes.data.analysis);

      alert("Resume uploaded and analyzed successfully");
    } catch (err) {
      alert("Resume upload or analysis failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="dashboard">
        <div className="dashboard-header">
          <h1>Upload Resume</h1>
          <p>Upload your PDF resume. The system will analyze it and generate interview questions.</p>
        </div>

        <div className="feature-card">
          <form onSubmit={uploadResume}>
            <input
              className="input"
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <button className="button" type="submit">
              Upload & Analyze Resume
            </button>
          </form>

          {analysis && (
            <div className="result-box">
              <h3>Resume Analysis</h3>
              {analysis}
            </div>
          )}

          {text && (
            <>
              <button className="button" onClick={() => navigate("/interview")}>
                Start Interview
              </button>

              <div className="result-box">
                <h3>Extracted Resume Text</h3>
                {text}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}